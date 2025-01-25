<script lang="ts">
  export let time: number;
  export let className: string;

  $: displayTime = time.toString().padStart(4, "0");
  $: hours = displayTime.slice(0, 2);
  $: minutes = displayTime.slice(2, 4);
</script>

<span class={className}>{hours}:{minutes}</span>
