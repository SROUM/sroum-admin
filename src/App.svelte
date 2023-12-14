<script lang="ts">
  import Login from './components/Login.svelte';
  import Nav from './components/Nav.svelte';
  import {routes} from './utils/routes';
  import Router, { push } from 'svelte-spa-router';

  const menus: Menu[] = [
    { name: 'Home', url: '/home' },
    { name: 'User', url: '/user' },
    { name: 'Spot', url: '/spot' },
    { name: 'Visit', url: '/visit' },
  ];

  let isLoggedIn = false;

  function handleLogin() {
    push('/home');

    isLoggedIn = true;
  }


</script>

<main class="{isLoggedIn ? '' : 'bg-amber-700'} h-screen">
  {#if isLoggedIn}
    <Nav {menus}/>
    <div class="container mt-32"><Router {routes}/></div>
  {:else}
    <div class="container pt-44">
      <Login on:login={()=> handleLogin()}/>
    </div>
  {/if}
</main>

