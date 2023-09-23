<script lang="ts">
	import PleaseLogin from '$lib/components/PleaseLogin.svelte';
	import Console from '$lib/components/Console.svelte';
	import { currentUser } from '$lib/pocketbase/pocketbase';
	import { onMount } from 'svelte';

  let servers: string[] = [];

  onMount(() => {
    fetch('http://nacktebusen.de/api/servers')
      .then((res) => res.json())
      .then((res) => servers = res.servers);
  });
</script>

{#if $currentUser}
	<div class="content">
		<h1>Minecraft</h1>
		<Console tabs={servers} active={'Minecraft'} />
	</div>
{:else}
	<PleaseLogin />
{/if}

<style>
	.content {
		display: flex;
		align-content: center;
		align-items: center;
		flex-direction: column;
		color: white;
	}
</style>