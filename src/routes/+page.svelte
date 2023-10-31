<script lang="ts">
	import PleaseLogin from '$lib/components/PleaseLogin.svelte';
	import { currentUser, token } from '$lib/pocketbase/pocketbase';
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';
	import { getConfig } from '$lib/charts/cpu';
	import { get } from 'svelte/store';

	let cpuCanvas: HTMLCanvasElement;
	let cpuChart: Chart;
	let timeSteps = [10, 10];
	let labels: number[][] = [[],[]];
	let data: number[][] = [[],[]];
	$: {
		labels[0] = Array.from(Array(timeSteps[0]).keys());
		labels[1] = Array.from(Array(timeSteps[1]).keys());
	}

	const fetchData = () => {
		fetch('http://nacktebusen.de/api/stats', {
			method: 'POST',
			body: JSON.stringify({ token: get(token), resource: 'cpu', time: timeSteps[0] })
		})
			.then((res) => res.json())
			.then((res) => data[0] = res.data)
			.catch((err) => {});

		fetch('http://nacktebusen.de/api/stats', {
			method: 'POST',
			body: JSON.stringify({ token: get(token), resource: 'ram', time: timeSteps[1] })
		})
			.then((res) => res.json())
			.then((res) => data[1] = res.data)
			.catch((err) => {});
  }

  const updateData = () => {
    fetchData();
		const ctx = cpuCanvas.getContext('2d');
		if(ctx) {
			cpuChart?.destroy();
			cpuChart = new Chart(ctx, getConfig(labels[0], data[0]));
		}
    setTimeout(updateData, 10000);
  };

	onMount(() => {
		updateData();
	})
</script>

{#if $currentUser}
	<canvas bind:this={cpuCanvas} width={400} height={400}></canvas>
{:else}
	<PleaseLogin />
{/if}

<style>
</style>
