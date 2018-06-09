let database;
let searchBar = document.getElementById("search-bar");
let searchButton = document.getElementById("search-button");
let autoSuggestions = document.getElementById("auto-suggestions");
let display = document.getElementById("display");

console.log(searchBar);

searchBar.addEventListener("keypress", checkKey);
searchButton.addEventListener("click", processInput);
searchBar.addEventListener("input", getAutoSuggestions);

loadData();

function loadData() {
  searchBar.style.display = "none";
  searchButton.style.display = "none";
  fetch("database.json")
  .then(function(response) {
    response.json()
    .then(function(jsonObj) {
      database = jsonObj;
      console.log("Database Loaded Successfully");
    }).then(function() {
      searchBar.style.display = "block";
      searchButton.style.display = "block";
    })
  });
}


function getAutoSuggestions() {
  let cleanedInput = searchBar.value.toLowerCase().trim();
  autoSuggestions.innerHTML = "";
  for (let i = 0; i < database.length; i++) {
    let cleanedRecordName = database[i].name.toLowerCase().trim();
    if (cleanedRecordName.startsWith(cleanedInput) && cleanedInput.length > 0) {
      let matching = cleanedRecordName.substring(0, searchBar.value.length);
      let remaining = cleanedRecordName.substring(searchBar.value.length);
      let result = matching + "<b>" + remaining + "</b>";
      let button = document.createElement("button");

      button.innerHTML = result;
      button.style.display = "block";
      button.className = "suggestion";
      activateSuggestionButton(button, database[i]);
      autoSuggestions.appendChild(button);
    }
  }

  if (autoSuggestions.hasChildNodes()) {
    autoSuggestions.style.display = "block";
  }else {
    autoSuggestions.style.display = "none";
  }
}


function activateSuggestionButton(button, record) {
  button.addEventListener("click", function() {
    displayRecord(record);
    autoSuggestions.innerHTML = "";
    autoSuggestions.style.display = "none";
    searchBar.value = "";
  });
}

function getSuggestions(cleanedInput) {
  let suggestions = [];
  for (let i = 0; i < suggestion.length; i++){
    let cleanedRecordName = suggestion.value.toLowerCase().trim();
    if (cleanedRecordName.startsWith(cleanedInput) && cleanedInput > 0) {
      suggestions.push(database[i]);
    }
    return suggestions;
  }
}

function displaySuggestions(suggestions) {
  display.innerHTML = "";
  let paragraph = document.createElement("p");
  if (sugestion.length > 0) {
    paragraph.innerHTML = "Did you mean";
    display.appendChild(paragraph);
    for (let i = 0; i < suggestions.length; i++) {
      let button = document.createElement("button");
      button.innerHTML = suggestions[i].name;
      button.style.display = "block";
      button.className = "suggestion";
      activateSuggestionButton(button, suggestions[i]);
      display.appendChild(button);
    }
  }else {
    paragraph.innerHTML = "No Results!";
    display.appendChild(paragraph);
  }
}

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
    searchBar.value = "";

    let databaseRecord = getRecord(cleanedInput);

    if(databaseRecord != null) {
      displayRecord(databaseRecord);
    }else {
      alert(displaySuggestions(getSuggestions(cleanedInput)));
    }
  }

  function getRecord(cleanedInput) {
    console.log("get record is running");
    for(let i = 0; i < database.length; i++){
      console.log("ayyyy");
      let cleanedRecordName = database[i].name.toLowerCase().trim();
      console.log(cleanedRecordName);
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

    display.innerHTML = "";

    display.appendChild(recordName);
    display.appendChild(recordAge);
    display.appendChild(recordRelationship);
    display.appendChild(recordPicture);
    display.appendChild(recordBio);
  }
