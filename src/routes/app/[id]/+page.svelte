<!-- src/routes/+page.svelte -->

<!-- 1. -->
<script lang="ts">
    //	import Post from '$lib/components/Post.svelte';
    import type { PageData } from './$types';
    import AppMetadata from '$lib/components/AppMetadata.svelte';

    export let data: PageData;
    export let form: HTMLFormElement;
</script>

<div class="flex justify-center p-4 bg-gray-100">
    <div class="text-center">
        <h1 class="uppercase font-bold text-5xl mb-5">User Data Management</h1>
        <AppMetadata
            appIcon={data.app?.appIcon}
            title={data.app?.listings[0].title}
            shortDescription={data.app?.listings[0].shortDescription}
            fullDescription={data.app?.listings[0].fullDescription}
        />
        <fieldset class="border p-4 space-y-4">
            <legend class="text-lg font-semibold">Verify Email</legend>
            <p>
                We believe your data is yours, and we store it for your benefit. <br />
                If you'd like us to delete your data from our servers, or your whole account, just tell
                us. <br />
                For your protection, we'll start by verifying the email address for your account
            </p>
            <form bind:this={form} method="POST" class="space-y-4">
                <div class="flex flex-col items-center">
                    <label for="email" class="text-base font-bold">Email Address:</label>
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
