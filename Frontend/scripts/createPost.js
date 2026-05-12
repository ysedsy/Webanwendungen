async function createPost(event) {
    event.preventDefault();

    const nameInput = document.getElementById("name");
    const postInput = document.getElementById("post");
    const params = new URLSearchParams(window.location.search);
    const threadID = params.get("id");
    const parentID = params.get("parentID");

    const nameVal = nameInput ? nameInput.value.trim() : "";
    const postVal = postInput ? postInput.value.trim() : "";
    
    if (!threadID) {
        alert("Es wurde kein Thread ausgewählt.");
        return;
    }

    if (nameVal === "") {
        alert("Es wurde kein Name vergeben");
        return;
    }

    if (postVal === "") {
        alert("Es wurde kein Beitrag verfasst");
        return;
    }

    const result = await fetch(`/api/threads/${threadID}/posts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            userName: nameVal,
            postText: postVal,
            parentID: parentID || null,
        }),
    });

    if (!result.ok) {
        console.error("Beim Erstellen des Beitrags ist etwas schief gelaufen!");
        alert("Beim Erstellen des Beitrags ist etwas schief gelaufen!");
        return;
    }

    const resultJSON = await result.json();
    // alert(`Der Beitrag wurde erstellt!`);

    if (resultJSON.postID) {
        window.location.replace(`thread_dynamic.html?id=${threadID}`);
    }
}

async function fillCreatePostPage() {
    const threadCard = document.querySelector(".thread-card");
    const threadTitleElement = document.querySelector(".thread-title");
    const threadMetaElement = document.querySelector(".thread-card-header .thread-meta");

    if (!threadCard || !threadTitleElement || !threadMetaElement) {
        return;
    }

    const params = new URLSearchParams(window.location.search);
    const threadID = params.get("id");

    if (!threadID) {
        threadCard.innerHTML = "Kein Thread ausgewählt.";
        return;
    }

    const result = await fetch(`/api/threads/${threadID}`, { method: "GET" });

    if (!result.ok) {
        threadCard.innerHTML = `Es konnte kein Thread mit der ID ${threadID} gefunden werden!`;
        return;
    }

    const threadJSON = await result.json();
    const threadTitle = threadJSON.ThreadTitle || "Ohne Titel";

    threadTitleElement.textContent = threadTitle;
    threadMetaElement.textContent = "Antwort auf bestehenden Thread";
}

const postForm = document.getElementById("post-form");
if (postForm) {
    postForm.addEventListener("submit", createPost);
}

fillCreatePostPage();
