async function fillThreadContainer(id) {
  // Im Thread Card Container werdenThreadüberschriften und Posts gesammelt:
  const threadCard = document.querySelector(".thread-card");

  // fetch Befehl zusammensetzen:
  const api = `/api/threads/${id}`;
  const result = await fetch(api, { method: "GET" });

  if (result.status != 200) {
    let ErrorMessage = `Es konnte kein Thread mit der ID ${id} gefunden werden!`;
    console.error(ErrorMessage);
    threadCard.textContent = ErrorMessage;
    return;
  }

  // Result parsen
  const resultBody = await result.text();
  const threadJSON = JSON.parse(resultBody);
  const postList = Array.isArray(threadJSON.posts) ? threadJSON.posts : [];

  // Werte den Header aus JSON parsen
  const ThreadTitle = threadJSON.ThreadTitle;
  const firstDate = postList.length > 0 ? formatToDateOnly(postList[0].DateCreated) : "-";
  const lastDate = postList.length > 0 ? formatToDateOnly(postList[postList.length - 1].DateCreated) : "-";

  const threadNodes = [];

  const header = document.createElement("header");
  header.className = "thread-card-header";

  const title = document.createElement("h2");
  title.className = "thread-title";
  title.textContent = ThreadTitle;

  const meta = document.createElement("span");
  meta.className = "thread-meta";
  meta.textContent = `${firstDate} bis ${lastDate}`;

  header.append(title, meta);
  threadNodes.push(header);

  for (let i = 0; i < postList.length; i++) {
    threadNodes.push(createPostContainer(postList[i]));
  }

  threadCard.replaceChildren(...threadNodes);
  return;
}

function createPostContainer(data) {
  const children = Array.isArray(data.Children) ? data.Children : [];
  const replyLink = id
    ? `forum_create_post.html?id=${id}&parentID=${data.PostID}`
    : `forum_create_post.html?parentID=${data.PostID}`;

  const replyTree = document.createElement("div");
  replyTree.className = "reply-tree";
  replyTree.setAttribute("aria-label", "Antwortbaum");

  const article = document.createElement("article");
  article.className = "reply-item";

  const postHeader = document.createElement("header");
  postHeader.className = "post-header";

  const userName = document.createElement("span");
  userName.textContent = data.UserName;

  const dateCreated = document.createElement("span");
  dateCreated.textContent = formatToDateTime(data.DateCreated);

  const postBody = document.createElement("div");
  postBody.className = "post-body";
  postBody.textContent = data.PostText;

  const replyButton = document.createElement("a");
  replyButton.className = "reply-button";
  replyButton.href = replyLink;
  replyButton.textContent = "Antworten";

  postHeader.append(userName, dateCreated);
  article.append(postHeader, postBody, replyButton);
  replyTree.appendChild(article);

  // wenn Kinder, dann untergeordneten Postcontainer erstellen 
  if (children.length > 0) {
    const replyChildren = document.createElement("div");
    replyChildren.className = "reply-children";
    for (let i = 0; i < children.length; i++) {
      replyChildren.appendChild(createPostContainer(children[i]));
    }
    replyTree.appendChild(replyChildren);
  }

  return replyTree;
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



const params = new URLSearchParams(window.location.search);
const id = params.get("id");
fillThreadContainer(id);
