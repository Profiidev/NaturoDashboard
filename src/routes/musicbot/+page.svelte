<script lang="ts">
  import PleaseLogin from "$lib/components/PleaseLogin.svelte";
  import { currentUser, token } from "$lib/pocketbase/pocketbase";
  import { get } from "svelte/store";
	import { onMount } from "svelte";

  let logs: string[] = ["Loading..."];
  let active = 'musicbot';

  const fetchData = () => {
    fetch('http://nacktebusen.de/api/logs', {
			method: 'POST',
			body: JSON.stringify({ token: get(token), app: active })
		})
			.then((res) => res.json())
			.then((res) => logs = res.logs);
  }

  const updateData = () => {
    fetchData();
    setTimeout(updateData, 1000);
  };

  onMount(() => {
    updateData();
  });

  const tabClick = (newTab: string) => {
    active = newTab;
    logs = ["Loading..."];
    fetchData();
  }
</script>

{#if $currentUser}
  <div class="content">
    <h1>Music</h1>
    <div class="selector">
      <button class={active === 'musicbot' ? 'active' : ''} on:click={() => tabClick('musicbot')}>Musicbot</button>
      <div class="space-w"></div>
      <button class={active === 'lavalink' ? 'active' : ''} on:click={() => tabClick('lavalink')}>Lavalink</button>
    </div>
    <div class="console scrollbar">
    <div class="space"></div>
      {#each logs as log}
        <p class="log">{log}</p>
      {/each}
      <div class="space"></div>
    </div>
  </div>
{:else}
  <PleaseLogin />
{/if}

<style>
  .content{
    display: flex;
    align-content: center;
    align-items: center;
    flex-direction: column;
  }
  .console{
    width: 75vw;
    height: 75vh;
    background-color: var(--navbar-color);
    border-radius: 10px;
    overflow-y: auto;
    word-wrap: break-word;
  }
  .scrollbar::-webkit-scrollbar {
      width: 12px;
  }
  .scrollbar::-webkit-scrollbar-track {
      border-radius: 8px;
      background-color: #e7e7e7;
      border: 1px solid #cacaca;
      box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
  }
  .scrollbar::-webkit-scrollbar-thumb {
      border-radius: 8px;
      background-color: #363636;
  }
  .log{
    color: white;
    margin: 2px 10px 0 10px;
  }
  .space{
    height: 5px;
  }
  .space-w{
    width: 50px;
  }
  .selector{
    display: flex;
  }
  button {
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
    margin-bottom: 20px;
  }
  .active{
    border-bottom: black solid 3px;
  }
</style>