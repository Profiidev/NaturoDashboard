<script lang="ts">
	import InfoModal from '$lib/components/InfoModal.svelte';
	import Console from '$lib/components/Console.svelte';
	import { currentUser, token } from '$lib/pocketbase/pocketbase';
	import { onMount } from 'svelte';
  import { get } from 'svelte/store';

  let servers: string[] = [];

  onMount(() => {
    fetch('http://nacktebusen.de/api/servers', {
      method: 'POST',
      body: JSON.stringify({ token: get(token) })
    })
      .then((res) => res.json())
      .then((res) => servers = res.servers);
  });
</script>

{#if $currentUser}
	<div class="content">
		<h1>Minecraft</h1>
		<Console tabs={servers} active={'minecraft'} />
	</div>
{:else}
	<InfoModal message="Please Login to view this Page"/>
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