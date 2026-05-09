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
    let ErrorMessage = `<div><b>Unter dem Suchwort "${keyword}" konnten leider keine Vögel gefunden werden</b></div>`;
    browseFrame.innerHTML = ErrorMessage;
    birdCountElement.textContent = "0 Vögel insgesamt gefunden";
    return;
  }

  // Fetch Ergebnisse parsen und als Liste speichern
  const resultBody = await result.text();
  const birdList = JSON.parse(resultBody);
  const listLength = birdList.length;

  // In diesem HTML-String werden die Container aufgebaut:
  let resultsHTML = "";

  // Iteriert durch alle JSON Container in der Liste
  for (i = 0; i < birdList.length; i++) {
    // console.log(birdList[i]);
    resultsHTML += makeResultBox(birdList[i]);
    // console.log(resultsHTML);
  }
  // Ergebnis in die Container einfügen
  browseFrame.innerHTML = resultsHTML;
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

  // HTML Container mit Daten zusammenfügen
  let htmlSnippte = `
        <div class="bird_preview" id="${birdID}">
            <img src="${birdImage}">
            <h1><a href="detailDynamic.html?id=${birdID}">${birdCommonName}</a></h1>
            <table>
                <tr>
                    <td>Größe</td>
                    <td>${birdHeight} cm</td>
                </tr>
                <tr>
                    <td>Gewicht</td>
                    <td>${birdWeight} kg</td>
                </tr>
            </table>
        </div>
    `;
  return htmlSnippte;
}

const params = new URLSearchParams(window.location.search);
const keyword = params.get("keyword");
addResultBoxes(keyword);
