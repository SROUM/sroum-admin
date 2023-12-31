<script lang="ts">
  import { onMount } from 'svelte';
  import { Api } from '../utils/api';
  import { users } from '../utils/stores';
  import { mapToObject } from '../utils/common';

  const api = new Api();

  $: userDatabaseInfo = api.get('/mock/user_database_info.json');

  onMount(() => {
    api.get('/mock/users.json').then(res => users.set(res.users));
  });

  const userMap = new Map<string, string>();

  function setUserAttrData(event: Event) {
    const target = event.target as HTMLInputElement;
    userMap.set(target.id, target.value);
  }

  /**
   * NOTE:
   * 아래의 CRUD 동작들은 실제로는 서버에서 이루어져야 합니다.
   * 현재는 Mock Json Data를 사용하고 있어, 실제로는 서버에서 이루어지는 CRUD 동작들을 store에 저장후 업데이트 하는 방식을 사용하고 있습니다.
   */
  function createUser() {
    const newUser = mapToObject(userMap) as User;

    users.update(users => [...users, newUser]);
  }

  function updateUser() {
    const userToUpdate = mapToObject(userMap) as User;

    const userIndex = $users.findIndex(user => user.id === userToUpdate.id);
    if (userIndex < 0) {
      return;
    }

    users.update(users => [
      ...users.slice(0, userIndex),
      userToUpdate,
      ...users.slice(userIndex + 1),
    ]);
  }

  function deleteUser() {
    const userIdToDelete = userMap.get('id');

    const userIndex = $users.findIndex(user => user.id === userIdToDelete);
    if (userIndex < 0) {
      return;
    }

    users.update(users => [...users.slice(0, userIndex), ...users.slice(userIndex + 1)]);
  }
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
                  id="{attr.name}"
                  class="bg-gray-100 border-none text-gray-600 placeholder:text-gray-400 text-sm rounded-md focus:ring-gray-200 focus:border-gray-200 block w-full p-2"
                  placeholder="{`${attr.name}: ${attr.type.toUpperCase()}${
                    attr.isPrimaryKey ? ' primary-key' : ''
                  }`}"
                  on:change="{setUserAttrData}"
                />
              {:else if attr.input === 'select'}
                <div
                  class="bg-gray-100 border-none text-sm rounded-md focus:ring-gray-200 focus:border-gray-200 block w-full p-2"
                >
                  <span class="text-gray-400"
                    >{`${attr.name}: ${attr.type.toUpperCase()}`}</span
                  >
                  <select
                    id="{attr.name}"
                    class="py-2.5 px-0 ml-2 w-1/2 text-sm text-gray-600 bg-transparent border-none appearance-none focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                    on:change="{setUserAttrData}"
                  >
                    <option selected></option>
                    {#each attr.selectOptions as option}
                      <option value="{option}">{option}</option>
                    {/each}
                  </select>
                </div>
              {:else if attr.input === 'textarea'}
                <textarea
                  id="{attr.name}"
                  rows="4"
                  class="bg-gray-100 border-none text-gray-600 placeholder:text-gray-400 text-sm rounded-md focus:ring-gray-200 focus:border-gray-200 block w-full p-2"
                  placeholder="{`${attr.name}: ${attr.type.toUpperCase()}`}"
                  on:change="{setUserAttrData}"
                ></textarea>
              {/if}
            </div>
          {/each}

          <button
            type="button"
            class="text-gray-500 bg-gray-300 border-none focus:outline-none hover:bg-amber-700 hover:text-gray-200 focus:ring-4 focus:ring-gray-200 font-semibold rounded-md text-sm px-5 py-2.5 me-2 mb-2 w-full"
            on:click="{createUser}">CREATE (INSERT)</button
          >
          <button
            type="button"
            class="text-gray-500 bg-gray-300 border-none focus:outline-none hover:bg-amber-700 hover:text-gray-200 focus:ring-4 focus:ring-gray-200 font-semibold rounded-md text-sm px-5 py-2.5 me-2 mb-2 w-full"
            on:click="{updateUser}">UPDATE</button
          >
          <button
            type="button"
            class="text-gray-500 bg-gray-300 border-none focus:outline-none hover:bg-amber-700 hover:text-gray-200 focus:ring-4 focus:ring-gray-200 font-semibold rounded-md text-sm px-5 py-2.5 me-2 mb-2 w-full"
            on:click="{deleteUser}">DELETE</button
          >
        </section>
      {/await}
    </div>
    <section class="col-span-2">
      <h2 class="mb-4 text-xl font-semibold leading-none tracking-tight text-gray-900">
        Data.
      </h2>

      {#if $users.length}
        <div class="relative overflow-x-auto">
          <table class="w-full text-sm text-left text-gray-500">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                {#each Object.keys($users[0]) as key}
                  <th scope="col" class="px-6 py-3">
                    {key}
                  </th>
                {/each}
              </tr>
            </thead>
            <tbody>
              {#each $users as user}
                <tr class="bg-white border-b">
                  {#each Object.values(user) as value}
                    <td class="px-6 py-4">{value}</td>
                  {/each}
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      {/if}
    </section>
  </div>
</article>
