<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  let email: string;
  let password: string;

  function logIn() {
    dispatch('login', { email, password, accessTime: new Date().toLocaleString() });
  }
</script>

<form class="max-w-sm mx-auto text-center">
  <span class="self-center text-5xl font-bold text-white whitespace-nowrap">sroum</span>

  <div class="mb-5 mt-8">
    <input
      type="email"
      id="email"
      class="bg-gray-50 border border-gray-300 text-amber-800 text-md rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5"
      placeholder="Email"
      bind:value="{email}"
      required
    />
  </div>
  <div class="mb-5">
    <input
      placeholder="Password"
      type="password"
      id="password"
      class="bg-gray-50 border border-gray-300 text-amber-800 text-md rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5"
      bind:value="{password}"
      required
    />
  </div>
  <div class="flex items-start mb-5">
    <div class="flex items-center h-5">
      <input
        id="remember"
        type="checkbox"
        value=""
        class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-amber-300"
      />
    </div>
    <label for="remember" class="ms-2 text-sm font-medium text-white">Remember me</label>
  </div>
  <button
    type="submit"
    class="text-white bg-amber-900/25 hover:bg-amber-900 focus:ring-4 focus:outline-none focus:ring-amber-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
    on:click="{() => logIn()}">Submit</button
  >
</form>
