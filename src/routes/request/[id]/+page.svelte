<script lang="ts">
    let group = 'delete-account';

    import type { PageData } from './$types';
    import AppMetadata from '$lib/components/AppMetadata.svelte';
    import { _, locale } from 'svelte-i18n';

    export let data: PageData;
    $: currentLocale = $locale || '';
</script>

<div class="min-h-screen flex flex-col items-center justify-center">
    <div>
        {#if data.app?.listings}
            {#each data.app.listings as listing, index}
                {#if listing.lang.startsWith(currentLocale)}
                    <AppMetadata
                        appIcon={data.app?.appIcon}
                        title={data.app?.listings[index].title}
                        shortDescription={data.app?.listings[index].shortDescription}
                        fullDescription={data.app?.listings[index].fullDescription}
                        expandDescription={$_('page.initial.dropdown')}
                    />
                {/if}
            {/each}
        {/if}
    </div>
    <form method="POST" class="container">
        <div class="flex flex-col w-full items-center">
            <div class="card w-7/8 md:w-1/2 bg-base-100 shadow-xl">
                <div class="card-body">
                    <div class="question">
                        <legend>{$_('page.request.option')}</legend>
                        <div class="option">
                            <input
                                name="option"
                                type="radio"
                                id="delete-account"
                                bind:group
                                value="delete-account"
                            />
                            <label for="delete-account">{$_('page.request.userData')}</label>
                        </div>
                        <div class="option">
                            <input
                                name="option"
                                type="radio"
                                id="delete-user-data"
                                bind:group
                                value="delete-user-data"
                            />
                            <label for="delete-user-data">{$_('page.request.account')}</label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="m-5">
                <button class="btn bg-dodger-blue text-white">{$_('page.request.send')}</button>
            </div>
        </div>
    </form>
</div>

<style>
    div.question {
        display: flex;
        flex-direction: column;
        max-width: 300px;
        margin: auto;
        padding: 20px;
        text-align: left;
    }

    legend {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 10px;
    }

    .option {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
    }

    input {
        margin-right: 10px;
    }

    button {
        padding: 10px 15px;
        font-size: 16px;
        cursor: pointer;
    }
</style>
