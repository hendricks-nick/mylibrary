// DB URL if needed
// my-library-2020 db: postgresql-sinuous-65334


// Generate pool for DB connection
const { Pool } = require("pg");

//set DB connectionString from Heroku --- Static String below if needed
const connectionString = process.env.DATABASE_URL;

const pool = new Pool({connectionString: connectionString});

/***********************************************************
 *  Function: GETALL
 *  Purpose: Pulls ALL books in database
 **********************************************************/
function getAll (callback) {
  // DB query
  var sql = "SELECT * FROM book";

  // Log and send query
  console.log("Pulling ALL books from DB")
  callDatabase(sql, callback);
}

/***********************************************************
 *  Function: GETBYTITLE
 *  Purpose: Pulls list of books based on input book title.
 **********************************************************/
function getByTitle(title, callback) {
  console.log("Searching DB by Title for: " + title)
  // DB query
  var sql = "SELECT * FROM book AS b INNER JOIN author AS a ON b.author_id = a.id WHERE b.title LIKE '%" + title + "%';";

  // Log and send query
  console.log("Searching DB by Title for: " + title)
  callDatabase(sql, callback);
}

/***********************************************************
 *  Function: GETBYAUTHOR
 *  Purpose: Pulls list of books based on input author name.
 **********************************************************/
function getByAuthor(author, callback) {
  // DB query
  var sql = "SELECT * FROM author AS a INNER JOIN book AS b ON a.id = b.author_id WHERE a.name LIKE '%" + author + "%';";

  // Log and send query to DB
  console.log("Searching DB by Author for: " + author);
  callDatabase(sql, callback);
}

function getByKeyword(keyword, callback) {

}

function getLoanedList(callback) {
  
}

function getById(id, callback) {

}
/***********************************************************
 *  Function: ADDBOOKTODB
 *  Purpose: Adds selected book to database. First the author
 *           to check for duplicate in the author table, then
 *           the book info.
 **********************************************************/
function addBookToDB(name, author, description, cover_url, callback) {
  // Insert Author FIRST - Author name is set to constraint unique, so duplicates will be skipped.
  const sqlAuthor = "INSERT INTO author (name) values (\'" + author + "\') ON CONFLICT DO NOTHING;";
  const sqlBook = "INSERT INTO book (title, description, cover_url, author_id) values (\'" + name + "\', \'" + description + "\', \'" + cover_url + "\', (SELECT id FROM author WHERE author.name = '" + author + "'));";

  // Log and send 1st insert to DB
  console.log("Adding Author: "+ sqlAuthor);
  pool.query(sqlAuthor, function(err, db_results1){
    if (err) {
      console.log("Error in query: " + err);
      callback(err);
    }
    else { // Log this to the console for debugging purposes. Goes to HEROKU logs.
      // Log and send 2nd insert to DB
      console.log("Author Added Succesfully.");
      console.log("Adding Book: "+ sqlBook);
      callDatabase(sqlBook, callback);
    }
  });  
}

/***********************************************************
 *  Function: GETRECENT
 *  Purpose: Pulls most recent books added, up to the last 4.
 **********************************************************/
function getRecent(callback) {
  // DB query
  var sql = "SELECT b.title, b.cover_url, a.name FROM book AS b INNER JOIN author AS a ON b.author_id = a.id ORDER BY b.id DESC LIMIT 4;";
  
  // Call to database
  console.log("Querying Recent Additions: ");
  callDatabase(sql, callback);
}

/***********************************************************
 *  Function: CALLDATABASE
 *  Purpose: Used in functions to make a call to the database
 *           to run a select statement.
 **********************************************************/
function callDatabase(sqlQuery, callback){
  // Query to DB
  pool.query(sqlQuery, function(err, db_results) {
    // If an error occurrs
    if (err) {
      console.log("Error in query: " + err);
      callback(err);
    }
    else { // Log this to the console for debugging purposes. Goes to HEROKU logs.
    console.log(db_results.rows);

    // Create results object to send in callback
    var results = {
      success: true,
      list: db_results.rows
    };
    callback(null, results);
    } 
  });
}

// Functions being exported to use in invController
module.exports = {
  getAll: getAll,
  getByAuthor: getByAuthor,
  getByTitle: getByTitle,
  getByKeyword: getByKeyword,
  getById: getById,
  getLoanedList: getLoanedList,
  addBookToDB: addBookToDB,
  getRecent: getRecent
};
