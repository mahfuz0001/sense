import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/supabase";
import { db } from "@/lib/supabase";
import { ValidationError, handleApiError } from "@/lib/errors";
import { logger } from "@/lib/logger";

export async function GET(request: NextRequest) {
  const start = Date.now();

  try {
    const authResult = await auth.getUser(
      request.headers.get("Authorization")?.replace("Bearer ", "") || ""
    );
    const authError = authResult?.error;
    const user = authResult?.data?.user ?? null;

    if (authError || !user) {
      throw new ValidationError("Authentication required");
    }

    // Fetch user progress from database
    const { data: userProgress, error } = await db.getUserProgress(user.id);

    if (error) {
      throw error;
    }

    if (!userProgress) {
      // Return empty progress for new users
      logger.info("No progress found for user, returning empty progress", {
        userId: user.id,
        duration: Date.now() - start,
      });

      return NextResponse.json({
        challenges: [],
        completedCount: 0,
        totalPoints: 0,
        streak: 0,
      });
    }

    // Calculate stats
    const completedChallenges = userProgress.filter(
      (p) => p.status === "completed"
    ).length;
    const totalPoints =
      completedChallenges * 100 +
      userProgress.filter((p) => p.status === "in_progress").length * 50;

    // TODO: Calculate streak from actual completion dates
    const streak = 0; // Placeholder until we implement streak calculation

    logger.info("User progress retrieved successfully", {
      userId: user.id,
      completedChallenges,
      totalPoints,
      duration: Date.now() - start,
    });

    return NextResponse.json(
      {
        challenges: userProgress,
        completedCount: completedChallenges,
        totalPoints,
        streak,
      },
      {
        headers: {
          "Cache-Control": "private, max-age=60", // Cache for 1 minute
        },
      }
    );
  } catch (error) {
    const { statusCode, apiError } = handleApiError(error, {
      endpoint: "/api/user/progress",
      action: "get",
      duration: Date.now() - start,
    });

    logger.error("Failed to get user progress", {
      error: error instanceof Error ? error.message : "Unknown error",
      duration: Date.now() - start,
    });

    return NextResponse.json(apiError, { status: statusCode });
  }
}

export async function PUT(request: NextRequest) {
  const start = Date.now();

  try {
    const authResult = await auth.getUser(
      request.headers.get("Authorization")?.replace("Bearer ", "") || ""
    );
    const authError = authResult?.error;
    const user = authResult?.data?.user ?? null;

    if (authError || !user) {
      throw new ValidationError("Authentication required");
    }

    const body = await request.json();
    const { challenge_id, status, code, hints_used } = body;

    if (!challenge_id || !status) {
      throw new ValidationError("challenge_id and status are required");
    }

    if (!["not_started", "in_progress", "completed"].includes(status)) {
      throw new ValidationError("Invalid status value");
    }

    // Update challenge progress
    const { data, error } = await db.updateChallengeProgress(
      user.id,
      challenge_id,
      status,
      code,
      hints_used
    );

    if (error) {
      throw error;
    }

    logger.info("Challenge progress updated", {
      userId: user.id,
      challengeId: challenge_id,
      status,
      duration: Date.now() - start,
    });

    return NextResponse.json(data);
  } catch (error) {
    const { statusCode, apiError } = handleApiError(error, {
      endpoint: "/api/user/progress",
      action: "update",
      duration: Date.now() - start,
    });

    logger.error("Failed to update challenge progress", {
      error: error instanceof Error ? error.message : "Unknown error",
      duration: Date.now() - start,
    });

    return NextResponse.json(apiError, { status: statusCode });
  }
}
