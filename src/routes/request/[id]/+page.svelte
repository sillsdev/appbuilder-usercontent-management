<script lang="ts">
    import { onMount } from 'svelte';

    // import { API_TOKEN } from '$env/static/private';
    let group = 'user datamanagement';
    const options = { 'delete-account': 'Delete Account', 'delete-user-data': 'Delete User Data' };

    onMount(() => {
        const inputs = document.querySelectorAll('input');
        const hasChecked = Array.from(inputs).some((input) => input.checked);
        if (!hasChecked) {
            inputs[0].checked = true;
        }
    });
</script>

<form method="POST" class="container">
    <div class="question">
        <legend>Options for User Data Management:</legend>
        {#each Object.entries(options) as [name, label]}
            <div class="option">
                <input name="option" type="radio" id={name} bind:group value={name} />
                <label for={name}>{label}</label>
            </div>
        {/each}
        <button type="submit">Send</button>
    </div>
</form>

<style>
    div.question {
        display: flex;
        flex-direction: column;
        max-width: 300px;
        margin: auto;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 5px;
        text-align: left;
    }

    legend {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 10px;
    }

    .option {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
    }

    input {
        margin-right: 10px;
    }

    button {
        padding: 10px 15px;
        font-size: 16px;
        cursor: pointer;
    }
</style>
