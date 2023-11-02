<script lang="ts">
  export let icon: string;
</script>

<div>
  <img draggable="false" src={`src/lib/assets/${icon}Icon.png`} alt="">
</div>

<style>
  img{
    width: 60%;
    height: 80%;
    padding: 20%;
  }
</style>
