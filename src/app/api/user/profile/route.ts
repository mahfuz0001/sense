import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/supabase";
import { db } from "@/lib/supabase";
import { ValidationError, handleApiError } from "@/lib/errors";
import { logger } from "@/lib/logger";
import { z } from "zod";

const updateProfileSchema = z.object({
  display_name: z.string().min(1).max(100).optional(),
  bio: z.string().max(500).optional(),
  experience_level: z.enum(["beginner", "intermediate", "advanced"]).optional(),
  preferred_categories: z.array(z.string()).optional(),
  onboarding_completed: z.boolean().optional(),
  onboarding_step: z.number().int().min(0).optional(),
});

export async function GET(request: NextRequest) {
  const start = Date.now();

  try {
    // Get user from auth header
    const authResult = await auth.getUser(
      request.headers.get("Authorization")?.replace("Bearer ", "") || ""
    );
    const authError = authResult?.error;
    const user = authResult?.data?.user ?? null;

    if (authError || !user) {
      throw new ValidationError("Authentication required");
    }

    // Fetch user profile from database
    const { data: profile, error } = await db.getUserProfile(user.id);

    if (error) {
      throw error;
    }

    if (!profile) {
      // Create default profile for new users
      const defaultProfile = {
        user_id: user.id,
        display_name: user.email?.split("@")[0] || "New User",
        experience_level: "beginner" as const,
        preferred_categories: [],
        onboarding_completed: false,
        onboarding_step: 0,
      };

      const { data: newProfile, error: createError } =
        await db.createUserProfile(defaultProfile);

      if (createError) {
        throw createError;
      }

      logger.info("Created default profile for new user", {
        userId: user.id,
        duration: Date.now() - start,
      });

      return NextResponse.json(newProfile);
    }

    logger.info("User profile retrieved successfully", {
      userId: user.id,
      duration: Date.now() - start,
    });

    return NextResponse.json(profile, {
      headers: {
        "Cache-Control": "private, max-age=300", // Cache for 5 minutes
      },
    });
  } catch (error) {
    const { statusCode, apiError } = handleApiError(error, {
      endpoint: "/api/user/profile",
      action: "get",
      duration: Date.now() - start,
    });

    logger.error("Failed to get user profile", {
      error: error instanceof Error ? error.message : "Unknown error",
      duration: Date.now() - start,
    });

    return NextResponse.json(apiError, { status: statusCode });
  }
}

export async function PUT(request: NextRequest) {
  const start = Date.now();

  try {
    // Get user from auth header
    const authResult = await auth.getUser(
      request.headers.get("Authorization")?.replace("Bearer ", "") || ""
    );
    const authError = authResult?.error;
    const user = authResult?.data?.user ?? null;

    if (authError || !user) {
      throw new ValidationError("Authentication required");
    }

    const body = await request.json();
    const validation = updateProfileSchema.safeParse(body);

    if (!validation.success) {
      throw new ValidationError("Invalid profile data", {
        errors: validation.error.issues,
      });
    }

    // Update user profile
    const { data, error } = await db.updateUserProfile(
      user.id,
      validation.data
    );

    if (error) {
      throw error;
    }

    logger.info("User profile updated", {
      userId: user.id,
      updatedFields: Object.keys(validation.data),
      duration: Date.now() - start,
    });

    return NextResponse.json(data);
  } catch (error) {
    const { statusCode, apiError } = handleApiError(error, {
      endpoint: "/api/user/profile",
      action: "update",
      duration: Date.now() - start,
    });

    logger.error("Failed to update user profile", {
      error: error instanceof Error ? error.message : "Unknown error",
      duration: Date.now() - start,
    });

    return NextResponse.json(apiError, { status: statusCode });
  }
}
