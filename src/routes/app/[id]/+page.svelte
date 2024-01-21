<!-- src/routes/+page.svelte -->

<!-- 1. -->
<script lang="ts">
    //	import Post from '$lib/components/Post.svelte';
    import type { PageData } from './$types';

    export let data: PageData;
    export let form: HTMLFormElement;
</script>

<div class="flex justify-center p-4 bg-gray-100">
    <div class="text-center">
        <img
            src={data.app?.appIcon}
            alt={data.app?.listings[0].title}
            class="w-32 h-32 object-cover rounded-md shadow-md mx-auto mb-4"
        />
        <h1 class="text-2xl font-bold">{data.app?.listings[0].title}</h1>
        <main class="prose">
            <p>{data.app?.listings[0].shortDescription}</p>
            <p>{data.app?.listings[0].fullDescription}</p>
        </main>
        <fieldset class="border p-4 space-y-4">
            <legend class="text-lg font-semibold">Verify Email</legend>
            <form bind:this={form} method="POST" class="space-y-4">
                <div class="flex flex-col items-center">
                    <label for="email" class="text-sm font-semibold">Email Address:</label>
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
                    >Send</button
                >
            </form>
            <p class="text-green-500">{form?.success || ''}</p>
        </fieldset>
    </div>
</div>
