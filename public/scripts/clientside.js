function getAll() {
    console.log("Getting All...");   
}

function backToHome() {
    $(".bodyOptions").replaceWith(
        '<div class="bodyOptions">' +
        '<div></div>' +
        '<div><input type="image" src="/img/all_btn.png" alt="all" id="all" onclick="getAll()"></div>' +
        '<div><input type="image" src="/img/meat_btn.png" alt="meat" id="item" onclick="searchByItem(\'meat\')"></div>' +
        '<div><input type="image" src="/img/produce_btn.png" alt="produce" id="item" onclick="searchByItem(\'produce\')"></div>' +
        '<div><input type="image" src="/img/dairy_btn.png" alt="dairy" id="item" onclick="searchByItem(\'dairy\')"></div>' +
        '<div><input type="image" src="/img/grain_btn.png" alt="grains" id="item" onclick="searchByItem(\'grains\')"></div>' +
        '<div><input type="image" src="/img/other_btn.png" alt="other" id="item" onclick="searchByItem(\'other\')"></div>' +
        '<div></div>' +
        '</div>');
}

function addItemForm () {
    $(".bodyOptions").replaceWith(
        '<div class="itemForm">' +
        '<div></div>' +
        '<div></div>' +
        '<div>' +
        '<form>' +
            '<h3>Item</h3>' +
            '<input type="text" id="name" name="name" placeholder="Item Name">' +
            '<h3>Item Type</h3>' +
            '<select id="type" name="type" placeholder"Select an item type">' +
                '<option value="meat">Meat</option>' +
                '<option value="produce">Produce</option>' +
                '<option value="dairy">Dairy</option>' +
                '<option value="grains">Grain</option>' +
                '<option value="other">Other</option>' +
            '</select>' +
            '<h3>Item Quantity</h3>' +
            '<input type="text" id="quantity" name="quantity" placeholder="Quantity (2 lbs, 3 dozen, etc...)">' +
            '<h3>Notes</h3>' +
            '<textarea id="notes" name="notes" placeholder="Add notes here, such as expiration..." rows="10" cols="80"></textarea>' +
            '<h3>Location</h3>' +
            '<select id="location" name="location" placeholder="Select the item location..">' +
                '<option value="1">Pantry</option>' +
                '<option value="2">Kitchen Fridge</option>' +
                '<option value="3">Kitchen Freezer</option>' +
                '<option value="4">Kitchen Cabinets</option>' +
                '<option value="5">Garage Fridge</option>' +
                '<option value="6">Garage Freezer</option>' +
                '<option value="7">Food Storage</option>' +
            '</select>' +
            '</form>' +
            '<input type="image" src="/img/add_btn.png" alt="add" onclick="addItem()"> <input type="image" src="/img/back_btn.png" alt="back" onclick="backToHome()">' +
        '</div>' +
        '<div></div>' +
        '<div></div>' +
        '</div>');

}

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
