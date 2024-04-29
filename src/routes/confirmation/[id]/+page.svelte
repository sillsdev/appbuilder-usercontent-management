<script lang="ts">
    import type { PageData } from './$types';
    import { _ } from 'svelte-i18n';

    export let data: PageData;
</script>

<div class="flex flex-col items-center justify-center min-h-screen">
    <div class="card w-3/4 bg-green-600 shadow-xl">
        <div class="card-body">
            <h2 class="card-title">{$_('page.confirmation.confirmationMessage')}</h2>
            {$_('page.confirmation.email')}
            <span class="font-bold text-black">{data.request?.email}. </span>
            <br />
            {$_('page.confirmation.selected')}
            {#if data.request?.changeRequest == 'delete-user-data'}
                <span class="font-bold text-black">User Data.</span>
            {:else}
                <span class="font-bold text-black">Account.</span>
            {/if}
        </div>
    </div>
</div>
