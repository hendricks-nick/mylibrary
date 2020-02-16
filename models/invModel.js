// Generate pool for DB connection
const { Pool } = require("pg");

//set DB connectionString from Heroku --- Static String below if needed
const connectionString = process.env.DATABASE_URL;
// DB URL if needed
// || 'postgres://ijjuidmmqrirwi:9096a2ef7618b6f1f2dc375f8c6cfc80fb0f53b16697e829113f8197ccb56926@ec2-107-21-216-112.compute-1.amazonaws.com:5432/d51ubhiu0qlh7g?ssl=true';

const pool = new Pool({connectionString: connectionString});

function getAll () {

}

function getByName(name, callback) {
    console.log("Searching DB for: " + name)
    
    callback(null, results);
}

function getItemsByType(itemType, callback) {
  console.log("Made it here. Getting items by: " + itemType);
  
  // DB query
  var sql = "SELECT name, qty, other_notes, location_id FROM " + itemType;

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

function addItemToDB(name, type, qty, notes, location, callback) {
  const sql = 'INSERT INTO '+ type +'(name, qty, other_notes, location_id) values($1, $2, $3, $4)';
  const values = [name, qty, notes, location];

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
    getItemsByType: getItemsByType,
    getByName: getByName,
    addItemToDB: addItemToDB
};
