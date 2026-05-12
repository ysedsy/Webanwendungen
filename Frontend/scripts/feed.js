
async function fillFeed(){
    const FeedContainer = document.getElementById("thread-list");

    const api = "/api/threads"

    const result = await fetch(api, {"method": "GET"});

    if (result.status != 200) {
        let ErrorMessage = "Es konnten keine Threads gefunden werden!"
        console.error(ErrorMessage)
        FeedContainer.innerHTML = ErrorMessage;
        return
    }

    // Fetch Ergebnisse parsen und als Liste speichern
    const resultBody = await result.text();         
    const threadList = JSON.parse(resultBody);
    const listLength = threadList.length;

    // 
    let htmlThreadList = "";

    for (let i = 0; i < listLength; i++){
        htmlThreadList += buildThreadContainer(threadList[i]);
    }

    FeedContainer.innerHTML = htmlThreadList;
}


function buildThreadContainer(data){
    const ThreadID = data.ThreadID;
    const ThreadTitle = data.ThreadTitle;
    const LastPostDate = parseDate(data.LastPostDate);

    

    let htmlSnippet = `
    <article class="thread-card">
        <header class="thread-card-header">
        <span class="thread-meta">Zuletzt: ${LastPostDate}</span>
        </header>
        <h2 class="thread-title">
            <a
                href="/thread_dynamic.html?id=${ThreadID}"
                >${ThreadTitle}</a
            >
        </h2>
    </article>
    `
    return htmlSnippet;
}

function parseDate(date) {
  let Date = date.split(" ")[0];
  let yearMonthDay = Date.split("-");
  let year = yearMonthDay[0];
  let month = yearMonthDay[1];
  let day = yearMonthDay[2];
  let germanDate = `${day}.${month}.${year}`;
  return germanDate;
}
fillFeed();
