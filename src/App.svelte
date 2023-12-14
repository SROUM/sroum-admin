<script lang="ts">
  import Login from './components/Login.svelte';
  import Nav from './components/Nav.svelte';
  import {routes} from './utils/routes';
  import Router, { push } from 'svelte-spa-router';
  import {adminUser} from './utils/stores';

  const menus: Menu[] = [
    { name: 'Home', url: '/home' },
    { name: 'User', url: '/user' },
    { name: 'Spot', url: '/spot' },
    { name: 'Visit', url: '/visit' },
  ];

  function handleLogin(event: CustomEvent) {
    push('/home');

    adminUser.set(event.detail);
  }


</script>

<main class="{$adminUser ? '' : 'bg-amber-700'} h-screen">
  {#if $adminUser}
    <Nav {menus}/>
    <div class="container mt-32"><Router {routes}/></div>
  {:else}
    <div class="container pt-44">
      <Login on:login={(event)=> handleLogin(event)}/>
    </div>
  {/if}
</main>

