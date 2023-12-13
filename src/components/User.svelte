<script lang="ts">
  import { onMount } from 'svelte';
  import { Api } from '../utils/api';

  const api = new Api();

  $: userDatabaseInfo = api.get('/mock/user_database_info.json');
</script>

<section>
  <h1 class="mb-10 text-3xl font-bold leading-none tracking-tight text-gray-900">USER</h1>
  <div class="grid grid-cols-3 gap-5">
    <div>
      <div>
        <h2 class="mb-4 text-xl font-semibold leading-none tracking-tight text-gray-900">
          Table Information.
        </h2>
        {#await userDatabaseInfo}
          <p>...loading</p>
        {:then userDatabaseInfo}
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
        {/await}
      </div>
    </div>
    <div class="col-span-2">World</div>
  </div>
</section>
