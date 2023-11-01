<script lang="ts">
	import InfoModal from '$lib/components/InfoModal.svelte';
	import { currentUser, token } from '$lib/pocketbase/pocketbase';
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';
	import { getConfig as getCPUConfig } from '$lib/charts/cpu';
	import { getConfig as getRAMConfig } from '$lib/charts/ram';
	import { get } from 'svelte/store';

	let cpuCanvas: HTMLCanvasElement;
	let cpuChart: Chart;
	let ramCanvas: HTMLCanvasElement;
	let ramChart: Chart;
	let timeSteps = [10, 10];
	let labels: number[][] = [[],[]];
	let data: number[][] = [[],[],[]];
	$: {
		labels[0] = Array.from(Array(timeSteps[0]).keys()).reverse().map((x) => x * -1);
		labels[1] = Array.from(Array(timeSteps[1]).keys()).reverse().map((x) => x * -1);
	}

	const fetchData = () => {
		fetch('http://nacktebusen.de/api/stats', {
			method: 'POST',
			body: JSON.stringify({ token: get(token), resource: 'cpu', time: timeSteps[0] })
		})
			.then((res) => res.json())
			.then((res) => {
				data[0] = res.data;
				const ctx = cpuCanvas.getContext('2d');
				if(ctx) {
					cpuChart?.destroy();
					cpuChart = new Chart(ctx, getCPUConfig(labels[0], data[0]));
				}
			})
			.catch((err) => {});

		fetch('http://nacktebusen.de/api/stats', {
			method: 'POST',
			body: JSON.stringify({ token: get(token), resource: 'ram', time: timeSteps[1] })
		})
			.then((res) => res.json())
			.then((res) => {
				data[1] = res.data;
				data[2] = res.data2;
				const ctx = ramCanvas.getContext('2d');
				if(ctx) {
					ramChart?.destroy();
					ramChart = new Chart(ctx, getRAMConfig(labels[1], data[1], data[2]));
				}
			})
			.catch((err) => {});
  }

  const updateData = () => {
    fetchData();
    setTimeout(updateData, 60000);
  };

	onMount(() => {
		updateData();
	})
</script>

{#if $currentUser}
	<div class="container">
		<div class="cpu-container">
			<canvas bind:this={cpuCanvas} width={400} height={400}></canvas>
		</div>
		<div class="ram-container">
			<canvas bind:this={ramCanvas} width={410} height={400}></canvas>
		</div>
	</div>
{:else}
	<InfoModal message="Please Login to view this Page"/>
{/if}

<style>
	.container {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 50px;
	}
	.cpu-container {
		position: relative;
		width: 410px;
		height: 400px;
		top: 50px;
		left: 50px;
		border-radius: 10px;
		padding: 10px;
		background-color: var(--modal-color);
	}
	.ram-container {
		position: relative;
		width: 410px;
		height: 400px;
		top: 50px;
		left: 50px;
		border-radius: 10px;
		padding: 10px;
		background-color: var(--modal-color);
	}
</style>
