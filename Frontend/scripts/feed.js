
async function fillFeed(){
    const FeedContainer = document.getElementById("thread-list");

    const api = "/api/threads"

    const result = await fetch(api, {"method": "GET"});

    if (result.status != 200) {
        let ErrorMessage = "Es konnten keine Threads gefunden werden!"
        console.error(ErrorMessage)
        FeedContainer.textContent = ErrorMessage;
        return
    }

    // Fetch Ergebnisse parsen und als Liste speichern
    const resultBody = await result.text();         
    const threadList = JSON.parse(resultBody);
    const listLength = threadList.length;

    const threadNodes = [];

    for (let i = 0; i < listLength; i++){
        threadNodes.push(buildThreadContainer(threadList[i]));
    }

    FeedContainer.replaceChildren(...threadNodes);
}


function buildThreadContainer(data){
    const ThreadID = data.ThreadID;
    const ThreadTitle = data.ThreadTitle;
    const LastPostDate = formatToDateOnly(data.LastPostDate) || "Noch keine Beiträge";

    const article = document.createElement("article");
    article.className = "thread-card";

    const header = document.createElement("header");
    header.className = "thread-card-header";

    const meta = document.createElement("span");
    meta.className = "thread-meta";
    meta.textContent = `Zuletzt: ${LastPostDate}`;

    const title = document.createElement("h2");
    title.className = "thread-title";

    const link = document.createElement("a");
    link.href = `/thread_dynamic.html?id=${encodeURIComponent(String(ThreadID))}`;
    link.textContent = ThreadTitle;

    title.appendChild(link);
    header.appendChild(meta);
    article.append(header, title);

    return article;
}

fillFeed();
