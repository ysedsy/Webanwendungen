
// Diese Funktion sorgt dafür, dass das Suchwort, das in der Search Bar eingegeben wird
// als URL Parameter für die browseDynamic Seite genutzt wird
function search(){
    const searchBar = document.getElementById("search-bar");
    const keyword = searchBar.value;
    const newURL = `/browseDynamic.html?keyword=${keyword}`
    window.location.replace(newURL);
}

function clearSearchBar(){
    const searchBar = document.getElementById("search-bar");
    searchBar.value = ""
    return
}


// Wird als INIT Funktion für den EventListener genutzt
function headerInit(){
    // Bindet die SuchFunktion an den Such-Knopf
    const SubmitButton = document.getElementById("search-button");
    SubmitButton.addEventListener("click", search);

    // Bindet die Clear Funktion an den Clear Button
    const ClearButton = document.getElementById("search-clear");
    ClearButton.addEventListener("click", clearSearchBar);

    // Beim Betätigen der Enter Taste im Suchfeld soll auch eine Suche gestartet werden
    const searchBar = document.getElementById("search-bar");
    searchBar.addEventListener("keydown", (event) => {
        if (event.key == "Enter") {
            search()
        }
    })
    
    return
}

headerInit();
console.log("Working")