<!-- AppDetails.svelte -->
<script lang="ts">
    import type { PageData } from '../routes/app/[id]/$types';
    export let data: PageData;
</script>

<div>
    <img
        src={data.app?.appIcon}
        alt={data.app?.listings[0].title}
        class="w-32 h-32 object-cover rounded-md shadow-md mx-auto mb-4"
    />
    <h1 class="text-2xl font-bold">{data.app?.listings[0].title}</h1>
    <main class="max-w-screen-md prose sm:prose-lg md:prose-xl lg:prose-2xl xl:prose-3xl">
        <p class="text-3xl">{data.app?.listings[0].shortDescription}</p>
        <p>{data.app?.listings[0].fullDescription}</p>
    </main>
</div>
