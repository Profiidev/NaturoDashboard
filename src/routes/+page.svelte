<script lang="ts">
  import PleaseLogin from "$lib/components/PleaseLogin.svelte";
  import { currentUser, token } from "$lib/pocketbase/pocketbase";
	import { get } from "svelte/store";

  const test = async () => {
    fetch("http://localhost:5173/api", {method: "POST", body: JSON.stringify({token: get(token), app:"w", cmd:"w"})}).then(res => res.text()).then(res => console.log(res));
  }
</script>

{#if $currentUser}
  <h1>Dashboard</h1>
  <button on:click={test}>Lol</button>
{:else}
  <PleaseLogin />
  <button on:click={test}>Lol</button>
{/if}

<style>
</style>