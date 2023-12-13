<script lang="ts">
  import Nav from './components/Nav.svelte';
  import {routes} from './utils/routes';
  import Router from 'svelte-spa-router';

  const menus: Menu[] = [
    { name: 'Home', url: '/home' },
    { name: 'User', url: '/user' },
    { name: 'Spot', url: '/spot' },
    { name: 'Visit', url: '/visit' },
  ];

</script>

<main>
  <Nav {menus}/>
  <Router {routes}/>
</main>

