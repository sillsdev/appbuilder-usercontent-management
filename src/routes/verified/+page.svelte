<script>
    const values = [
        { label: 'Delete Account', value: 10 },
        { label: 'Just Delete User Data', value: 30 }
    ];

    let selected = values[1];
</script>

{#each values as value}
    <label>
        <input type="radio" bind:group={selected} name="amount" {value} />
        {value.label}
    </label>
{/each}
