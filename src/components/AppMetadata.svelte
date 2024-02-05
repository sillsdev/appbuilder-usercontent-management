<!-- AppDetails.svelte -->
<script lang="ts">
    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';

    import type { PageData } from '../routes/app/[id]/$types';
    export let data: PageData;

    let isExpanded = false;
    const dispatch = createEventDispatcher();

    onMount(() => {
        // You can initialize any necessary logic here
    });

    const toggleDescription = () => {
        isExpanded = !isExpanded;
        dispatch('toggle', { isExpanded });
    };
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
        <div class={isExpanded ? 'block' : 'hidden'}>
            <p>{data.app?.listings[0].fullDescription}</p>
        </div>
        <button on:click={toggleDescription} class="text-blue-500 cursor-pointer">
            {isExpanded ? 'Collapse' : 'Expand'} Description
        </button>
    </main>
</div>
