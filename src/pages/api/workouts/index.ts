import type { APIRoute } from "astro";
import { db, Workouts, eq } from "astro:db";
import type { WorkoutInput } from "@/types/workout";
import { parseDateToDayStart } from "@/lib/dates";
import { workoutSchema } from "@/lib/validations";
import { formatZodError } from "@/lib/validations";

export const GET: APIRoute = async () => {
  try {
    const workouts = await db.select().from(Workouts).orderBy(Workouts.date);
    return new Response(JSON.stringify(workouts), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch workouts" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const workout = (await request.json()) as WorkoutInput;
    workout.date = parseDateToDayStart(new Date(workout.date));

    // Validate the workout data
    const result = workoutSchema.safeParse(workout);
    if (!result.success) {
      return new Response(
        JSON.stringify({
          error: formatZodError(result.error),
        }),
        {
          status: 422,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const workoutExists = await db
      .select()
      .from(Workouts)
      .where(eq(Workouts.date, workout.date));

    if (workoutExists.length > 0) {
      return new Response(JSON.stringify({ error: "Workout already exists" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const [inserted] = await db.insert(Workouts).values(workout).returning();

    return new Response(JSON.stringify(inserted), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to create workout" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
