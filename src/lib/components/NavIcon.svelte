<script lang="ts">
	import { onMount } from "svelte";

  export let icon: string;
	let path: string;

  onMount(async () => {
    path = (await import(`$lib/assets/${icon}Icon.png`)).default;
  })
</script>

<div>
	<img draggable="false" src={path} alt="" />
</div>

<style>
	img {
		width: 80%;
		height: 80%;
		padding: 10%;
		border-radius: 50%;
		transition-duration: 200ms;
	}
	img:hover {
		border-radius: 30%;
		transition-duration: 200ms;
	}
</style>
