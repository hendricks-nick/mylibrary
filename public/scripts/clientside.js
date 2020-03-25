// gets book data from Google Books via API
function getBookApi() {
    var qType = apiType;
    var qString = document.getElementById("queryString").value;
    console.log("Sending API get request..");  
    console.log("Query Type: " + qType);
    console.log("Query String: " + qString);

    /*$.get("/api", {queryType: qType, queryString: qString}, function(data){
        console.log("API query complete.");
        console.log(data);
        loadApiResults(data);
    });*/
    // API query
    var urlRequest = "https://www.googleapis.com/books/v1/volumes?q=" + qType + ":" + qString + "&key=AIzaSyBxBJ0t5Mb5ktVZY9Px5jYrZLJfrv9RXq8";
    console.log(urlRequest);
    
    // Query to API
    var xhttp = new XMLHttpRequest();   
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {  
        var obj = JSON.parse(this.responseText);
        console.log(obj);

        loadApiResults(obj);
        }
    };
    xhttp.open("GET", urlRequest, true);
    xhttp.send();
}


// gets single book data from Database
function getBookDB() {

}

// setters
// adds book to database
function addBook(storageID) {
    let book = JSON.parse(localStorage.getItem(storageID));

    let name = cleanString(book.name);
    let author = cleanString(book.author);
    let description = cleanString(book.description);
    let cover = book.cover;



    console.log("Adding book to DB: " + name + ", By " + author);
    $.post("/addBook", {name: name, author: author, description: description, cover: cover}, function(data){
        console.log(data);
    });
}

// adds book to readlist via ID
function setReadlist() {

}

// adds book and contact to loaned databast table
function setLoaned() {

}

// loads the home screen
function loadDefaults() {
    console.log("Loading Homepage..")

    $.get("/getRecent", function(data){
        console.log(data);
        document.getElementById("bodyContainer").innerHTML += 
                                        '<div class="recentHeader">Recent Added Books</div>' +
                                        '<div id="recentContainer" class="recentContainer"></div>';
                                                              

        // set number of books to display
        if (data.list.length === 1){
            document.getElementById("recentContainer").style.gridTemplateColumns = "1fr";
        }
        else if (data.list.length === 2){
            document.getElementById("recentContainer").style.gridTemplateColumns = "1fr 1fr";
        }
        else if (data.list.length === 3){
            document.getElementById("recentContainer").style.gridTemplateColumns = "1fr 1fr 1fr";
        }

        for (var i = 0; i < data.list.length; i++){
            document.getElementById("recentContainer").innerHTML += 
                                        '<div class="recBook">' +
                                        '   <div><img src="' + data.list[i].cover_url + '" alt="book cover"></div>' +
                                        '   <div>' + data.list[i].title + '</div>' +
                                        '   <div>' + data.list[i].name + '</div>' +
                                        '</div>';
        }
        // all links box and divider
        document.getElementById('bodyContainer').innerHTML +=
                                    '<div class="allLinkContainer">' +
                                    '   <div class="linkBox">' +
                                    '       <button onclick="loadAll()">View All</button>' +
                                    '   </div>' +
                                    '</div>' +
                                    '<hr class="solid">';
        // currently leading books
        document.getElementById('bodyContainer').innerHTML +=
                                    '<div class="recentHeader">Currently Reading</div>' +
                                    '<div class="readingContainer">' +
                                    '   <div class="readingBook">' +
                                    '       <div class="readingImage"><img src="/img/blank_cover.png"></div>' +
                                    '       <div class="readingInfo">' +
                                    '           <div class="readingInfoTitle">No Books Currently Being Read</div>' +
                                    '           <div class="readingInfoAuth">Mark one as "Reading" to show here.</div>' +
                                    '       </div>'+
                                    '   </div>' +
                                    '</div>';
    });
}

// loads the add book screen
function loadAdd() {
    document.getElementById("bodyContainer").innerHTML = '<div class="addBodyContainer">' +
                                                         '  <div class="addPageContainer">' +
                                                         '      <div class="addPageTitle">Add A New Book</div>' +
                                                         '      <div class="addFormContainer">' +
                                                         '          <div class="addFormInput">' +
                                                         '              <form class="addSearchForm">' + 
                                                         '                  <input type="text" placeholder="Enter text here..." id="queryString">' +
                                                         '              </form>' +
                                                         '          </div>'
                                                         '          <div class="addFormButtons">' +
                                                         '              <div class="addSearchForm">' +
                                                         '                  <button class="addButtons" id="isbnBtn" value="isbn" onclick="setApiType(this)">ISBN</button>' +
                                                         '                  <button class="addButtons" id="inauthorBtn" value="inauthor" onclick="setApiType(this)">Author</button>' +
                                                         '                  <button class="addButtons" id="intitleBtn" value="intitle" onclick="setApiType(this)">Title</button>' +
                                                         '              </div>'
                                                         '          </div>' +
                                                         '          <div class="addBookSearch">' +
                                                         '              <button class="addSearchButton" id="searchBtn" onclick="getBookApi()">Search Books</button>' +
                                                         '          </div>' +
                                                         '          <div class="addManualLink">Or, you can manually add a book <a href="#" onclick="return false;">here.</a></div>' +
                                                         '      </div>' +
                                                         '  </div>' +
                                                         '</div>';
   
}

// loads ALL books
function loadAll(){

}

// loads the single book view screen
function loadBook() {

}

// loads the readlist
function loadReadlist() {

}

// loads search results
function loadSearch() {

}

// loads list of loaned books
function loadLoaned(){

}

// loads API results
function loadApiResults(results) {
    console.log("API RESULTS");
    console.log(results);
    
    document.getElementById("bodyContainer").innerHTML = "";
    for (i = 0; i < results.totalItems; i++) {
        let bookName = results.items[i].volumeInfo.title;
        let bookAuthor = results.items[i].volumeInfo.authors[0];
        let bookDescription = results.items[i].volumeInfo.description;
        let bookCover = results.items[i].volumeInfo.imageLinks.thumbnail;

        let book = JSON.stringify({name: bookName, author: bookAuthor, description: bookDescription, cover: bookCover});
        localStorage.setItem(i, book);
       
        document.getElementById("bodyContainer").innerHTML += 
            '<div class="bookCover"><img src="' + bookCover + '" alt="Book Cover"></div>' +
            '<div><h2>' +  bookName + '</h2>' +
            '<h3>' + bookAuthor + '</h3><br>' +
            '<h4>' + bookDescription + '</h4></div>' + 
            '<input type="button" value="Add Book" onclick="addBook(' + i +')">';
    }
}

function cleanString (oldString) {
    var newString = "";

    for (var i = 0; i < oldString.length; i++) {
        if (oldString.charAt(i) === "'") {
            newString += "'";
        }
        newString += oldString.charAt(i);
    }
    
    return newString;
}

var searchType = 'title';
function setSearchType(obj) {
    // un mark current search type, change search type, mark current search type
    document.getElementById(searchType + "Btn").style.backgroundColor = "#DF691A";
    searchType = obj.value;
    document.getElementById(searchType + "Btn").style.backgroundColor = "rgb(194, 91, 23)";

    console.log(searchType);
}

var apiType = 'isbn';
function setApiType(obj) {
    // un mark current api type, change api type, mark current api type
    document.getElementById(apiType + "Btn").style.backgroundColor = "#2B3E50";
    apiType = obj.value;
    document.getElementById(apiType + "Btn").style.backgroundColor = "rgb(33, 47, 61)";

    console.log(apiType);
}