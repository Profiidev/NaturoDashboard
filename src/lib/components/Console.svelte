<script lang="ts">
	import { token } from '$lib/pocketbase/pocketbase';
	import { get } from 'svelte/store';
	import { onMount } from 'svelte';
	import Icon from './Icon.svelte';

	export let route: string;
	export let tabs: string[];
	let logs = ['Loading...'];
	export let active: string;
	let status = 'unknown';
	let isAutoScroll = true;
	let consoleContainer: HTMLElement;

	const isMinecraft: boolean = active.toLowerCase() === 'minecraft';

	let firstTab: string;
	$: {
		firstTab = tabs[0];
		tabs = tabs.slice(1);
		active = firstTab;
		fetchData();
	}

	const fetchData = () => {
		if (!active) return;
		fetch('https://profidev.io/api/logs', {
			method: 'POST',
			body: JSON.stringify({
				token: get(token),
				app: !isMinecraft ? active.toLowerCase() : 'minecraft',
				server: active.toLowerCase()
			})
		})
			.then((res) => res.json())
			.then((res) => {
				logs = res.logs;
				if (isAutoScroll) {
					consoleContainer.scroll({ top: consoleContainer.scrollHeight, behavior: 'smooth' });
				}
			})
			.catch((err) => {});

		if (isMinecraft) return;
		fetch('https://profidev.io/api/status', {
			method: 'POST',
			body: JSON.stringify({ token: get(token), app: active.toLowerCase() })
		})
			.then((res) => res.json())
			.then((res) => (status = res.status))
			.catch((err) => {});
	};

	const updateData = () => {
		if (window.location.pathname === route) fetchData();
		if (isAutoScroll) {
			consoleContainer.scroll({ top: consoleContainer.scrollHeight, behavior: 'smooth' });
		}
		setTimeout(updateData, 1000);
	};

	onMount(() => {
		updateData();
	});

	const tabClick = (newTab: string) => {
		active = newTab;
		logs = ['Loading...'];
		fetchData();
	};

	const controlClick = (action: string) => {
		fetch('https://profidev.io/api/control', {
			method: 'POST',
			body: JSON.stringify({ token: get(token), app: active.toLowerCase(), cmd: action })
		}).catch((err) => {});
	};

	const consoleScroll = () => {
		isAutoScroll =
			consoleContainer.scrollTop + consoleContainer.clientHeight >= consoleContainer.scrollHeight;
	};
</script>

<div class="console-container">
	<div class="selector">
		<button class={active === firstTab ? 'active tab' : 'tab'} on:click={() => tabClick(firstTab)}
			>{firstTab}</button
		>
		{#each tabs as tab}
			<div class="space-w" />
			<button class={active === tab ? 'active tab' : 'tab'} on:click={() => tabClick(tab)}
				>{tab}</button
			>
		{/each}
	</div>
	<div class="console scrollbar" bind:this={consoleContainer} on:scroll={consoleScroll}>
		<div class="space" />
		{#each logs as log}
			<p class="log">{log.startsWith('> ') ? log.replace('> ', '') : log}</p>
		{/each}
		<div class="space" />
	</div>
	<p>
		Status: <span
			style={status === 'running'
				? 'color:rgb(0, 212, 0)'
				: status === 'stopped'
				? 'color:red'
				: ''}>{status}</span
		>
	</p>
	<div class="buttons">
		<button
			class="start control-button"
			on:click={() => {
				controlClick('start');
			}}
		>
			<Icon icon="Start" />
		</button>
		<button
			class="restart control-button"
			on:click={() => {
				controlClick('restart');
			}}
		>
			<Icon icon="Restart" />
		</button>
		<button
			class="stop control-button"
			on:click={() => {
				controlClick('stop');
			}}
		>
			<Icon icon="Stop" />
		</button>
	</div>
</div>

<style>
	.console-container {
		display: flex;
		align-content: center;
		align-items: center;
		flex-direction: column;
		color: white;
	}
	.space-w {
		width: 50px;
	}
	.selector {
		display: flex;
	}
	.tab {
		background: none;
		color: inherit;
		border: none;
		padding: 0;
		font: inherit;
		cursor: pointer;
		outline: inherit;
		margin-bottom: 20px;
	}
	.active {
		color: #00b5ec;
		border-bottom: #00b5ec solid 3px;
	}
	.console {
		width: 85vw;
		height: 75vh;
		background-color: var(--navbar-color);
		border-radius: 10px;
		overflow-y: auto;
		word-wrap: break-word;
	}
	.log {
		color: rgb(215, 216, 223);
		margin: 2px 10px 0 7px;
		text-indent: 10px;
	}
	.space {
		height: 10px;
	}
	.control-button {
		width: 40px;
		height: 40px;
		padding: 0;
		border-radius: 5px;
		border-width: 2px;
		border-style: solid;
	}
	.start {
		background-color: rgb(0, 212, 0);
		border-color: rgb(0, 150, 0);
	}
	.start:hover {
		background-color: rgb(0, 255, 0);
	}
	.stop {
		background-color: rgb(197, 0, 0);
		border-color: rgb(112, 0, 0);
	}
	.stop:hover {
		background-color: rgb(255, 0, 0);
	}
	.restart {
		background-color: rgb(0, 102, 255);
		border-color: rgb(0, 38, 255);
	}
	.restart:hover {
		background-color: rgb(0, 162, 255);
	}
</style>
