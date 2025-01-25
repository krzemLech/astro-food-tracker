<script lang="ts">
  import TimeDisplay from "../ui/TimeDisplay.svelte";

  export let value: number = 0;
  export let label: string;
  export let name: string;
  export let required: boolean = false;
  export let className: string = "";
  export let error: boolean | string = false;
  let inputElement: HTMLInputElement;
  const keyboardKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  function handleClick() {
    if (inputElement) {
      inputElement.focus();
    }
  }

  function handleChange(event: KeyboardEvent) {
    if (keyboardKeys.includes(event.key)) {
      const updatedValue = Number(String(value) + event.key);
      if (updatedValue < 2401) {
        value = updatedValue;
      }
    }
    if (event.key === "Backspace") {
      value = value > 9 ? Number(String(value).slice(0, -1)) : 0;
    }
  }

  $: timeString = value.toString().padStart(4, "0");
</script>

<div class={className}>
  <label class="block text-sm font-medium text-gray-300 mb-1" for={name}>
    {label}
  </label>
  <div
    on:click={handleClick}
    class={[
      "border border-gray-600 h-[42px] bg-gray-700 px-3 py-2 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-transparent focus-within:text-gray-100",
      error ? "border-red-500" : "",
    ]}
  >
    <input
      type="text"
      {name}
      {required}
      {value}
      on:keydown={handleChange}
      bind:this={inputElement}
      class="bg-transparent border-none outline-none w-0 h-0 p-0 m-0"
    />
    <TimeDisplay time={value} className="text-gray-100" />
  </div>
</div>
