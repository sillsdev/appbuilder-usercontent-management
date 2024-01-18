<script lang="ts">
    import type { PageData } from './$types';

    export let data: PageData;

    let code = ['', '', '', '', '', ''];
    // Function to update the code
    function updateCode(index: number, event: Event) {
        if (event.target === null) {
            return;
        }
        const { value } = event.target as HTMLInputElement;
        // Check if the last character is a digit
        const lastChar = value.slice(-1);
        if (lastChar.match(/^\d$/)) {
            code[index] = lastChar; // Set only if it's a digit
            if (index < code.length - 1) {
                document.getElementById(`input-${index + 1}`)?.focus(); // move to next input
            }
        } else {
            // If not a digit, clear the input
            code[index] = '';
            (event.target as HTMLInputElement).value = '';
        }
    }

    // Function to handle keydown events for backspace
    function handleBackspace(index: number, event: KeyboardEvent) {
        if (event.key === 'Backspace' && !code[index]) {
            if (index > 0) {
                document.getElementById(`input-${index - 1}`)?.focus(); // move to previous input
                code[index - 1] = ''; // clear the previous input
            }
        }
    }

    $: isCodeComplete = code.every((c) => c !== '');
</script>

<div class="verification-container">
    <h2>Verify your email address</h2>
    <p>
        We emailed you a six-digit code to {data.request?.email}. Enter the code below to confirm
        your email address.
    </p>

    <form method="POST" class="code-form">
        {#each code as value, index}
            <input
                class="code-input"
                type="text"
                id={`input-${index}`}
                maxlength="1"
                name={`input-${index}`}
                {value}
                on:input={(event) => updateCode(index, event)}
                on:keydown={(event) => handleBackspace(index, event)}
            />
        {/each}
        <button disabled={!isCodeComplete} type="submit">Verify</button>
    </form>
</div>

<style>
    .verification-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 20px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        width: fit-content;
        margin: auto;
    }

    .code-input {
        width: 50px;
        height: 50px;
        margin: 10px;
        text-align: center;
        font-size: 24px;
        border: 2px solid #d9d9d9;
        border-radius: 4px;
        transition: border-color 0.3s;
    }

    .code-input:focus {
        border-color: #007bff;
        outline: none;
    }
    .code-form {
        display: flex;
        justify-content: center;
    }
    button {
        padding: 0px 30px;
        border: none;
        background-color: #007bff;
        color: white;
        border-radius: 4px;
        cursor: pointer;
    }
</style>
