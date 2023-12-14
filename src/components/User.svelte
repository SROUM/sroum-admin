<script lang="ts">
  import { onMount } from 'svelte';
  import { Api } from '../utils/api';

  const api = new Api();

  $: userDatabaseInfo = api.get('/mock/user_database_info.json');
</script>

<article>
  <h1 class="mb-10 text-3xl font-bold leading-none tracking-tight text-gray-900">USER</h1>
  <div class="grid grid-cols-3 gap-5">
    <div>
      {#await userDatabaseInfo then userDatabaseInfo}
        <section class="mb-10">
          <h2
            class="mb-4 text-xl font-semibold leading-none tracking-tight text-gray-900"
          >
            Table Information.
          </h2>
          <ul class="max-w-md space-y-1 text-gray-700 list-disc list-inside">
            <li>
              Table Created: {userDatabaseInfo.createdAt}
            </li>
            <li>
              # of Attributes: {userDatabaseInfo.attributes.length}
            </li>
            <li>
              Table Size (# of Entries): {userDatabaseInfo.size}
            </li>
          </ul>
        </section>
        <section>
          <h2
            class="mb-4 text-xl font-semibold leading-none tracking-tight text-gray-900"
          >
            Data CRUD.
          </h2>
          {#each userDatabaseInfo.attributes as attr}
            <div class="mb-3">
              {#if attr.input === 'text'}
              <input
                type="text"
                class="bg-gray-100 border-none text-gray-600 placeholder:text-gray-400 text-sm rounded-md focus:ring-gray-200 focus:border-gray-200 block w-full p-2"
                placeholder="{`${attr.name}: ${attr.type.toUpperCase()}${attr.isPrimaryKey ? ' primary-key': ''}`}"
                required
              />
              {:else if attr.input === 'select'}
              <div class="bg-gray-100 border-none text-sm rounded-md focus:ring-gray-200 focus:border-gray-200 block w-full p-2">
                <span class="text-gray-400">{`${attr.name}: ${attr.type.toUpperCase()}`}</span>
                <select class="py-2.5 px-0 ml-2 w-1/2 text-sm text-gray-600 bg-transparent border-none appearance-none focus:outline-none focus:ring-0 focus:border-gray-200 peer">
                  <option selected></option>
                  {#each attr.selectOptions as option}
                  <option value="{option}">{option}</option>
                  {/each}
              </select>
              </div>
              {:else if attr.input==='textarea'}
              <textarea id="message" rows="4" class="bg-gray-100 border-none text-gray-600 placeholder:text-gray-400 text-sm rounded-md focus:ring-gray-200 focus:border-gray-200 block w-full p-2" placeholder="{`${attr.name}: ${attr.type.toUpperCase()}`}"></textarea>
              {/if}
            </div>
          {/each}

          <button type="button" class="text-gray-500 bg-gray-300 border-none focus:outline-none hover:bg-amber-700 hover:text-gray-200 focus:ring-4 focus:ring-gray-200 font-semibold rounded-md text-sm px-5 py-2.5 me-2 mb-2 w-full">CREATE (INSERT)</button>
          <button type="button" class="text-gray-500 bg-gray-300 border-none focus:outline-none hover:bg-amber-700 hover:text-gray-200 focus:ring-4 focus:ring-gray-200 font-semibold rounded-md text-sm px-5 py-2.5 me-2 mb-2 w-full">UPDATE</button>
          <button type="button" class="text-gray-500 bg-gray-300 border-none focus:outline-none hover:bg-amber-700 hover:text-gray-200 focus:ring-4 focus:ring-gray-200 font-semibold rounded-md text-sm px-5 py-2.5 me-2 mb-2 w-full">DELETE</button>
        </section>
      {/await}
    </div>
    <section class="col-span-2">World</section>
  </div>
</article>
