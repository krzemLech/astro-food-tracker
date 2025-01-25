<script lang="ts">
  import BaseInput from "./BaseInput.svelte";
  import BaseButton from "./BaseButton.svelte";
  import CheckBox from "./CheckBox.svelte";
  import Link from "./Link.svelte";
  import TimeInput from "./TimeInput.svelte";
  import type { Workout } from "@/types/workout";
  import DateDisplay from "./DateDisplay.svelte";
  import { defaultWorkout } from "@/data/defaults";
  export let workout: Workout | null = null;

  $: isEditing = workout !== null;
  $: endpointUrl = isEditing ? `/api/workouts/${workout!.id}` : "/api/workouts";
  $: method = isEditing ? "PUT" : "POST";

  let formData = workout || defaultWorkout;

  let isSubmitting = false;
  let errors: Record<string, string> = {};

  async function handleSubmit(event: Event) {
    event.preventDefault();
    isSubmitting = true;
    errors = {};

    try {
      const response = await fetch(endpointUrl, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        if (response.status === 422) {
          errors = data.error;
          return;
        } else {
          throw new Error(data.error || "Failed to save workout");
        }
      }

      formData = defaultWorkout;

      // Redirect to main page and referesh the list
      window.location.href = "/";
    } catch (e) {
      errors.message =
        e instanceof Error ? e.message : "Failed to save workout";
    } finally {
      isSubmitting = false;
    }
  }
</script>

<form onsubmit={handleSubmit}>
  <section class="flex max-sm:flex-col justify-between items-center mb-6">
    <h2 class="text-xl font-semibold mb-1">Add Today's Progress</h2>
    <DateDisplay bind:date={formData.date} />
  </section>
  <section class="flex max-md:flex-col">
    <div class="flex-1 space-y-5">
      <BaseInput
        label="Calories"
        name="calories"
        bind:value={formData.calories}
        required
        error={errors.calories}
        type="number"
      />
      <div class="flex gap-6 justify-between">
        <BaseInput
          label="Fasting Time (hours)"
          name="fastingTime"
          bind:value={formData.fastingTime}
          required
          className="flex-1"
          error={errors.fastingTime}
          type="number"
        />
        <TimeInput
          label="Wake Up"
          name="wakeup"
          bind:value={formData.wakeup}
          required
          className="flex-1"
          error={errors.wakeup}
        />
      </div>
      <BaseInput
        label="Training"
        name="training"
        bind:value={formData.training}
        error={errors.training}
      />
    </div>

    <div
      class="gap-6 flex md:flex-col min-w-72 px-4 pt-6 md:pl-14 sm:justify-between max-md:flex-wrap"
    >
      <CheckBox
        label="Cold Shower"
        name="coldShower"
        bind:checked={formData.coldShower}
      />

      <CheckBox label="Walk" name="walk" bind:checked={formData.walk} />

      <CheckBox
        label="Keto Diet"
        name="ketoDiet"
        bind:checked={formData.ketoDiet}
      />

      <CheckBox
        label="Alcohol"
        name="alcohol"
        bind:checked={formData.alcohol}
        danger
      />

      <CheckBox
        label="Blamage"
        name="blamage"
        bind:checked={formData.blamage}
        danger
      />
    </div>
  </section>

  <div class="text-red-500 text-xs min-h-2">
    {#each Object.entries(errors) as [errKey, errMsg]}
      <p class="block">{errMsg}</p>
    {/each}
  </div>

  <div class="flex justify-between space-x-4 mt-6">
    <div class="flex gap-4">
      <BaseButton
        type="submit"
        variant="primary"
        disabled={isSubmitting}
        className="min-w-64"
      >
        {isSubmitting ? "Saving..." : "Save Progress"}
      </BaseButton>
      <Link href="/" variant="ghost">Reset</Link>
    </div>
  </div>
</form>
