<script lang="ts">
  export let type: "button" | "submit" | "reset" = "button";
  export let variant: "primary" | "secondary" | "green" | "outline" = "primary";
  export let className: string = "";
  export let disabled: boolean = false;
  export let onclick: (() => void) | null = null;
  const handleClick = (e: MouseEvent) => {
    if (onclick) {
      e.preventDefault();
      onclick();
    }
  };

  const variantClasses = {
    primary: "bg-indigo-500 hover:bg-indigo-600 text-white",
    secondary: "bg-gray-600 hover:bg-gray-700 text-gray-100",
    green: "bg-green-700 hover:bg-green-600 text-green-200",
    outline:
      "border border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white",
  };
</script>

<button
  {type}
  class="px-4 py-2 font-medium transition-colors duration-200 {variantClasses[
    variant
  ]} {className} {disabled ? 'opacity-50 cursor-not-allowed' : ''}"
  on:click={handleClick}
>
  <slot />
</button>
