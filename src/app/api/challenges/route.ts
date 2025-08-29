import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/supabase';
import { cache, cacheUtils } from '@/lib/cache';
import { 
  ValidationError, 
  NotFoundError, 
  handleApiError, 
  dbOperation 
} from '@/lib/errors';
import { logger } from '@/lib/logger';
import { z } from 'zod';

// Query parameter validation
const challengeQuerySchema = z.object({
  category: z.string().optional(),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
  page: z.string().transform(Number).optional(),
  limit: z.string().transform(Number).optional(),
  search: z.string().optional(),
});

export async function GET(request: NextRequest) {
  const start = Date.now();
  
  try {
    const { searchParams } = new URL(request.url);
    const queryResult = challengeQuerySchema.safeParse(Object.fromEntries(searchParams));
    
    if (!queryResult.success) {
      throw new ValidationError('Invalid query parameters', {
        errors: queryResult.error.issues,
      });
    }
    
    const { 
      category, 
      difficulty, 
      page = 1, 
      limit = 20, 
      search 
    } = queryResult.data;
    
    // Validate pagination
    if (page < 1 || limit < 1 || limit > 100) {
      throw new ValidationError('Invalid pagination parameters');
    }
    
    // Generate cache key
    const cacheKey = cacheUtils.key(
      'challenges',
      'list',
      category || 'all',
      difficulty || 'all',
      search || 'none',
      page,
      limit
    );
    
    // Try to get from cache first
    const cached = await cache.get(cacheKey);
    if (cached) {
      logger.debug('Challenges served from cache', { 
        cacheKey, 
        duration: Date.now() - start 
      });
      
      return NextResponse.json(cached, {
        headers: {
          'X-Cache': 'HIT',
          'Cache-Control': 'public, max-age=300',
        },
      });
    }
    
    // Fetch from database
    const { data: challenges, error } = await dbOperation(
      () => db.getChallenges(category, difficulty),
      'Failed to fetch challenges'
    );
    
    if (error) {
      throw error;
    }
    
    if (!challenges) {
      throw new NotFoundError('Challenges');
    }
    
    // Apply search filter if provided
    let filteredChallenges = challenges;
    if (search) {
      const searchLower = search.toLowerCase();
      filteredChallenges = challenges.filter(challenge => 
        challenge.title.toLowerCase().includes(searchLower) ||
        challenge.description.toLowerCase().includes(searchLower) ||
        challenge.category.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply pagination
    const offset = (page - 1) * limit;
    const paginatedChallenges = filteredChallenges.slice(offset, offset + limit);
    
    // Prepare response with metadata
    const response = {
      challenges: paginatedChallenges.map(challenge => ({
        id: challenge.id,
        title: challenge.title,
        description: challenge.description,
        difficulty: challenge.difficulty,
        category: challenge.category,
        hints: challenge.hints?.length || 0,
        created_at: challenge.created_at,
      })),
      pagination: {
        page,
        limit,
        total: filteredChallenges.length,
        totalPages: Math.ceil(filteredChallenges.length / limit),
        hasNext: offset + limit < filteredChallenges.length,
        hasPrev: page > 1,
      },
      filters: {
        category,
        difficulty,
        search,
      },
      meta: {
        totalChallenges: challenges.length,
        categories: [...new Set(challenges.map(c => c.category))],
        difficulties: [...new Set(challenges.map(c => c.difficulty))],
      },
    };
    
    // Cache the response
    await cacheUtils.setWithTags(
      cacheKey,
      response,
      ['challenges', `category:${category || 'all'}`, `difficulty:${difficulty || 'all'}`],
      300 // 5 minutes
    );
    
    logger.info('Challenges fetched successfully', {
      count: paginatedChallenges.length,
      filters: { category, difficulty, search },
      duration: Date.now() - start,
    });
    
    return NextResponse.json(response, {
      headers: {
        'X-Cache': 'MISS',
        'Cache-Control': 'public, max-age=300',
      },
    });
    
  } catch (error) {
    const { error: apiError, statusCode } = handleApiError(error, {
      endpoint: '/api/challenges',
      duration: Date.now() - start,
    });
    
    return NextResponse.json(apiError, { status: statusCode });
  }
}