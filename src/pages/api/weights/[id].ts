import type { APIRoute } from "astro";
import { db, Weights, eq } from "astro:db";
import type { WeightInput } from "@/types/weight";
import { parseDateToDayStart } from "@/lib/dates";
import { weightSchema } from "@/lib/validations";
import { formatZodError } from "@/lib/validations";

export const GET: APIRoute = async ({ params }) => {
  try {
    const id = Number(params.id);
    const [weight] = await db.select().from(Weights).where(eq(Weights.id, id));

    if (!weight) {
      return new Response(JSON.stringify({ error: "Weight entry not found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    return new Response(JSON.stringify(weight), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch weight entry" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};

export const PUT: APIRoute = async ({ request, params }) => {
  try {
    const id = Number(params.id);
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

    const [updated] = await db
      .update(Weights)
      .set(weight)
      .where(eq(Weights.id, id))
      .returning();

    if (!updated) {
      return new Response(JSON.stringify({ error: "Weight entry not found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    return new Response(JSON.stringify(updated), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Failed to update weight entry" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};

export const DELETE: APIRoute = async ({ params }) => {
  try {
    const id = Number(params.id);
    const [deleted] = await db
      .delete(Weights)
      .where(eq(Weights.id, id))
      .returning();

    if (!deleted) {
      return new Response(JSON.stringify({ error: "Weight entry not found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    return new Response(null, { status: 204 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to delete weight entry" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};
