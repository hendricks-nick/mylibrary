// DB URL if needed
// my-library-2020 db: postgresql-sinuous-65334


// Generate pool for DB connection
const { Pool } = require("pg");

//set DB connectionString from Heroku --- Static String below if needed
const connectionString = process.env.DATABASE_URL;

const pool = new Pool({connectionString: connectionString});

function getAll (callback) {
  console.log("Searching DB by Title for: " + title)
  // DB query
  var sql = "SELECT * FROM book";

  // Query to DB
  pool.query(sql, function(err, db_results) {
    // If an error occurred...
    if (err) {
        console.log("Error in query: " + err);
        callback(err);
    }
    else {// Log this to the console for debugging purposes. Goes to HEROKU logs.
    console.log(db_results.rows);

    var results = {
      success: true,
      list: db_results.rows
    };
    callback(null, results);
  }

  });
}
function getByTitle(title, callback) {
  console.log("Searching DB by Title for: " + title)
  // DB query
  var sql = "SELECT * FROM book AS b INNER JOIN author AS a ON b.author_id = a.id WHERE b\exit.name LIKE '%" + title + "%';";

  // Query to DB
  pool.query(sql, function(err, db_results) {
    // If an error occurred...
    if (err) {
        console.log("Error in query: " + err);
        callback(err);
    }
    else {// Log this to the console for debugging purposes. Goes to HEROKU logs.
    console.log(db_results.rows);

    var results = {
      success: true,
      list: db_results.rows
    };
    callback(null, results);
  }

  });
}

function getByAuthor(author, callback) {
  console.log("Searching DB by Author for: " + author);
  
  // DB query
  var sql = "SELECT * FROM author AS a INNER JOIN book AS b ON a.id = b.author_id WHERE a.name LIKE '%" + author + "%';";

  // Query to DB
  pool.query(sql, function(err, db_results) {
    // If an error occurred...
    if (err) {
        console.log("Error in query: " + err);
        callback(err);
    }
    else {// Log this to the console for debugging purposes. Goes to HEROKU logs.
    console.log(db_results.rows);

    var results = {
      success: true,
      list: db_results.rows
    };
    callback(null, results);
  }

  }); 
}

function addBookToDB(name, author, description, cover_url, callback) {
  // Insert Author FIRST - Author name is set to constraint unique, so duplicates will be skipped.
  const sql = "INSERT INTO author (name) values ($4) ON CONFLICT DO NOTHING;" + 
              "INSERT INTO book (name, description, cover_url, author_id) values ($1, $2, $3, (SELECT id FROM author WHERE author_name = '" + "$4" + "'));";
  const values = [name, description, cover_url, author];

  console.log("DB Query: "+ sql);
  pool.query(sql, values, function(err, db_results){
    if (err) {
        console.log("Error in query: " + err);
        callback(err);
    }
    else {// Log this to the console for debugging purposes. Goes to HEROKU logs.
      console.log(db_results.rows);

      var results = {
        success: true,
       list: db_results.rows
      };
      callback(null, results);
    }
  }); 
}

module.exports = {
  getAll: getAll,
  getByAuthor: getByAuthor,
  getByTitle: getByTitle,
  addBookToDB: addBookToDB
};
