<!-- src/routes/+page.svelte -->

<!-- 1. -->
<script lang="ts">
    //	import Post from '$lib/components/Post.svelte';
    import { _ } from 'svelte-i18n';
    import type { PageData } from './$types';
    import AppMetadata from '$lib/components/AppMetadata.svelte';

    export let data: PageData;
    export let form: HTMLFormElement;
</script>

<div class="flex justify-center p-4 bg-gray-100">
    <div class="text-center">
        <h1 class="uppercase font-bold text-5xl mb-5">{$_('page.initial.title')}</h1>
        <AppMetadata
            appIcon={data.app?.appIcon}
            title={data.app?.listings[0].title}
            shortDescription={data.app?.listings[0].shortDescription}
            fullDescription={data.app?.listings[0].fullDescription}
            expandDescription={$_('page.initial.dropdown')}
        />
        <fieldset class="border p-4 space-y-4">
            <legend class="text-lg font-semibold">{$_('page.initial.verify')}</legend>
            <p>
                {$_('page.initial.explanation')}
            </p>
            <form bind:this={form} method="POST" class="space-y-4">
                <div class="flex flex-col items-center">
                    <label for="email" class="text-base font-bold"
                        >{$_('page.initial.emailAddress')}:</label
                    >
                    <input
                        name="to"
                        id="email"
                        type="email"
                        value=""
                        class="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>
                <button
                    type="submit"
                    class="bg-blue-500 text-white p-3 rounded-md w-48 hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 text-lg"
                    >{$_('page.initial.send')}</button
                >
            </form>
            <p class="text-green-500">{form?.success || ''}</p>
        </fieldset>
    </div>
</div>
