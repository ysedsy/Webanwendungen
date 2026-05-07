

async function createThread(){
    const nameInput = document.getElementById("name")
    const nameVal = nameInput.value

    const 

    const api = "/api/threads"

    const erg = fetch(api, 
        {
            "method": "POST",
            "body": {
                
            }
        }
    )

}

const submitButton = document.querySelector(".submit-button")
submitButton.addEventListener("click", createThread)