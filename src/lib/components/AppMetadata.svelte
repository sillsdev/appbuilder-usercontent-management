<!-- AppDetails.svelte -->
<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    export let appIcon: string | undefined;
    export let title: string | undefined;
    export let shortDescription: string | undefined;
    export let fullDescription: string | undefined;

    let isExpanded = false;
    const dispatch = createEventDispatcher();

    const toggleDescription = () => {
        isExpanded = !isExpanded;
        dispatch('toggle', { isExpanded });
    };
</script>

<div class="mb-5">
    <img
        src={appIcon}
        alt={title}
        class="w-32 h-32 object-cover rounded-md shadow-md mx-auto mb-4"
    />
    <h1 class="text-2xl font-bold">{title}</h1>
    <main class="max-w-screen-md prose sm:prose-lg md:prose-xl lg:prose-2xl xl:prose-3xl">
        <p class="text-xl font-bold">{shortDescription}</p>
        <br />
        <div class={isExpanded ? 'block' : 'hidden'}>
            <p>{fullDescription}</p>
        </div>
        <button on:click={toggleDescription} class="text-blue-500 cursor-pointer">
            {isExpanded ? 'Collapse' : 'Expand'} Full App Description
        </button>
    </main>
</div>
