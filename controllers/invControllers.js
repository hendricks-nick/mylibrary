// calls on invModel to use functions for connection to Database
const invModel = require("../models/invModel.js");


function getDefault(req, res) {
    // display index page
    res.render("pages/index");
}

/************************************
 * name: getBookByAPI
 * purpose: Get Books from Google Books API
 ************************************/
function getBookByAPI (req, res) {
    let qType = req.params.queryType;
    let qString = req.params.queryString;
    console.log("Made it to controller.");

    invModel.getBookByAPI(qType, qString, function(err, results) {
        console.log("Made it back: " + results);
        res.send(results);
    });
}

/************************************
 * name: 
 * purpose: 
 ************************************/
function getByName(req, res) {
    
    var name = req.params.name;
    
    invModel.getByName(name, function(err, results){
        if(!err) {
        res.json(results);
        }
        else {
            console.log("Error in getByName - invController: " + err);
        }
    });
}

/************************************
 * name: GETITEMSBYTYPE
 * purpose: Queries the database by inventory type
 ************************************/
function getItemsByType (req, res) {

    // Set the item type by the get request
    var itemType = req.query.itemType;

    // Queries DB through MODEL and forwards the results in JSON format back to clientside.js
    invModel.getItemsByType(itemType, function(err, results){
        res.json(results);
    });
}

/************************************
 * name: setADDITEM
 * purpose: Adds items to the database
 ************************************/
function addBookToDB (req, res) {
    var name = req.param("name");
    var author = req.param("author");
    var description = req.param("description");
    var cover = req.param("cover");

    console.log(name + author);
    console.log("Book post received:");
    console.log("Name: " + name);
    console.log("Author: " + author);

    invModel.addBookToDB(name, author, description, cover, function(results){
        res.json(results);
    });
}

function getAll() {
    invModel.getAll(function(results){
        console.log(results);
    });
}

// exports the functions so that they can be access in index.js when required there
module.exports = {
    getDefault: getDefault,
    getBookByAPI: getBookByAPI,
    getItemsByType: getItemsByType,
    getByName: getByName,
    getAll: getAll,
    addBookToDB: addBookToDB
};