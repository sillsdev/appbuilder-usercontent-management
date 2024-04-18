<script lang="ts">
    let group = 'delete-account';

    import type { PageData } from './$types';
    import AppMetadata from '$lib/components/AppMetadata.svelte';
    import { _ } from 'svelte-i18n';

    export let data: PageData;
    export let form: HTMLFormElement;
</script>

<div class="center">
    <div>
        {#if data.app?.listings}
            {#each data.app.listings as listing, index}
                {#if listing.lang.substring(0, 2) === $_('langCode')}
                    <AppMetadata
                        appIcon={data.app?.appIcon}
                        title={data.app?.listings[index].title}
                        shortDescription={data.app?.listings[index].shortDescription}
                        fullDescription={data.app?.listings[index].fullDescription}
                        expandDescription={$_('page.initial.dropdown')}
                    />
                {:else if data.app.listings.length === index + 1}
                    <AppMetadata
                        appIcon={data.app?.appIcon}
                        title={data.app?.listings[0].title}
                        shortDescription={data.app?.listings[0].shortDescription}
                        fullDescription={data.app?.listings[0].fullDescription}
                        expandDescription={$_('page.initial.dropdown')}
                    />
                {/if}
            {/each}
        {/if}
    </div>
    <div class="flex flex-col w-full lg:flex-row">
        <div class="card w-96 bg-base-100 shadow-xl">
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
    </div>
    <form method="POST" class="container">
        <button class="btn send">{$_('page.request.send')}</button>
    </form>
</div>

<style>
    .send {
        position: absolute;
        top: 105%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 10px 20px;
        background-color: #007bff;
        color: white;
    }
    .center {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 10px;
        text-align: center;
    }

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
