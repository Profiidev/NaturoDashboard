<script lang="ts">
  import PleaseLogin from "$lib/components/PleaseLogin.svelte";
  import { currentUser } from "$lib/pocketbase/pocketbase";
</script>

{#if $currentUser}
  <h1>Minecraft</h1>
{:else}
  <PleaseLogin />
{/if}

<style>
  
</style>