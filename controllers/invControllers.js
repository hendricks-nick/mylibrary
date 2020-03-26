// calls on invModel to use functions for connection to Database
const invModel = require("../models/invModel.js");

function getDefault(req, res) {
    // display index page
    res.render("pages/index");
}

function getByTitle(req, res){

}

function getByAuthor(req, res){

}

function getByKeyword(req, res) {

}

function getLoanedList(req, res) {
  
}

/************************************
 * name: getByID
 * purpose: Retrieves book by it's ID
 ************************************/
function getById(req, res) {
    let id = req.param("id");

    console.log("-Controller-")
    console.log("Retrieving Book by ID: " + id);
    invModel.getById(id, function(results){
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
        console.log(err);
        res.json(results);
    });
}

/************************************
 * name: getAll
 * purpose: Pulls list of all books.
 ************************************/
function getAll(req, res) {
    invModel.getAll(function(err, results){
        console.log(err);
        res.json(results);
    });
}

// exports the functions so that they can be access in index.js when required there
module.exports = {
    getDefault: getDefault,
    getByTitle: getByTitle,
    getByAuthor: getByAuthor,
    getByKeyword: getByKeyword,
    getById: getById,
    getLoanedList: getLoanedList,
    getRecent: getRecent,
    getAll: getAll,
    addBookToDB: addBookToDB
};