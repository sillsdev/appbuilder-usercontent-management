<script lang="ts">
    import type { PageData } from './$types';

    export let data: PageData;

    let code = ['', '', '', '', '', ''];

    function updateCode(index: number, event: Event) {
        const input = event.target as HTMLInputElement;
        const lastChar = input.value.slice(-1);
        if (lastChar.match(/^\d$/)) {
            code[index] = lastChar;
            if (index < code.length - 1) {
                document.getElementById(`input-${index + 1}`)?.focus();
            }
        } else {
            code[index] = '';
            input.value = '';
        }
    }

    function handleBackspace(index: number, event: KeyboardEvent) {
        if (event.key === 'Backspace' && !code[index]) {
            if (index > 0) {
                document.getElementById(`input-${index - 1}`)?.focus();
                code[index - 1] = '';
            }
        }
    }

    $: isCodeComplete = code.every((c) => c !== '');
</script>

<div class="verification-container">
    <img src="/email-icon.png" alt="Email Verification Icon" class="email-icon" />
    <h1>Verify your email address</h1>
    <br />
    <p>
        Thank You! We emailed you a six-digit code to <span class="font-bold text-black"
            >{data.request?.email}.</span
        >
        <br />
        <span class="text-center block">Enter the code below to confirm your email address. </span>
    </p>
    <br />

    <form method="POST" class="code-form">
        <div class="inputs-row">
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
        </div>
        <div class="button-container">
            <button class="btn btn-primary" disabled={!isCodeComplete} type="submit">Verify</button>
        </div>
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
        background-color: white;
    }

    h1 {
        color: #007bff;
        font-size: 32px;
    }

    .code-input {
        width: 50px;
        height: 50px;
        margin: 5px;
        text-align: center;
        font-size: 24px;
        border: 2px solid #d9d9d9;
        border-radius: 8px;
        transition: border-color 0.3s;
    }

    .code-input:focus {
        border-color: #007bff;
        outline: none;
    }

    .email-icon {
        width: 100px;
        height: auto;
        margin-bottom: 20px;
    }

    .inputs-row {
        display: flex;
        justify-content: center;
    }

    .button-container {
        margin-top: 20px;
    }

    .code-form {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    button {
        padding: 10px 30px;
        border: none;
        background-color: #007bff;
        color: white;
        border-radius: 8px;
        cursor: pointer;
        transition: background-color 0.3s;
        display: block;
        margin-left: auto;
        margin-right: auto;
    }

    button:hover {
        background-color: #0056b3;
    }

    h1,
    p {
        width: 100%;
        text-align: center;
        margin: 10px 0;
    }

    @media (max-width: 768px) {
        .verification-container {
            width: 90%;
            margin-top: 25%;
            box-sizing: border-box;
        }

        .code-input {
            margin: 2px;
        }
    }
</style>
