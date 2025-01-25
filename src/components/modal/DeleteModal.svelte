<script lang="ts">
  import BaseButton from "../form/BaseButton.svelte";
  import Link from "../form/Link.svelte";
  import { onMount } from "svelte";
  let isDeleting = false;
  let error: string | null = null;
  let data: Record<string, boolean | string> = { open: false };

  onMount(() => {
    let delParams = new URLSearchParams(window.location.search).get("delete");
    if (delParams) {
      const [resource, id] = delParams.split(",");
      data.open = true;
      data.resource = resource;
      data.id = id;
    }
  });

  $: resourceTitle =
    data.open && data.resource === "weight" ? "weight record" : "workout";

  async function handleDelete() {
    if (!data.id) return;

    isDeleting = true;
    error = null;

    try {
      const res = await fetch(`/api/${data.resource}s/${data.id}`, {
        method: "DELETE",
      });

      if (res.status > 205) {
        throw new Error(res.statusText || "Failed to delete workout");
      }

      // Redirect to main page without delete param
      window.location.href = "/";
    } catch (e) {
      console.log(e);
      error = e instanceof Error ? e.message : "Failed to delete workout";
      isDeleting = false;
    }
  }
</script>

{#if data.open}
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
  >
    <div class="bg-gray-800 p-6 rounded max-w-md w-full">
      <h2 class="text-xl font-semibold mb-4">Delete {resourceTitle}</h2>
      <p class="text-gray-300 mb-6">
        Are you sure you want to delete this {resourceTitle}? This action cannot
        be undone.
      </p>

      {#if error}
        <div class="text-red-500 text-sm mb-4">{error}</div>
      {/if}

      <div class="flex justify-end space-x-4">
        <Link href="/" variant="link" danger>Cancel</Link>
        <BaseButton
          type="button"
          variant="primary"
          className="bg-red-600 hover:bg-red-700"
          disabled={isDeleting}
          onclick={handleDelete}
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </BaseButton>
      </div>
    </div>
  </div>
{/if}
