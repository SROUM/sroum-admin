import Home from '../components/Home.svelte';
import Spot from '../components/Spot.svelte';
import User from '../components/User.svelte';
import Visit from '../components/Visit.svelte';
import Login from '../components/Login.svelte';

export const routes = {
  '/': Login,
  '/home': Home,
  '/spot': Spot,
  '/user': User,
  '/visit': Visit,
};
