

async function addResultBoxes(){
    // Container Element im DOM, in dem die Ergebnisse eingefügt werden
    const browseFrame = document.querySelector(".browse_frame");

    const result = await fetch("/api/birds", {"method": "GET"});

    // Fehlerprüfung - Hat der FETCH GET funktioniert?
    if (result.status != 200) {
        let ErrorMessage = "<b>FEHLER<br>Es konnten leider keine Vögel gefunden werden</b>"
        browseFrame.innerHTML = ErrorMessage;
    }
    
    // Fetch Ergebnisse parsen und als Liste speichern
    const resultBody = await result.text();         
    const birdList = JSON.parse(resultBody);

    // In diesem HTML-String werden die Container aufgebaut:
    let resultsHTML = ""

    // Iteriert durch alle JSON Container in der Liste
    for (i = 0; i < birdList.length; i++){
        console.log(birdList[i]);
        resultsHTML += makeResultBox(birdList[i])
        console.log(resultsHTML);

    }
    // Ergebnis in den Container einfügen
    browseFrame.innerHTML = resultsHTML;

}


function makeResultBox(data){
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
            <h1><a href="/detail.html${birdID}$">${birdCommonName}</a></h1>
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
    ` 
    return htmlSnippte;
}

addResultBoxes()