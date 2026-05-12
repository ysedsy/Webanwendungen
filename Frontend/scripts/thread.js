async function fillThreadContainer(id) {
  // Im Thread Card Container werdenThreadüberschriften und Posts gesammelt:
  const threadCard = document.querySelector(".thread-card");

  // fetch Befehl zusammensetzen:
  const api = `/api/threads/${id}`;
  const result = await fetch(api, { method: "GET" });

  if (result.status != 200) {
    let ErrorMessage = `Es konnte kein Thread mit der ID ${id} gefunden werden!`;
    console.error(ErrorMessage);
    threadCard.innerHTML = ErrorMessage;
    return;
  }

  // Result parsen
  const resultBody = await result.text();
  const threadJSON = JSON.parse(resultBody);
  const postList = Array.isArray(threadJSON.posts) ? threadJSON.posts : [];
  const flatPosts = collectPosts(postList);

  // Werte den Header aus JSON parsen
  const ThreadTitle = threadJSON.ThreadTitle;
  const firstDate = parseDate(postList[0].DateCreated);
  const lastDate = parseDate(postList[postList.length - 1].DateCreated);

  // HTML für header zusammenfügen:
  let threadCardHTML = `
        <header class="thread-card-header">
        <h2 class="thread-title">${ThreadTitle}</h2>
            <span class="thread-meta"
                >${firstDate} bis ${lastDate}</span
            >
        </header>
        `;

  for (let i = 0; i < postList.length; i++) {
    threadCardHTML += createPostContainer(postList[i]);
  }

  threadCard.innerHTML = threadCardHTML;
  return;
}

function createPostContainer(data) {
  const children = Array.isArray(data.Children) ? data.Children : [];
  const replyLink = id
    ? `forum_create_post.html?id=${id}&parentID=${data.PostID}`
    : `forum_create_post.html?parentID=${data.PostID}`;

  let htmlSnippet = `
        <div class="reply-tree" aria-label="Antwortbaum">
            <article class="reply-item">
            <header class="post-header">
                <span>${data.UserName}</span>
                <span>${parseDate(data.DateCreated)}</span>
            </header>
            <div class="post-body">${data.PostText}</div>
            <a
                class="reply-button"
        href="${replyLink}"
                >Antworten</a
            >
            </article>
    `;

  // wenn Kinder, dann untergeordneten Postcontainer erstellen 
  if (children.length > 0) {
    htmlSnippet += `<div class="reply-children">`;
    for (let i = 0; i < children.length; i++) {
      htmlSnippet += createPostContainer(children[i]);
    }
    htmlSnippet += `</div>`;
  }

  htmlSnippet += `</div>`;

  return htmlSnippet;
}

// rekursive anordnung --> flache Licte
function collectPosts(posts) {
  const flat = [];

  function walk(list) {
    for (let i = 0; i < list.length; i++) {
      const post = list[i];
      flat.push(post);

      if (post.Children.length > 0) {
        walk(post.Children);
      }
    }
  }

  walk(posts);

  return flat;
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

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
fillThreadContainer(id);
