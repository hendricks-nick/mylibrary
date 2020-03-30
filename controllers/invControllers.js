// calls on invModel to use functions for connection to Database
const invModel = require("../models/invModel.js");

/************************************
 * name: getDefault
 * purpose: Loads main page.
 ************************************/
function getDefault(req, res) {
    // display index page
    res.render("pages/index");
}

/************************************
 * name: searchDB
 * purpose: Pulls list of books based
 *          on type and string input.
 ************************************/
function searchDB(req, res){
    type = req.param("sType");
    query = req.param("sString");

    // Log and send to DB
    console.log("-Controller-");
    console.log("Searching by " + type + ": " + query);
    
    invModel.getBooks(type, query, function(err, results){
        // Log error in HEROKU logs
        if(err === 'null'){
            console.log("Controller searchDB error: ");
            console.log(err);
        }
        // Send results back to clientside callback
        res.json(results);
    });
}

/************************************
 * name: getList
 * purpose: Pulls list of books either
 *          on read list or loaned.
 ************************************/
function getList(req, res) {
  
}

/************************************
 * name: getByID
 * purpose: Retrieves book by it's ID
 ************************************/
function getById(req, res) {
    let id = req.param("id");

    console.log("-Controller-")
    console.log("Retrieving Book by ID: " + id);
    invModel.getById(id, function(err, results){
        
        // Log error in HEROKU logs
        if(err === 'null'){
            console.log("Controller getByID error: ");
            console.log(err);
        }
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

    console.log("-Controller-")
    console.log("Book post received:");
    console.log("Name: " + name);
    console.log("Author: " + author);

    invModel.addBookToDB(name, author, description, cover, function(results){
        res.json(results);
    });
}

/************************************
 * name: getRecent
 * purpose: Pulls recent additions.
 ************************************/
function getRecent(req, res){
    invModel.getRecent(function(err, results){
        
        // Log error in HEROKU logs
        if(err === 'null'){
            console.log("Controller getRecent error: ");
            console.log(err);
        }
        // Send results back to clientside callback
        res.json(results);
    });
}

/************************************
 * name: getAll
 * purpose: Pulls list of all books.
 ************************************/
function getAll(req, res) {
    invModel.getAll(function(err, results){
        
        // Log error in HEROKU logs
        if(err === 'null'){
            console.log("Controller getAll error: ");
            console.log(err);
        }
        // Send results back to clientside callback
        res.json(results);
    });
}

/************************************
 * name: deleteBook
 * purpose: Deletes selected book.
 ************************************/
function deleteBook(req, res){
    id = req.param("id");

    invModel.deleteBook(id, function(results){
        // Send results back to clientside callback
        res.json(results);
    });
}

// exports the functions so that they can be access in index.js when required there
module.exports = {
    getDefault: getDefault,
    searchDB: searchDB,
    getById: getById,
    getList: getList,
    getRecent: getRecent,
    getAll: getAll,
    addBookToDB: addBookToDB,
    deleteBook: deleteBook
};