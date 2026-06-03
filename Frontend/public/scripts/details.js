
async function addDetailContent(id){
    const detailMainFrame = document.querySelector(".bird-detail-page");

    const api = `http://localhost:3000/api/birds/${id}`

    const result = await fetch(api, {"method": "GET"});

    // Fehlerprüfung - Hat der FETCH GET funktioniert?
    if (result.status != 200) {
        console.error(`Der gewünschte Vogel unter der ID ${id} konnte nicht gefunden werden!`)
        let ErrorMessage = `<div><b>Unter der ID "${id}" konnten leider keine Vögel gefunden werden</b></div>`
        detailMainFrame.innerHTML = ErrorMessage;
        return
    }

    const resultBody = await result.text();         
    const birdDetails = JSON.parse(resultBody);

    // Überschrift
    const header = document.createElement("h1");
    header.className = "bird-detail-title"
    header.textContent = birdDetails.CommonName;
    detailMainFrame.appendChild(header);

    // Container DIV für table und Image
    const ContainerDiv = document.createElement("div")
    detailMainFrame.appendChild(ContainerDiv)

    // Bild
    const image = document.createElement("img");
    image.src = birdDetails.ImagePath;
    image.className = "bird-detail-image"
    image.alt = `Bild von ${birdDetails.CommonName}`;
    ContainerDiv.appendChild(image);


    // Tabelle mit den Stammdaten
    const table = document.createElement("table")
    table.append(
        buildInfoRow("Name", `${birdDetails.CommonName} (${birdDetails.ScientificName})`),
        buildInfoRow("Größe", `${birdDetails.Height} cm`),
        buildInfoRow("Gewicht", `${birdDetails.Weight} g`),
        buildInfoRow("Durchschnittliches Alter", `${birdDetails.AverageAge} Jahre`),
        buildInfoRow("Habitat", `${birdDetails.HabitatName}`),
    );
    ContainerDiv.append(table);

    // div mit den Details
    const infos = document.createElement("div");
    infos.className = "bird-detail-text";
    infos.textContent = birdDetails.Description;
    detailMainFrame.appendChild(infos)
    return
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


const params = new URLSearchParams(window.location.search);
const ID = params.get('id'); // "Test" oder null
addDetailContent(ID);