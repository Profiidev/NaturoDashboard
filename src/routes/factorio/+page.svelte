<script lang="ts">
	import InfoModal from '$lib/components/InfoModal.svelte';
	import Console from '$lib/components/Console.svelte';
	import { currentUser, token } from '$lib/pocketbase/pocketbase';
</script>

{#if $currentUser}
	<div class="content">
		<h1>Factorio</h1>
		<Console tabs={['FABG']} active={'FABG'} route={'/factorio'} />
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