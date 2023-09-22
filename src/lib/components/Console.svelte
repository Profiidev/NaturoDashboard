<script lang="ts">
  import { token } from "$lib/pocketbase/pocketbase";
  import { get } from "svelte/store";
	import { onMount } from "svelte";
	import StartIcon from "./StartIcon.svelte";
  import StopIcon from "./StopIcon.svelte";
  import RestartIcon from "./RestartIcon.svelte";

  export let tabs: string[];
  let logs = ["Loading..."];
  let active = 'Musicbot';
  let status = 'unknown';

  let firstTab = tabs.shift() as string;
  
  const fetchData = () => {
    fetch('http://nacktebusen.de/api/logs', {
			method: 'POST',
			body: JSON.stringify({ token: get(token), app: active.toLowerCase() })
		})
			.then((res) => res.json())
			.then((res) => logs = res.logs);

    fetch('http://nacktebusen.de/api/status', {
			method: 'POST',
			body: JSON.stringify({ token: get(token), app: active.toLowerCase() })
		})
			.then((res) => res.json())
			.then((res) => status = res.status);
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

  const controlClick = (action: string) => {
    fetch('http://nacktebusen.de/api/control', {
			method: 'POST',
			body: JSON.stringify({ token: get(token), app: active.toLowerCase(), cmd: action })
		})
  }
</script>

<div class="selector">
  <button class={active === firstTab ? 'active tab' : 'tab'} on:click={() => tabClick(firstTab)}>{firstTab}</button>
  {#each tabs as tab}
    <div class="space-w"></div>
    <button class={active === tab ? 'active tab' : 'tab'} on:click={() => tabClick(tab)}>{tab}</button>
  {/each}
</div>
<div class="console scrollbar">
  <div class="space"></div>
  {#each logs as log}
    <p class="log">{log}</p>
  {/each}
  <div class="space"></div>
</div>
<p>Status: <span style={status === 'running' ? 'color:rgb(0, 212, 0)' : status === 'stopped' ? 'color:red' : ''}>{status}</span></p>
<div class="buttons">
  <button class="start control-button" on:click={() => {controlClick('start')}}>
    <StartIcon/>
  </button>
  <button class="restart control-button" on:click={() => {controlClick('restart')}}>
    <RestartIcon/>
  </button>
  <button class="stop control-button" on:click={() => {controlClick('stop')}}>
    <StopIcon/>
  </button>
</div>

<style>
  .space-w{
    width: 50px;
  }
  .selector{
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
  .buttons{
    margin-top: 10px;
  }
  .control-button{
    width: 40px;
    height: 40px;
    padding: 0;
    border-radius: 5px;
    border-width: 2px;
    border-style: solid;
  }
  .start{
    background-color: rgb(0, 212, 0);
    border-color: rgb(0, 150, 0);
  }
  .start:hover{
    background-color: rgb(0, 255, 0);
  }
  .stop{
    background-color: rgb(197, 0, 0);
    border-color: rgb(112, 0, 0);
  }
  .stop:hover{
    background-color: rgb(255, 0, 0);
  }
  .restart{
    background-color: rgb(0, 102, 255);
    border-color: rgb(0, 38, 255);
  }
  .restart:hover{
    background-color: rgb(0, 162, 255);
  }
</style>