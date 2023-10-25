<!-- src/routes/+page.svelte -->

<!-- 1. -->
<script lang="ts">
    //	import Post from '$lib/components/Post.svelte';
    import type { PageData } from './$types';

    export let data: PageData;
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
</div>
