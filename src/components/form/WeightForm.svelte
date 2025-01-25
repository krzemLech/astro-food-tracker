<script lang="ts">
  import BaseInput from "./BaseInput.svelte";
  import BaseButton from "./BaseButton.svelte";
  import Link from "./Link.svelte";
  import DateDisplay from "./DateDisplay.svelte";
  import { defaultWeight } from "@/data/defaults";
  import type { Weight } from "@/types/weight";
  export let weight: Weight | null = null;

  let formData = weight || defaultWeight;

  let isSubmitting = false;
  let errors: Record<string, string> = {};

  async function handleSubmit(event: Event) {
    event.preventDefault();
    isSubmitting = true;
    errors = {};

    try {
      const response = await fetch(
        weight ? `/api/weights/${weight.id}` : "/api/weights",
        {
          method: weight ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        if (response.status === 422) {
          errors = data.error;
          return;
        } else {
          throw new Error(data.error || "Failed to save weight");
        }
      }

      // Reset form
      formData = defaultWeight;

      // Redirect to main page
      window.location.href = "/";
    } catch (e) {
      errors.message = e instanceof Error ? e.message : "Failed to save weight";
    } finally {
      isSubmitting = false;
    }
  }
</script>

<form on:submit={handleSubmit} class="mt-1 text-green-50">
  <section class="flex max-sm:flex-col justify-between items-center mb-6">
    <h2 class="text-xl font-semibold mb-1">Add Weight Measurement</h2>
    <DateDisplay bind:date={formData.date} />
  </section>

  <section class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <BaseInput
      label="Weight (kg)"
      name="weight"
      type="number"
      bind:value={formData.weight}
      required
      error={errors.weight}
    />
  </section>

  <div class="text-red-500 text-xs min-h-2">
    {#each Object.entries(errors) as [errKey, errMsg]}
      <p class="block">{errMsg}</p>
    {/each}
  </div>

  <div class="flex justify-start space-x-4 mt-6">
    <BaseButton
      type="submit"
      variant="green"
      disabled={isSubmitting}
      className="min-w-64"
    >
      {isSubmitting ? "Saving..." : "Save Weight"}
    </BaseButton>
    <Link href="/" variant="green">Cancel</Link>
  </div>
</form>
