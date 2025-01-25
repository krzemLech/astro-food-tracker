<script lang="ts">
  export let href: string;
  export let className: string = "";
  export let variant: "ghost" | "outline" | "link" | "green" = "link";
  export let size: "sm" | "md" | "lg" = "md";
  export let danger: boolean = false;

  const variantClasses = {
    ghost: danger
      ? "text-red-500 hover:bg-red-500 hover:text-white"
      : "text-indigo-500 hover:bg-indigo-500 hover:text-white",
    outline: danger
      ? "border border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
      : "border border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white",
    link: danger
      ? "text-red-500 hover:text-red-600"
      : "text-indigo-500 hover:text-indigo-600",
    green: "text-green-500 hover:text-green-600",
  };

  const sizeClasses = {
    sm: "px-2 py-1",
    md: "px-4 py-2",
    lg: "px-6 py-3",
  };
</script>

<a
  {href}
  class={[
    "font-medium transition-colors duration-200 {className}",
    variantClasses[variant],
    sizeClasses[size],
    className,
  ]}
>
  <slot />
</a>
