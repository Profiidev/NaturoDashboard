<script lang="ts">
  export let icon: string;
</script>

<div>
	<img draggable="false" src={`src/lib/assets/${icon}Icon.png`} alt="" />
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
