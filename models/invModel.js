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
  var sql = "SELECT b.book_id, b.title, a.name, b.cover_url FROM book AS b INNER JOIN author AS a ON b.author_id = a.author_id ORDER BY b.book_id DESC;";

  // Log and send query
  console.log("-Model-");
  console.log("Pulling ALL books from DB")
  callDatabase(sql, callback);
}

/***********************************************************
 *  Function: GETBOOKS
 *  Purpose: Pulls list of books based on input search type 
 *           and string.
 **********************************************************/
function getBooks(type, query, callback) {
  // Check for which type of query to send
  if (type === 'author'){
    var sql = "SELECT * FROM book AS b INNER JOIN author AS a " +
              "ON a.author_id = b.author_id " + 
              "WHERE lower(a.name) LIKE lower('%" + query +"%'); ";
    
    // Log location
    console.log("-Model-");
    console.log("Searching DB by Author for: " + query);
  }

  else if (type === 'title'){
    var sql = "SELECT * FROM book AS b INNER JOIN author AS a " +
              "ON a.author_id = b.author_id " + 
              "WHERE lower(b.title) LIKE lower('%" + query +"%'); ";
    
    // Log location
    console.log("-Model-");
    console.log("Searching DB by Title for: " + query);
  }

  else if (type === 'keyword'){
    var sql = "SELECT * FROM book AS b INNER JOIN author AS a " +
              "ON a.author_id = b.author_id " + 
              "WHERE lower(b.title) LIKE lower('%" + query +"%')" +
              "OR lower(b.description) LIKE lower('%" + query +"%')" +
              "OR lower(a.name) LIKE lower('%" + query +"%');";

    // Log location
    console.log("-Model-");
    console.log("Searching DB by Keyword for: " + query);
  }
  callDatabase(sql, callback);
}

/***********************************************************
 *  Function: UPDATEBOOK
 *  Purpose: Updates book when saved, adjusts if the book is
 *           marked as loaned or readlist.
 **********************************************************/
function updateBook(id, loaned, readlist, callback) {
  // DB Query
  var sql = "UPDATE book SET loaned = '" + loaned + "', readlist = '" + readlist + "' WHERE book_id = '" + id + "';";

  // Log and Send DB
  console.log("-Model-");
  console.log("Updating DB for ID: " + id);
  callDatabase(sql, callback);
}

/***********************************************************
 *  Function: ADDLIST
 *  Purpose: Gets books that match selected list type, be
 *           it readlist or loaned.
 **********************************************************/
function getList(type, callback) {
  // DB Query
  sql = "SELECT * book AS b INNER JOIN author AS a ON a.author_id = b.author_id WHERE b." + type + " = 'true';";

  // Log and send to DB
  console.log("-Model-");
  console.log("Getting list for: " + type);
  callDatabase(sql, callback);
}

/***********************************************************
 *  Function: GETBYID
 *  Purpose: Pulls book info by ID.
 **********************************************************/
function getById(id, callback) {
  // DB Query
  let sql = "SELECT * FROM book AS b INNER JOIN author AS a ON a.author_id = b.author_id WHERE b.book_id = '" + id +"';";

  // Log and send select to DB
  console.log("-Model-");
  console.log("Search by ID: " + id);
  callDatabase(sql, callback);
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
  const sqlBook = "INSERT INTO book (title, description, cover_url, author_id) values (\'" + name + "\', \'" + description + "\', \'" + cover_url + "\', (SELECT author_id FROM author WHERE author.name = '" + author + "'));";

  // Log and send 1st insert to DB
  console.log("-Model-");
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
 *  Function: DELETEBOOK
 *  Purpose: Create and send SQL query to DB to delete book.
 **********************************************************/
function deleteBook(id, callback){
  // SQL Query
  let sql = 'DELETE FROM book AS b WHERE b.book_id =' + id + ';';

  // Log and send query
  console.log("-Model-");
  console.log("Deleting ID: " + id);
  callDatabase(sql, callback);
}

/***********************************************************
 *  Function: GETRECENT
 *  Purpose: Pulls most recent books added, up to the last 4.
 **********************************************************/
function getRecent(callback) {
  // DB query
  var sql = "SELECT b.title, b.cover_url, a.name, b.book_id FROM book AS b INNER JOIN author AS a ON b.author_id = a.author_id ORDER BY b.book_id DESC LIMIT 4;";
  
  // Call to database
  console.log("-Model-");
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
  getBooks:getBooks,
  getById: getById,
  getList: getList,
  addBookToDB: addBookToDB,
  getRecent: getRecent,
  deleteBook: deleteBook,
  updateBook:updateBook
};
