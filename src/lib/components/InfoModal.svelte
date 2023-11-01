<script lang="ts">
  export let message: string;
</script>

<div class="flex-container">
	<div class="info-container">
		<p>{message}</p>
	</div>
</div>

<style>
	p{
    color: white;
    font-size: 30px;
    margin: 20px 0 0 0;
    justify-content: center;
    display: flex;
		text-align: center;
  }
  .info-container{
    background-color: var(--navbar-color);
    width: 600px;
    height: 80px;
    border-radius: 12px;
    margin-top: 60px;
    justify-items: center;
    flex-direction: column;
    display: flex;
  }
	.flex-container {
    width: 100vw;

    margin-top: 60px;

    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
