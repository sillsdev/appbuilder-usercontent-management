<script lang="ts">
    let group = 'delete-account';

    import type { PageData } from './$types';
    import AppMetadata from '$lib/components/AppMetadata.svelte';

    export let data: PageData;
    export let form: HTMLFormElement;
</script>

<div class="center">
    <AppMetadata
        appIcon={data.app?.appIcon}
        title={data.app?.listings[0].title}
        shortDescription={data.app?.listings[0].shortDescription}
        fullDescription={data.app?.listings[0].fullDescription}
    />
    <div class="flex flex-col w-full lg:flex-row">
        <div class="card w-96 bg-base-100 shadow-xl">
            <div class="card-body">
                <div class="question">
                    <legend>I want to delete</legend>
                    <div class="option">
                        <input
                            name="option"
                            type="radio"
                            id="delete-account"
                            bind:group
                            value="delete-account"
                        />
                        <label for="delete-account">My User Data</label>
                    </div>
                    <div class="option">
                        <input
                            name="option"
                            type="radio"
                            id="delete-user-data"
                            bind:group
                            value="delete-user-data"
                        />
                        <label for="delete-user-data">My Account</label>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <form method="POST" class="container">
        <button class="btn send">Send</button>
    </form>
</div>

<style>
    .send {
        position: absolute;
        top: 105%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 10px 20px;
        background-color: #007bff;
        color: white;
    }
    .center {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 10px;
        text-align: center;
    }

    div.question {
        display: flex;
        flex-direction: column;
        max-width: 300px;
        margin: auto;
        padding: 20px;
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
