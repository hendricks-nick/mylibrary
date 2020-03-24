// Generate express instance for library use
const express = require('express');
const app = express();

// Connect to controller
const invController = require("./controllers/invControllers.js");

// Set port 
const PORT = process.env.PORT || 5000;

// Set views folder, static pages foler and view engine
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set("views", "views");
app.set("view engine", "ejs");

// Express routing for pages requests
app.get("/", invController.getDefault);
app.get("/searchTitle", invController.getByTitle);
app.get("/searchAuthor", invController.getByAuthor);
app.get("/searchKeyword", invController.getByKeyword);
app.get("/getRecent", invController.getRecent);
app.get("/getLoaned", invController.getLoanedList);
app.get("/getAll", invController.getByTitle);
app.get("/getBook", invController.getById);
app.post("/addBook", invController.addBookToDB);

// listening - log to HEROKU logs  
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));

