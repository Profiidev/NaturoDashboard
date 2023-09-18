<script lang="ts">
	import MinecraftIcon from '$lib/components/MinecraftIcon.svelte';
	import MusicIcon from '$lib/components/MusicIcon.svelte';
	import NaturoIcon from '$lib/components/NaturoIcon.svelte';
</script>

<div class="navbar-back">
	<ul class="navbar">
		<li>
			<NaturoIcon/>
		</li>
		<li>
			<MinecraftIcon/>
		</li>
		<li>
			<MusicIcon/>
		</li>
	</ul>
</div>
<div class="content">
	<slot />
</div>

<style>
	:global(:root) {
		--navbar-color: rgb(30, 31, 34);
		--navbar-width: 70px;

		--content-color: rgb(49, 51, 54);
	}

	.navbar-back {
		height: 100vh;
		width: var(--navbar-width);
		background-color: var(--navbar-color);
	}
	.navbar {
		margin: 0;
		padding: 0;
		list-style: none;
	}
	li {
		color: rgb(180, 180, 180);
		width: var(--navbar-width);
		height: var(--navbar-width);
	}

	.content {
		position: absolute;
		left: var(--navbar-width);
		top: 0;
		height: 100vh;
		width: calc(100vw - var(--navbar-width));
		background-color: var(--content-color);
	}
</style>
