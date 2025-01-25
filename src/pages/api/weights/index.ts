import type { APIRoute } from "astro";
import { db, Weights, eq } from "astro:db";
import type { WeightInput } from "@/types/weight";
import { parseDateToDayStart } from "@/lib/dates";
import { weightSchema } from "@/lib/validations";
import { formatZodError } from "@/lib/validations";

export const GET: APIRoute = async () => {
  try {
    const weights = await db.select().from(Weights).orderBy(Weights.date);
    return new Response(JSON.stringify(weights), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch weights" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const weight = (await request.json()) as WeightInput;
    weight.date = parseDateToDayStart(new Date(weight.date));

    // Validate the weight data
    const result = weightSchema.safeParse(weight);
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

    const weightExists = await db
      .select()
      .from(Weights)
      .where(eq(Weights.date, weight.date));

    if (weightExists.length > 0) {
      return new Response(
        JSON.stringify({ error: "Weight entry already exists for this date" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const [inserted] = await db.insert(Weights).values(weight).returning();

    return new Response(JSON.stringify(inserted), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Failed to create weight entry" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};
