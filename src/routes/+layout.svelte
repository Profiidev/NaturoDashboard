<script lang="ts">
	import NavIcon from '$lib/components/NavIcon.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import { currentUser, isValid, pb } from '$lib/pocketbase/pocketbase';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { get } from 'svelte/store';

	onMount(() => {
		if(!get(isValid) && window.location.pathname !== '/login') {
			pb.authStore.clear();
			goto('/login');
			return;
		}
	})
</script>

<div class="navbar-back">
	<ul class="navbar">
		<li>
			<a href="/">
				<NavIcon icon='Naturo'/>
			</a>
			<div class="tooltip">Dashboard</div>
		</li>
		<li>
			<a href="/minecraftserver">
				<NavIcon icon='Minecraft'/>
			</a>
			<div class="tooltip">Minecraft Server</div>
		</li>
		<li>
			<a href="/musicbot">
				<NavIcon icon='Music'/>
			</a>
			<div class="tooltip">Music Bot</div>
		</li>
		<li>
			<a href="/factorio">
				<NavIcon icon='Factorio'/>
			</a>
			<div class="tooltip">Factorio</div>
		</li>
		<li class="login">
			<a href="/login">
				{#if $currentUser}
					<Icon icon='Logout'/>
				{:else}
					<Icon icon='Login'/>
				{/if}
			</a>
			<div class="tooltip">Log {$currentUser ? 'out' : 'in'}</div>
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

		--modal-color: rgb(32, 33, 36);

		--content-color: rgb(49, 51, 54);
		font-family: 'JetBrains Mono', monospace;
	}
	:global(.scrollbar::-webkit-scrollbar) {
      width: 12px;
  }
  :global(.scrollbar::-webkit-scrollbar-track) {
      border-radius: 8px;
      background-color: #e7e7e7;
      border: 1px solid #cacaca;
      box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
  }
  :global(.scrollbar::-webkit-scrollbar-thumb) {
      border-radius: 8px;
      background-color: #363636;
  }
	
	.navbar-back {
		height: 100vh;
		width: var(--navbar-width);
		background-color: var(--navbar-color);
	}
	.navbar {
		height: 100vh;
		margin: 0;
		padding: 0;
		list-style: none;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
	}
	li {
		color: rgb(180, 180, 180);
		width: var(--navbar-width);
		height: var(--navbar-width);
		user-select: none;
	}
	.login{
		margin-top: auto;
	}
	li .tooltip{
		color: white;
		white-space: nowrap;
		visibility: hidden;
		position: relative;
		left: 110%;
		top: -50%;
		transform-origin: top left;
		transform: scale(0) translate(0, -60%);
		background-color: black;
		display: inline-block;
		border-radius: 7px;
		padding: 8px;
		z-index: 1;
		transition-duration: 100ms;
	}
	li:hover .tooltip{
		transform-origin: top left;
		transform: scale(1) translate(0, -60%);
		visibility: visible;
		transition-duration: 100ms;
	}
	.tooltip::after{
		content: "";
		position: absolute;
		top: 50%;
		left: -5px;
		transform: translate(0, -50%);
		margin-left: -5px;
		border-width: 5px;
		border-style: solid;
		border-color: transparent black transparent transparent;
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
