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
function getBookApi(queryString, queryType) {
    console.log("Sending API get request..");  
    console.log("Query Type: " + queryType);
    console.log("Query String: " + queryString);

    $.get("/apiGet", {queryType: queryType, queryString: queryString}, function(data){
        console.log("API query complete.");
        console.log(data);
        loadApiResults(data);
    });
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

    document.getElementById("bodyContainer").innerHTML = results;

}