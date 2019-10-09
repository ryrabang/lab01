var artistNames = [];
var artistQuote = [];
var artistImage = [];
var storage = window.localStorage;

function initialize() {
    if (storage.getItem('names') != null) {
        artistNames = JSON.parse(storage.getItem('names'));
        artistQuote = JSON.parse(storage.getItem('quotes'));
        artistImage = JSON.parse(storage.getItem('images'));
        updateStorage();
        displayArtist();
    }
}

function openPopup() {
    document.getElementById("popup").style.display = "inline-block";
    document.getElementById("openForm").setAttribute("onclick", "closePopup()");
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
    document.getElementById("openForm").setAttribute("onclick", "openPopup()");
}

function addArtist() {
    artistNames.push(document.getElementById("artistName").value);
    artistQuote.push(document.getElementById("artistQuote").value);
    artistImage.push(document.getElementById("artistImage").value);
    storage.setItem('names', JSON.stringify(artistNames));
    storage.setItem('quotes', JSON.stringify(artistQuote));
    storage.setItem('images', JSON.stringify(artistImage));
    closePopup();
    deleteAllArtists();
    displayArtist();
}

function deleteAllArtists() {
    var allCards = document.getElementsByClassName("card");
    while (allCards.length > 0) {
        allCards[0].parentNode.removeChild(allCards[0]);
    }
}

function displayArtist() {

    var jsonNames = JSON.parse(storage.getItem('names'));
    var jsonQuotes = JSON.parse(storage.getItem('quotes'));
    var jsonImages = JSON.parse(storage.getItem('images'));

    for (var i = 0; i < artistNames.length; ++i) {
        displaySelectArtist(jsonNames[i], jsonQuotes[i], jsonImages[i], i);
    }
    
}

function displaySelectArtist(name, quote, imagesrc, id) {
    var newDiv = createDiv("div", "card");
        newDiv.id = "artist" + id;
        var buttonDiv = createDiv("div", "button");
        var deleteButton = document.createElement("button");
        deleteButton.type = "submit";
        deleteButton.className = "delete btn";
        deleteButton.textContent = "Delete";
        deleteButton.setAttribute("onclick", "deleteCard(" + id + ")");
        
        var containerDiv = createDiv("div", "container");

        var imageDiv = createDiv("div", "image");
        var image = document.createElement("img");
        image.src = imagesrc;
        imageDiv.appendChild(image);

        var textDiv = createDiv("div", "text");
        var nameDiv = createDiv("div", "name");
        nameDiv.textContent = name;
        textDiv.appendChild(nameDiv);
        var quoteDiv = createDiv("div", "quote");
        quoteDiv.textContent = quote;

        containerDiv.appendChild(imageDiv);
        textDiv.appendChild(nameDiv);
        textDiv.appendChild(quoteDiv);
        containerDiv.appendChild(textDiv);
        newDiv.appendChild(containerDiv);
        buttonDiv.appendChild(deleteButton);
        containerDiv.appendChild(buttonDiv);
        document.body.appendChild(newDiv);
}

function deleteCard(id) {
    var card = document.getElementById("artist" + id);
    card.parentNode.removeChild(card);
    artistNames.splice(id, 1);
    artistQuote.splice(id, 1);
    artistImage.splice(id, 1);
    updateStorage();
    deleteAllArtists();
    displayArtist();
}

function createDiv(tag,name) {
    var newDiv = document.createElement(tag);
    newDiv.className = name;
    return newDiv;
}

function updateStorage() {
    storage.setItem('names', JSON.stringify(artistNames));
    storage.setItem('quotes', JSON.stringify(artistQuote));
    storage.setItem('images', JSON.stringify(artistImage));
}

function search() {
    var text = document.getElementById("searchbar").value.toLowerCase();
    deleteAllArtists();
    var textLength = text.length;
    for(var i = 0; i < artistNames.length; ++i) {
        console.log(artistNames[i].toLowerCase().substring(0, textLength));
        if (artistNames[i].toLowerCase().substring(0, textLength) === text) {
            displaySelectArtist(artistNames[i], artistQuote[i], artistImage[i], i);
        }
    }
}