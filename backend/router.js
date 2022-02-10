const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const session = require("express-session");
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password", // really secure XD
  database: "project",
});
con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});
app.use(bodyParser.urlencoded({ extended: true }));
let dirname;
// code to get the current directory and delete /backend at end from it
dirname = __dirname.substring(0, __dirname.length - 7);
// css in express to get /public css
app.use(express.static(dirname + "/public"));

// gets / and render "../html/signup.html"
app.get("/signup", (req, res) => {
  // render the html file
  res.sendFile(dirname + "/html/signup.html");
});
app.post("/signup", (req, res) => {
  // get the form
  let form = req.body;
  let pass = form.password;
  let name = form.username;
  // create users table if it doesn't exist
  con.query(
    "CREATE TABLE IF NOT EXISTS users ( username VARCHAR(255), password VARCHAR(255))",
    function (err, result) {
      if (err) throw err;
    }
  );
  // adding name and pass to the database (Not throwing error for non-unique username)
  con.query(
    "INSERT INTO users (username, password) VALUES ('" +
      name +
      "', '" +
      pass +
      "')",
    function (err, result) {
      if (err) {
        throw err;
      } else {
        console.log("1 record inserted");
      }
    }
  );
});

// listen on port 8080
app.listen(8080, () => {
  console.log("Server started on port 8080");
});
