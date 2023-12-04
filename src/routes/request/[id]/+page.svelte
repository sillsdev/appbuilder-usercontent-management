<script lang="ts">
    import { onMount } from 'svelte';

    let group = 'user datamanagement';
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
        <div class="option">
            <input
                name="option"
                type="radio"
                id="delete-account"
                bind:group
                value="delete-account"
            />
            <label for="delete-account">Delete Account</label>
        </div>
        <div class="option">
            <input
                name="option"
                type="radio"
                id="delete-user-data"
                bind:group
                value="delete-user-data"
            />
            <label for="delete-user-data">Delete User Data</label>
        </div>
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
