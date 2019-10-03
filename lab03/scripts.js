var artistNames = [];
var artistQuote = [];
var artistImage = [];

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

    for (var i = 0; i < artistNames.length; ++i) {

        var newDiv = createDiv("div", "card");
        newDiv.id = "artist" + i;
        var buttonDiv = createDiv("div", "button");
        var deleteButton = document.createElement("button");
        deleteButton.type = "submit";
        deleteButton.className = "delete btn";
        deleteButton.textContent = "Delete";
        deleteButton.setAttribute("onclick", "deleteCard(" + i + ")");
        
        var containerDiv = createDiv("div", "container");

        var imageDiv = createDiv("div", "image");
        var image = document.createElement("img");
        image.src = artistImage[i];
        imageDiv.appendChild(image);

        var textDiv = createDiv("div", "text");
        var nameDiv = createDiv("div", "name");
        nameDiv.textContent = artistNames[i];
        textDiv.appendChild(nameDiv);
        var quoteDiv = createDiv("div", "quote");
        quoteDiv.textContent = artistQuote[i];

        containerDiv.appendChild(imageDiv);
        textDiv.appendChild(nameDiv);
        textDiv.appendChild(quoteDiv);
        containerDiv.appendChild(textDiv);
        newDiv.appendChild(containerDiv);
        buttonDiv.appendChild(deleteButton);
        containerDiv.appendChild(buttonDiv);
        document.body.appendChild(newDiv);
    }
    
}

function deleteCard(id) {
    var card = document.getElementById("artist" + id);
    card.parentNode.removeChild(card);
    artistNames.splice(id, 1);
    artistQuote.splice(id, 1);
    artistImage.splice(id, 1);
}

function createDiv(tag,name) {
    var newDiv = document.createElement(tag);
    newDiv.className = name;
    return newDiv;
}