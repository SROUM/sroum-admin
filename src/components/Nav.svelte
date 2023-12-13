<script lang="ts">
  import { link } from 'svelte-spa-router';
  import active from 'svelte-spa-router/active';

  export let menus: Menu[];
</script>

<nav class="bg-amber-700 fixed w-full z-20 top-0 start-0 border-b tracking-wider">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <a href="#none" class="flex items-center space-x-3 rtl:space-x-reverse">
      <span class="self-center text-3xl font-bold text-white whitespace-nowrap"
        >sroum</span
      >
    </a>
    <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
      <button
        type="button"
        class="text-white bg-black/25 hover:bg-blue-800 font-medium rounded-full text-sm px-4 py-2 text-center"
        >LOGOUT</button
      >
    </div>

    <div
      class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
      id="navbar-sticky"
    >
      <ul
        class="flex flex-col p-4 md:p-0 mt-4 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0"
      >
        {#each menus as menu}
          <li>
            <!-- svelte-ignore a11y-missing-attribute -->
            <a
              use:link="{menu.url}"
              use:active="{{
                className: 'font-medium underline underline-offset-8',
                inactiveClassName: 'font-extralight',
              }}"
              class="block py-2 px-3 text-white text-lg md:bg-transparent md:p-0"
              >{menu.name.toUpperCase()}</a
            >
          </li>
        {/each}
      </ul>
    </div>
  </div>
</nav>
