<script>
    import { onMount } from "svelte";
    let group = "user datamanagement";
    const options = ["Delete Account", "Just Delete User Data"];
  
    onMount(() => {
      const inputs = document.querySelectorAll("input");
      const hasChecked = Array.from(inputs).some((input) => input.checked);
      if (!hasChecked) {
        inputs[0].checked = true;
      }
    });
  
    async function handleSubmit() {
      console.log('Selected Option:', group);
  
      const scriptoriaHost = "https://dev.scriptoria.io";
      const apiToken = "SCRIPTORIA_API_TOKEN";
  
      const payload = {
        data: {
          type: "product-user-changes",
          attributes: {
            email: "joe@example.com", // Replace with the email value
            change: group === "Delete Account" ? "delete-account" : "delete-user-data",
          },
          relationships: {
            product: {
              data: {
                type: "products",
                id: "d5543beb-6fc0-4f37-bf48-1f20f5a567c2", // Replace with your actual product ID
              },
            },
          },
        },
      };
  
      try {
        const response = await fetch(`${scriptoriaHost}/api/product-user-change`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${apiToken}`,
            "Content-Type": "application/vnd.api+json",
          },
          body: JSON.stringify(payload),
        });
  
        if (response.ok) {
          console.log("Request successful. Response: 201 Created", response);
        } else {
          console.error("Request failed. Response: 500 internal server error", response);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }
  </script>
  
  <div class="question">
    <legend>Options for User Data Management:</legend>
    {#each options as option}
      <div class="option">
        <input type="radio" id={option} bind:group value={option}>
        <label for={option}>{option}</label>
      </div>
    {/each}
  
    <button on:click={handleSubmit}>Submit</button>
  </div>
  
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
  