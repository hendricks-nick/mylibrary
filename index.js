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
app.get("/auth_config.json", (req, res) => {
    res.sendFile(join(__dirname, "auth_config.json"));
  });

// Express routing for pages requests
app.get("/", (_, res) => {
    res.sendFile(join(__dirname, "index.html"));
  });
app.get("/", invController.getDefault);
app.get("/searchDB", invController.searchDB);
app.get("/getRecent", invController.getRecent);
app.get("/getList", invController.getList);
app.get("/getAll", invController.getAll);
app.get("/getBook", invController.getById);
app.post("/addBook", invController.addBookToDB);
app.post("/updateBook", invController.updateBook);
app.post("/deleteBook", invController.deleteBook);

// listening - log to HEROKU logs  
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));

