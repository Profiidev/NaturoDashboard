<script lang="ts">
	import InfoModal from '$lib/components/InfoModal.svelte';
	import Console from '$lib/components/Console.svelte';
	import { currentUser } from '$lib/pocketbase/pocketbase';
</script>

{#if $currentUser}
	<div class="content">
		<h1>Music</h1>
		<Console tabs={['Musicbot', 'Lavalink']} active={'Musicbot'} />
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
