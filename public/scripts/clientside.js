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
        loadSuccess();
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

    // Clean slate
    document.getElementById("bodyContainer").innerHTML = "";

    $.get("/getRecent", function(data){
        document.getElementById("bodyContainer").innerHTML += 
            '<div class="libraryHeader">Recent Added Books</div>' +
            '<div id="libraryContainer" class="libraryContainer"></div>';
                                                              
        // set number of books to display
        if (data.list.length === 1){
            document.getElementById("libraryContainer").style.gridTemplateColumns = "1fr";
        }
        else if (data.list.length === 2){
            document.getElementById("libraryContainer").style.gridTemplateColumns = "1fr 1fr";
        }
        else if (data.list.length === 3){
            document.getElementById("libraryContainer").style.gridTemplateColumns = "1fr 1fr 1fr";
        }

        for (var i = 0; i < data.list.length; i++){
            document.getElementById("libraryContainer").innerHTML += 
                '<div class="libraryBook">' +
                '   <div><img src="' + data.list[i].cover_url + '" alt="book cover" onclick="loadBook(' + data.list[i].book_id + ')"></div>' +
                '   <div>' + data.list[i].title + '</div>' +
                '   <div>' + data.list[i].name + '</div>' +
                '</div>';
        }
        // all links box and divider
        document.getElementById('bodyContainer').innerHTML +=
            '<div class="allLinkContainer">' +
            '   <div class="linkBox">' +
            '       <button onclick="getAll()">View All</button>' +
            '   </div>' +
            '</div>' +
            '<hr class="solid">';
        // currently leading books
        document.getElementById('bodyContainer').innerHTML +=
            '<div class="libraryHeader">Currently Reading</div>' +
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
    document.getElementById("bodyContainer").innerHTML = 
        '<div class="addBodyContainer">' +
        '  <div class="addPageContainer">' +
        '      <div class="addPageTitle">Add A New Book</div>' +
        '      <div class="addFormContainer">' +
        '          <div class="addFormInput">' +
        '              <form class="addSearchForm">' + 
        '                  <input type="text" placeholder="Enter text here..." id="queryString">' +
        '              </form>' +
        '          </div>'+
        '          <div class="addFormButtons">' +
        '              <div class="addSearchForm">' +
        '                  <button class="addButtons" id="isbnBtn" value="isbn" onclick="setApiType(this)">ISBN</button>' +
        '                  <button class="addButtons" id="inauthorBtn" value="inauthor" onclick="setApiType(this)">Author</button>' +
        '                  <button class="addButtons" id="intitleBtn" value="intitle" onclick="setApiType(this)">Title</button>' +
        '              </div>'+
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
function getAll(){
    $.get("/getAll", function(data){
        console.log(data);

        document.getElementById("bodyContainer").innerHTML = "";
        document.getElementById("bodyContainer").innerHTML += 
            '<div class="libraryHeader">Current Library</div>' +
            '<div id="libraryContainer" class="libraryContainer"></div>';
                                                              
        // set number of books to display
        if (data.list.length === 1){
            document.getElementById("libraryContainer").style.gridTemplateColumns = "1fr";
        }
        else if (data.list.length === 2){
            document.getElementById("libraryContainer").style.gridTemplateColumns = "1fr 1fr";
        }
        else if (data.list.length === 3){
            document.getElementById("libraryContainer").style.gridTemplateColumns = "1fr 1fr 1fr";
        }

        for (var i = 0; i < data.list.length; i++){
            document.getElementById("libraryContainer").innerHTML += 
                '<div class="libraryBook">' +
                '   <div><img src="' + data.list[i].cover_url + '" alt="book cover" onclick="loadBook(' + data.list[i].book_id + ')"></div>' +
                '   <div>' + data.list[i].title + '</div>' +
                '   <div>' + data.list[i].name + '</div>' +
                '</div>';
        }           
    });
}

// loads the single book view screen
function loadBook(id) {
    $.get("/getBook", {id:id}, function(data){
        console.log(data);

        let title = data.list[0].title;
        let author = data.list[0].name;
        let description = data.list[0].description;
        let cover = data.list[0].cover_url;

        document.getElementById("bodyContainer").innerHTML = "";
        document.getElementById("bodyContainer").innerHTML += 
            '<div class="sBookContainer">' +
            '   <div class="sBookTitle">' +
            '       <div>' + title + '</div>' +
            '   </div>' +
            '   <div class="sBookDetails">' +
            '       <div class="sBookCover">' +
            '           <img src="' + cover + '" alt="book cover">' +
            '       </div>' +
            '       <div class="sBookInfo">' +
            '           <div class="sBookAuthor">' +
            '               <div>' + author + '</div>' +
            '           </div>' +
            '           <div class="sBookDesc">' +
            '               <div>' + description + '</div>' +
            '           </div>' +
            '           <div class="sBookLists">' +
            '               <label for="loaned">Loaned</label>' +
            '               <input type="checkbox" id="loaned">' +
            '               <label for="readlist">Read List</label>' +
            '               <input type="checkbox" id="readlist">' +
            '           </div>' +
            '       </div>' +
            '   </div>' +
            '   <div class="editButtons">' +
            '       <button class="deleteButton" onclick="deleteBook(' + id + ', \'' + title + '\', \'' + author + '\')">Delete</button>' +
            '       <button class="saveButton" onclick="updateBook(' + id + ')">Save</button>' +
            '   </div>' +
            '</div>';

            if (data.list[0].loaned === 'true'){
                document.getElementById("loaned").checked = true;
            }
            if (data.list[0].readlist === 'true'){
                document.getElementById("readlist").checked = true;
            }
    });

}

// loads the readlist
function loadReadlist() {

}

// loads search results
function loadSearch() {
    var sType = searchType;
    var sString = document.getElementById("searchInput").value;

    // Reset Search Bar
    document.getElementById(searchType + "Btn").style.backgroundColor = "#DF691A";
    document.getElementById("searchInput").value = '';
    searchType = 'title';

    $.get("/searchDB", {sType:sType, sString:sString}, function(data){
        console.log(data);
        
        document.getElementById("bodyContainer").innerHTML = "";
        document.getElementById("bodyContainer").innerHTML += 
            '<div class="libraryHeader">Search Results</div>' +
            '<div id="libraryContainer" class="libraryContainer"></div>';
                                                              
        // set number of books to display, default 4 wide
        if (data.list.length === 1){
            document.getElementById("libraryContainer").style.gridTemplateColumns = "1fr";
        }
        else if (data.list.length === 2){
            document.getElementById("libraryContainer").style.gridTemplateColumns = "1fr 1fr";
        }
        else if (data.list.length === 3){
            document.getElementById("libraryContainer").style.gridTemplateColumns = "1fr 1fr 1fr";
        }

        for (var i = 0; i < data.list.length; i++){
            document.getElementById("libraryContainer").innerHTML += 
                '<div class="libraryBook">' +
                '   <div><img src="' + data.list[i].cover_url + '" alt="book cover" onclick="loadBook(' + data.list[i].book_id + ')"></div>' +
                '   <div>' + data.list[i].title + '</div>' +
                '   <div>' + data.list[i].name + '</div>' +
                '</div>';
        } 
    });
}

// loads list of loaned books
function loadLoaned(){

}

function deleteBook(id, title, author){
    document.getElementById("bodyContainer").innerHTML = "";
    document.getElementById("bodyContainer").innerHTML += 
        '<div class="dltConfContainer">' +
        '   <div class="dltQContainer">Are you sure you want to delete..</div>' +
        '   <div class="dltBkTitle">' + title + '</div>' +
        '   <div>BY</div>' +
        '   <div class="dltBkAuthor">' + author + '</div>' +
        '   <div class="btnsRow">' +
        '       <div class="dltBtnsBox">' +
        '           <div class="dltBtn">' +
        '               <button onclick="confirmDelete(' + id + ')">Delete Book</button>' +
        '           </div>' +
        '           <div class="dltBtn">' +
        '               <button onclick="loadBook(' + id + ')">Return to Book</button>' +
        '           </div>' +
        '       </div>' +
        '   </div>' +
        '</div>';
}

function confirmDelete(id){
    console.log('Sending Delete request to DB for ID: ' + id);

    $.post("/deleteBook", {id:id}, function(data){
        console.log("Back from delete.");
        console.log(data);

        document.getElementById("bodyContainer").innerHTML = "";
        document.getElementById("bodyContainer").innerHTML += 
            '<div class="suContainer">' +
            '   <div class="suMessageContainer">' +
            '       <div>Book succesfully deleted from your library.</div>' +
            '   </div>' +
            '   <div class="suBtnContainer">' +
            '       <div class="suBtnChild">' +
            '           <button onclick="loadDefaults()">Home</button>' +
            '       </div>' +
            '       <div class="suBtnChild">' +
            '           <button onclick="getAll()">View Library</button>' +
            '       </div>' +
            '   </div>' +
            '</div>';

    });
}

function loadSuccess(){
    document.getElementById("bodyContainer").innerHTML = "";
    document.getElementById("bodyContainer").innerHTML += 
        '<div class="suContainer">' +
        '   <div class="suMessageContainer">' +
        '       <div>Book succesfully added to your library.</div>' +
        '   </div>' +
        '   <div class="btnsRow">' +
        '       <div class="suBtnContainer">' +
        '           <div class="suBtnChild">' +
        '               <button onclick="loadAdd()">Add Another</button>' +
        '           </div>' +
        '           <div class="suBtnChild">' +
        '               <button onclick="getAll()">View Library</button>' +
        '           </div>' +
        '       </div>' +
        '   </div>' +
        '</div>';
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
            '<div class="bookContainer">' +
            '   <div class="leftBookContainer">' +
            '       <div class="bookCover">' +
            '           <img src="' + bookCover + '" alt="Book Cover">' +
            '       </div>' +
            '       <div class="addBookBtn">' +
            '           <button onclick="addBook(' + i + ')">Add Book</button>' +
            '       </div>' +
            '   </div>' +
            '   <div class="rightBookContainer">' +
            '       <div class="bookAddTitle"><div>' + bookName + '</div></div>' +
            '       <div class="bookAddAuthor"><div>' + bookAuthor + '</div></div>' +
            '       <div class="bookAddDes"><div>' + bookDescription + '</div></div>' +
            '   </div>' +
            '</div>';
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