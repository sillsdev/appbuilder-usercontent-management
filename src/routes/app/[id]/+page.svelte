<!-- src/routes/+page.svelte -->

<!-- 1. -->
<script lang="ts">
    //	import Post from '$lib/components/Post.svelte';
    import type { PageData } from './$types';

    export let data: PageData;
    export let form;
</script>

<div>
    <h1>{data.app?.listings[0].title}</h1>
    <main>
        <p>
            {data.app?.listings[0].shortDescription}
        </p>
        <p>
            {data.app?.listings[0].fullDescription}
        </p>
    </main>
    <fieldset>
        <legend>Verify Email</legend>
        <form method="POST" class="container">
            <div class="input">
                <label for="">Email Address:</label>
                <input name="to" type="email" value="" />
            </div>
            <button type="submit">Send</button>
        </form>
        <p class="success">{form?.success || ''}</p>
    </fieldset>
</div>
