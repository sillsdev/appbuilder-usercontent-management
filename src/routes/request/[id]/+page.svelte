<script lang="ts">
    import type { PageData } from './$types';

    export let data: PageData;
</script>

<p>
    Thank you {data.request?.email} for verifying your email!
</p>
