<script lang="ts">
  export let type: "text" | "number" = "text";
  export let label: string;
  export let value: string | number | boolean;
  export let name: string;
  export let required: boolean = false;
  export let className: string = "";
  export let error: boolean | string = false;
</script>

<div class={className}>
  <label class="block text-sm font-medium text-gray-300 mb-1" for={name}>
    {label}
  </label>
  <input
    {type}
    id={name}
    {name}
    {required}
    bind:value
    class={[
      "bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-100 placeholder-gray-400 w-full px-3 py-2",
      error ? "border-red-500" : "",
    ]}
  />
</div>
