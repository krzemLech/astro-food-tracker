<script lang="ts">
  import Chevron from "@/icons/chevron.svelte";
  import { parseDateParts } from "@/lib/dates";
  export let date: Date;
  export let isEditing: boolean = false;
  $: formattedDate = parseDateParts(date);

  function handleUp(e: MouseEvent) {
    e.preventDefault();
    date = new Date(date.setDate(date.getDate() - 1));
  }

  function handleDown(e: MouseEvent) {
    e.preventDefault();
    date = new Date(date.setDate(date.getDate() + 1));
  }
</script>

<div class="flex items-center gap-2 min-w-[300px]">
  {#if !isEditing}
    <div class="switch-container flex md:flex-col mr-2">
      <button on:click={handleUp}>
        <Chevron className="size-3" />
      </button>
      <button on:click={handleDown}>
        <Chevron className="size-3" reversed />
      </button>
    </div>
  {/if}
  <div class="mr-2 pb-0.5 text-gray-500">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="size-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
      />
    </svg>
  </div>
  <h3>{formattedDate.weekday}</h3>
  <span class="font-extralight text-gray-400"
    >{formattedDate.monthday}, {formattedDate.year}</span
  >
</div>
