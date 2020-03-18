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
    var urlRequest = "https://www.googleapis.com/books/v1/volumes?q=isbn:9780399590504&key=AIzaSyBxBJ0t5Mb5ktVZY9Px5jYrZLJfrv9RXq8";
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
function setBook() {

}

// adds book to readlist via ID
function setReadlist() {

}

// adds book and contact to loaned databast table
function setLoaned() {

}

// loads the home screen
function loadHome() {

}

// loads the add book screen
function loadAdd() {

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
    console.log("API RESULTS::");
    console.log(results);

    console.log(JSON.parse(results));
    /*
    let bookName = results.items[0].volumeInfo.title;
    let bookAuthor = results.items[0].volumeInfo.Authors[0];
    let bookDescription = results.items[0].volumeInfo.description;
    let bookCover = results.items[0].volumeInfo.imageLinks.thumbnail;
    */

    document.getElementById("bodyContainer").innerHTML = "";
    
    
    /*
    $(".bodyContainer").append(
        '<div><img src="' + bookCover + '" alt="Book Cover">' +
        '<div><h2>' +  bookName + '</h2><br>' +
        '<h3>' + bookAuthor + '</h3><br><br>' +
        '<h4>' + bookDescription + '</h4></div>'
    );
    */

}