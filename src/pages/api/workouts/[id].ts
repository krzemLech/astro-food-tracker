import type { APIRoute } from "astro";
import { db, Workouts, eq } from "astro:db";
import type { WorkoutInput } from "@/types/workout";
import { parseDateToDayStart } from "@/lib/dates";
import { formatZodError, workoutSchema } from "@/lib/validations";

export const GET: APIRoute = async ({ params }) => {
  try {
    const id = Number(params.id);
    const [workout] = await db
      .select()
      .from(Workouts)
      .where(eq(Workouts.id, id));

    if (!workout) {
      return new Response(JSON.stringify({ error: "Workout not found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    return new Response(JSON.stringify(workout), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch workout" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};

export const PUT: APIRoute = async ({ request, params }) => {
  try {
    const id = Number(params.id);
    const workout = (await request.json()) as WorkoutInput;

    // Validate the workout data
    workout.date = parseDateToDayStart(new Date(workout.date));

    const result = workoutSchema.safeParse(workout);
    if (!result.success) {
      return new Response(
        JSON.stringify({
          error: formatZodError(result.error),
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const [updated] = await db
      .update(Workouts)
      .set(workout)
      .where(eq(Workouts.id, id))
      .returning();

    if (!updated) {
      return new Response(JSON.stringify({ error: "Workout not found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to update workout" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};

export const DELETE: APIRoute = async ({ params }) => {
  try {
    const id = Number(params.id);
    const [deleted] = await db
      .delete(Workouts)
      .where(eq(Workouts.id, id))
      .returning();

    if (!deleted) {
      return new Response(JSON.stringify({ error: "Workout not found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    return new Response(null, { status: 204 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to delete workout" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
