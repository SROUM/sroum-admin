<script lang="ts">
  import { Api } from '../utils/api';
  import { adminUser } from '../utils/stores';

  const api = new Api();
  $: adminSummary = api.get('/mock/admin_summary.json');
</script>

<article>
  <section class="mb-10">
    <h1 class="mb-4 text-3xl font-bold leading-none tracking-tight text-gray-900">
      ACCESS SUMMARY
    </h1>

    {#await adminSummary then adminSummary}
      <ul class="max-w-md space-y-1 text-gray-700 list-disc list-inside">
        <li>
          Current Access: {$adminUser?.accessTime}
        </li>
        <li>
          Last Access: {adminSummary.lastAccessTime}
        </li>
      </ul>
    {/await}
  </section>

  <section>
    <h1 class="mb-4 text-3xl font-bold leading-none tracking-tight text-gray-900">
      DATABASE SUMMARY
    </h1>

    {#await adminSummary then adminSummary}
      <ul class="max-w-md space-y-1 text-gray-700 list-disc list-inside">
        <li>
          Database Status: {adminSummary.database.status}
        </li>
        <li>
          # of Tabled: {adminSummary.database.tableSize}
        </li>
        <li>
          Total # of Entries(Instances): {adminSummary.database.totalEntries}
        </li>
      </ul>
    {/await}
  </section>
</article>
