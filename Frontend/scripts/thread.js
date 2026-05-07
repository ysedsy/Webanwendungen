

async function fillThreadContainer(id){
    // Im Thread Card Container werdenThreadüberschriften und Posts gesammelt:
    const threadCard = document.querySelector(".thread-card");

    // fetch Befehl zusammensetzen:
    const api = `/api/threads/${id}`
    const result = await fetch(api, {"method": "GET"});

    if (result.status != 200) {
        let ErrorMessage = `Es konnte kein Thread mit der ID ${id} gefunden werden!`
        console.error(ErrorMessage)
        threadCard.innerHTML = ErrorMessage;
        return
    } 

    // Result parsen
    const resultBody = await result.text();         
    const threadJSON = JSON.parse(resultBody);
    const postList = threadJSON.posts;
    const postCount = postList.length;

    // Werte den Header aus JSON parsen
    const ThreadTitle = threadJSON.ThreadTitle;
    const firstDate = parseDate(postList[0].DateCreated); 
    const lastDate = parseDate(postList[postCount -1].DateCreated);

    // HTML für header zusammenfügen:
    let threadCardHTML = `
        <header class="thread-card-header">
            <span class="thread-topic">$FEHLT</span>
            <span class="thread-meta"
                >${firstDate} bis ${lastDate}</span
            >
        </header>
        <h2 class="thread-title">${ThreadTitle}</h2>
        `

    for (let i = 0; i < postCount; i++){
        threadCardHTML += createPostContainer(postList[i]);
    }

    threadCard.innerHTML = threadCardHTML;
    return
}


function createPostContainer(data){
    
    let htmlSnippet = `
        <div class="reply-tree" aria-label="Antwortbaum">
        <article class="reply-item">
            <header class="post-header">
                <span>${data.UserName}</span>
                <span>25.04.${parseDate(data.DateCreated)}</span>
            </header>
            <div class="post-body">${data.PostText}</div>
            <a
                class="reply-button"
                href="forum_create_post.html"
                >Antworten</a
            >
    `;
    return htmlSnippet;
}

function parseDate(date){
    let Date = date.split(" ")[0];
    let yearMonthDay = Date.split("-");
    let year = yearMonthDay[0]
    let month = yearMonthDay[1]
    let day = yearMonthDay[2]
    let germanDate = `${day}.${month}.${year}`
    return germanDate;
}


const params = new URLSearchParams(window.location.search);
const id = params.get('id'); 
fillThreadContainer(id)