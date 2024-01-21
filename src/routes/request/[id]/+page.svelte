<script lang="ts">
    let group = 'delete-account';
</script>

<div class="center">
    <div class="flex flex-col w-full lg:flex-row">
        <div class="card w-96 bg-neutral text-primary-content">
            <div class="card-body">
                <form method="POST" class="container">
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
                            <label for="delete-account">My Account</label>
                        </div>
                        <div class="option">
                            <input
                                name="option"
                                type="radio"
                                id="delete-user-data"
                                bind:group
                                value="delete-user-data"
                            />
                            <label for="delete-user-data">My User Data</label>
                        </div>
                        <button class="btn">Send</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<style>
    .center {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 10px;
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
