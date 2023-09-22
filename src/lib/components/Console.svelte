<script lang="ts">
  import { token } from "$lib/pocketbase/pocketbase";
  import { get } from "svelte/store";
	import { onMount } from "svelte";

  export let tabs: string[];
  let logs = ["Loading..."];
  let active = 'Musicbot';

  let firstTab = tabs.shift() as string;
  
  const fetchData = () => {
    fetch('http://nacktebusen.de/api/logs', {
			method: 'POST',
			body: JSON.stringify({ token: get(token), app: active.toLowerCase() })
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

<div class="selector">
  <button class={active === firstTab ? 'active' : ''} on:click={() => tabClick(firstTab)}>{firstTab}</button>
  {#each tabs as tab}
    <div class="space-w"></div>
    <button class={active === tab ? 'active' : ''} on:click={() => tabClick(tab)}>{tab}</button>
  {/each}
</div>
<div class="console scrollbar">
  <div class="space"></div>
  {#each logs as log}
    <p class="log">{log}</p>
  {/each}
  <div class="space"></div>
</div>

<style>
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
    color: #00b5ec;
    border-bottom: #00b5ec solid 3px;
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
    color: rgb(215, 216, 223);
    margin: 2px 10px 0 7px;
    text-indent: 10px;
  }
  .space{
    height: 10px;
  }
</style>