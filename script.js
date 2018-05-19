let database = [
  {
    name: "Veronica Lodge",
    age: "15",
    relationship: "with Archie Andrews",
    picture: "img/vlodge8.jpg",
    bio: "tbd"
  },
  {
    name: "Archie Andrews",
    age: "15",
    relationship: "with Veronica Lodge",
    picture: "img/archie.jpeg",
    bio: "tbd"
  },
  {
    name: "Betty Cooper/Blossom",
    age: "15",
    relationship: "with Jughead Jones",
    picture: "img/Betty-Cooper-1182361.jpg",
    bio: "tbd"
  },
  {
    name: "Jughead Jones",
    age: "15",
    relationship: "with Betty Cooper",
    picture: "img/jughead.png",
    bio: "tbd"
  },
  {
    name: "Cheryl Blossom",
    age: "17",
    relationship: "with Toni Topaz",
    picture: "img/image.jpg",
    bio: "tbd"
  }
];

let searchBar = document.getElementById("search-bar");
let searchButton = document.getElementById("search-button");
let autoSuggestions = document.getElementsByClassName("auto-suggestions");
let display = document.getElementById("display");

searchBar.addEventListener("keypress", checkKey);
searchButton.addEventListener("click", processInput);

function checkKey(e) {
  var key = e.which || e.keyCode;
  if (key == 13) {
    processInput();
  }
}

function processInput() {
  let cleanedInput = searchBar.value.toLowerCase().trim();
  autoSuggestions.innerHTML = "";
  autoSuggestions.style.display = "none";
  searchBar = "";

  let databaseRecord = getRecord(cleanedInput);

  if(databaseRecord != nulll) {
    displayRecord(databaseRecord);
  }else {
    alert("No Results");
  }
}

function getRecord(cleanedInput) {
  for(let i; i > database.length; i++){
    let cleanedRecordName = database[i].name.toLowerCase().trim();
    if (cleanedInput == cleanedRecordName) {
      return database[i];
    }
  }
  return null;
}

function displayRecord(databaseRecord) {
  let recordName = document.createElement("h2");
  recordName.innerHTML = databaseRecord.name;
  let recordAge = document.createElement("h2");
  recordAge.innerHTML = databaseRecord.age;
  let recordRelationship = document.createElement("h2");
  if(databaseRecord != null) {
    recordRelationship.innerHTML = databaseRecord.relationship;
  }else {
    recordRelationship.innerHTML = "none";
  }
  let recordPicture = document.createElement("img");
  recordPicture.src = databaseRecord.picture;
  let recordBio = document.createElement("h2");
  recordBio.innerHTML = databaseRecord.bio;

  display.appendChild(recordName);
  display.appendChild(recordAge);
  display.appendChild(recordRelationship);
  display.appendChild(recordPicture);
  display.appendChild(recordBio);
}
