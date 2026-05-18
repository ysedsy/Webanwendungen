async function addResultBoxes(keyword) {
  // Container Element im DOM, in dem die Ergebnisse eingefügt werden
  const browseFrame = document.querySelector(".browse_frame");
  const birdCountElement = document.getElementById("bird-count");

  // Auswahl der richtigen API
  const api = keyword == "" ? "/api/birds" : `/api/birds/search/${keyword}`;

  const result = await fetch(api, { method: "GET" });

  // Fehlerprüfung - Hat der FETCH GET funktioniert?
  if (result.status != 200) {
    console.error(
      `Der gewünschte Vogel ${keyword} konnte nicht gefunden werden!`,
    );
    browseFrame.replaceChildren(buildMessageBox(
      `Unter dem Suchwort "${keyword}" konnten leider keine Vögel gefunden werden`,
    ));
    birdCountElement.textContent = "0 Vögel insgesamt gefunden";
    return;
  }

  // Fetch Ergebnisse parsen und als Liste speichern
  const resultBody = await result.text();
  const birdList = JSON.parse(resultBody);
  const listLength = birdList.length;

  // In dieser Liste werden die Container als DOM-Nodes aufgebaut:
  const resultNodes = [];

  // Iteriert durch alle JSON Container in der Liste
  for (let i = 0; i < birdList.length; i++) {
    // console.log(birdList[i]);
    resultNodes.push(makeResultBox(birdList[i]));
  }
  // Ergebnis in die Container einfügen
  browseFrame.replaceChildren(...resultNodes);
  birdCountElement.textContent = `Unter dem Suchwort "${keyword}" wurde/n ${listLength} Vögel gefunden`;
}

function makeResultBox(data) {
  // JSON entpacken
  const birdID = data.BirdID;
  const birdCommonName = data.CommonName;
  const birdScientificName = data.ScientificName;
  const birdHeight = data.Height;
  const birdWeight = data.Weight;
  const birdImage = data.ImagePath;

  const birdPreview = document.createElement("div");
  birdPreview.className = "bird_preview";
  birdPreview.id = String(birdID);

  const image = document.createElement("img");
  image.src = birdImage;
  image.alt = birdCommonName ? `Bild von ${birdCommonName}` : "Bild eines Vogels";

  const title = document.createElement("h1");
  const link = document.createElement("a");
  link.href = `detailDynamic.html?id=${encodeURIComponent(String(birdID))}`;
  link.textContent = birdCommonName;
  title.appendChild(link);

  const table = document.createElement("table");
  table.append(
    buildInfoRow("Größe", `${birdHeight} cm`),
    buildInfoRow("Gewicht", `${birdWeight} g`),
  );

  birdPreview.append(image, title, table);
  return birdPreview;
}

function buildInfoRow(label, value) {
  const row = document.createElement("tr");

  const labelCell = document.createElement("td");
  labelCell.textContent = label;

  const valueCell = document.createElement("td");
  valueCell.textContent = value;

  row.append(labelCell, valueCell);
  return row;
}

function buildMessageBox(message) {
  const container = document.createElement("div");
  const strong = document.createElement("b");
  strong.textContent = message;
  container.appendChild(strong);
  return container;
}

const params = new URLSearchParams(window.location.search);
const keyword = params.get("keyword");
addResultBoxes(keyword);
