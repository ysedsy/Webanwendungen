

async function createThread(){
    const nameInput = document.getElementById("name")
    const nameVal = nameInput.value;

    const titleInput = document.getElementById("header");
    const titleVal = titleInput.value;

    const postInput = document.getElementById("post")
    const postVal = postInput.value

    // Verhindern, dass leere Felder abgeschickt werden
    if (nameVal == ""){
        alert("Es wurde kein Name vergeben");
        return
    }
    if (titleVal == ""){
        alert("Es wurde kein Titel vergeben");
        return
    }
    if (postVal == ""){
        alert("Es wurde kein Beitrag verfasst");
        return
    }

    const api = "/api/threads"

    const jsonData = {
                "threadTitle" :titleVal, 
                "userName": nameVal, 
                "postText" : postVal}

    const result = await fetch(api, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
        });

        if (! result.ok) {
        let ErrorMessage = "Beim Erstellen des Threads ist etwas schief gelaufen!"
        console.error(ErrorMessage)
        return
    }
    
    const resultBody = await result.text();         
    const resultJSON = JSON.parse(resultBody);
    const newThreadID = resultJSON.threadID


    alert(`Der Post ${titleVal} wurde erstellt!`)
    const newURL = `thread_dynamic.html?id=${newThreadID}`
    window.location.replace(newURL);
}

const submitButton = document.querySelector(".submit-button")
submitButton.addEventListener("click", createThread)