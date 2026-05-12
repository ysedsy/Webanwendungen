
async function addDetailContent(id){
    const detailMainFrame = document.querySelector(".bird-detail-page");

    const api = `/api/birds/${id}`

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

    const htmlSnippet = `
        <h1 class="bird-detail-title">${birdDetails.CommonName}</h1>

        <div>
        <img class="bird-detail-image" src="${birdDetails.ImagePath}" alt="Bild von ${birdDetails.CommonName}"/>

        <table>
            <tr>
                <td><strong>Name</strong></td>
                <td>${birdDetails.CommonName} (${birdDetails.ScientificName})</td>
            </tr>
            <tr>
                <td><strong>Größe</strong></td>
                <td>${birdDetails.Height} cm</td>
            </tr>
            <tr>
                <td><strong>Gewicht</strong></td>
                <td>${birdDetails.Weight} g</td>
            </tr>
            <tr>
                <td><strong>Durchschnittliches Alter</strong></td>
                <td>${birdDetails.AverageAge} Jahre</td>
            </tr>
            <tr>
                <td><strong>Habitat</strong></td>
                <td>${birdDetails.HabitatName}</td>
            </tr>
        </table>
        </div>
        <div class="bird-detail-text">${birdDetails.Description}</div>
    `
    detailMainFrame.innerHTML = htmlSnippet;
    return
}
const params = new URLSearchParams(window.location.search);
const ID = params.get('id'); // "Test" oder null
addDetailContent(ID);