function addItem() {
    console.log("Starting to add item..");
    var type = document.getElementById("type").value;
    var name = document.getElementById("name").value;
    var qty = document.getElementById("quantity").value;
    var notes = document.getElementById("notes").value;
    var location = document.getElementById("location").value;

    console.log("name: " + name);

    $.post("/addItem", {type: type, name: name, qty: qty, notes: notes, location:location}, function(data){
        console.log(data);
        
        $(".itemForm").replaceWith(
            '<div class="bodyOptions">' +
            '<div></div>' +
            '<div></div>' +
            '<div><input type="image" src="/img/ant_btn.png" alt="another" onclick="addItemForm()"></div>' +
            '<div></div>' +
            '<div></div>' +
            '<div><input type="image" src="/img/back_btn.png" alt="back" onclick="backToHome()"></div>' +
            '<div></div>' +
            '<div></div>' +
            '</div>');

    });
}
function searchByItem(item) {
    console.log("Getting List of Items...");  
    
    var itemType = item;
    console.log("Item Type: " + itemType);

    $.get("/items", {itemType: itemType}, function(data){
        console.log("Server query complete.");
        console.log(data);

    $(".bodyOptions").replaceWith(
        '<div class="bodyOptions">' +
        '<div></div>' +
        '<div><h2>Name</h2></div>' +
        '<div><h2>Quantity</h2></div>' +
        '<div><h2>Location</h2></div>' +
        '<div><h2>Notes</h2></div>' +
        '<div></div>' +
        '<div><input type="image" src="/img/back_btn.png" alt="back" onclick="backToHome()"></div>' +
        '<div></div>' +
        '</div>');



       for(var i = 0; i < data.list.length; i++) {
            $(".bodyOptions").append(
                "<div></div>" +
                "<div><h2>" + data.list[i].name + "</h2></div>" +
                "<div><h2>" + data.list[i].qty + "</h2></div>" +
                "<div><h2>" + data.list[i].location_id + "</h2></div>" +
                "<div><h2>" + data.list[i].other_notes + "</h2></div>" +
                '<div><input type="image" src="/img/delete_btn.png" alt="delete" onclick="deleteItem(' + data.list[i].name +')"></div>' +
                "<div></div>" +
                "<div></div>");
        }
    });
}
// getters

// gets book data from Google Books via API
function getBookApi() {
    var qType = document.getElementById("queryType").value;
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


// gets book data from Database
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
        document.getElementById("bodyContainer").innerHTML = '<div id="recentContainer" class="recentContainer"></div>';

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
                                        '   <div><h3>' + data.list[i].title + '</h3></div>' +
                                        '   <div><h4>' + data.list[i].name + '</h4></div>' +
                                        '</div>';
        }

        document.getElementById('recentContainer').innerHTML +=
                                    '<div class="allLinkContainer">' +
                                    '   <div class="linkBox">' +
                                    '       <button onclick="getAll()">View All</button>' +
                                    '   </div' +
                                    '</div>' +
                                    '<hr class="solid">';
    });
}

// loads the add book screen
function loadAdd() {
    document.getElementById("bodyContainer").innerHTML = '<div class="addBookContainer">' +
                                                         '  <div>' +
                                                         '      <form>' +
                                                         '          <input type="text" id="queryString" name="queryString" placeholder="example">' +
                                                         '          <input type="radio" id="queryType" name="queryType" value="isbn">' +
                                                         '          <button name="data" type="button" onclick="getBookApi()">Click</button>' +
                                                         '      </form>' +
                                                         '  </div>' +
                                                         '</div>';
   
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