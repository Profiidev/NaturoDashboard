<script lang="ts">
	import { goto } from '$app/navigation';
  import { currentUser, pb } from '$lib/pocketbase/pocketbase';

  let username: string;
  let password: string;

  async function login() {
    const user = await pb.collection('users').authWithPassword(username, password);
    goto('/');
  }

  // async function signUp() {
  //   try {
  //     const data = {
  //       username,
  //       password,
  //       passwordConfirm: password,
  //       name: 'hi mom!',
  //     };
  //     const createdUser = await pb.collection('users').create(data);
  //     await login();
  //   } catch (err) {
  //     console.error(err)
  //   }
  // }

  function signOut() {
    pb.authStore.clear();
  }

</script>

{#if $currentUser}
  <div class="flex-container">
    <div class="info-container">
      <div class="info"></div>
      <p>Signed in as</p>
      <p>{$currentUser.username}</p>
      <button class="submit-btn signout" on:click={signOut}>Sign Out</button>
    </div>
  </div>
{:else}
  <div class="flex-container">
    <div class="content-container">
      <div class="form-container">
        <form on:submit|preventDefault>
          <h1>NaturoForum Login</h1>
          <br>
          <input
            placeholder="Username"
            type="text"
            bind:value={username}
          />
          <br>
          <br>
          <input 
            placeholder="Password" 
            type="password" 
            bind:value={password} 
          />
          <br>
          <br>
          <button class="submit-btn" on:click={login}>Login</button>
        </form>
      </div>
    </div>
  </div>
{/if}

<style>
  p{
    color: white;
    font-size: 30px;
    margin: 20px 0 0 0;
    justify-content: center;
    display: flex;
  }

  .info-container{
    background-color: var(--navbar-color);
    width: 300px;
    height: 190px;
    border-radius: 12px;
    margin-top: 60px;
    justify-items: center;
    flex-direction: column;
    display: flex;
  }

  .signout{
    margin-top: 20px;
    position: relative;
    left: 50%;
    transform: translate(-50%);
  }

  form:not(.user-is-tabbing) button:focus,
  form:not(.user-is-tabbing) input:focus {
    outline: none;
  } 

  h1 {
    color: white;

    font-size: 35px;
    font-weight: 800;
  }

  .flex-container {
    width: 100vw;

    margin-top: 60px;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .content-container {
    width: 500px;
    height: 350px;
  }

  .form-container {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 500px;
    height: 350px;

    margin-top: 5px;
    padding-bottom: 20px;

    border-radius: 12px;

    display: flex;
    justify-content: center;
    flex-direction: column;

    background: var(--navbar-color);
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.199);
  }

  input {
    border: none;
    border-bottom: solid rgb(143, 143, 143) 1px;

    margin-bottom: 30px;

    background: none;
    color: rgba(255, 255, 255, 0.555);

    height: 35px;
    width: 300px;
  }

  .submit-btn {
    cursor: pointer;

    border: none;
    border-radius: 8px;

    background: #00b5ec;
    color: white;

    width: 80px;
    height: 35px;

    transition: all 1s;
  }
</style>