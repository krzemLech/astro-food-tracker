<script lang="ts">
  export let label: string;
  export let checked: boolean;
  export let name: string;
  export let danger: boolean = false;

  function handleChange(event: Event) {
    const target = event.target as HTMLInputElement;
    checked = target.checked;
  }
</script>

<div class="inline-flex items-center">
  <label class="flex gap-2 items-center cursor-pointer relative">
    <input
      type="checkbox"
      {checked}
      {name}
      on:input={handleChange}
      class={[
        "peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border",
        danger
          ? "border-red-800 checked:bg-red-500 checked:border-red-500"
          : "border-slate-600 checked:bg-indigo-600 checked:border-indigo-600",
      ]}
      id="check7"
    />
    <span
      class={[
        "absolute text-white opacity-0 peer-checked:opacity-100 top-1.5 left-1 transform",
      ]}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-3.5 w-3.5"
        viewBox="0 0 20 20"
        fill="currentColor"
        stroke="currentColor"
        stroke-width="1"
      >
        <path
          fill-rule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clip-rule="evenodd"
        ></path>
      </svg>
    </span>
    <p
      class={danger
        ? checked
          ? "text-red-500"
          : "text-red-700"
        : "text-white"}
    >
      {label}
    </p>
  </label>
</div>
