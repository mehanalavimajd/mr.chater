const express = require("express");
const bodyParser = require("body-parser");
const app = express();
var mysql = require('mysql'); 
app.use(bodyParser.urlencoded({ extended: true }));
let dirname;
// code to get the current directory and delete /backend at end from it
dirname = __dirname.substring(0, __dirname.length - 7);
// css in express to get /public css
app.use(express.static(dirname + "/public"));

// gets / and render "../html/signup.html"
app.get("/signup", (req, res) => {
    // render the html file
    res.sendFile(dirname + "/html/signup/signup.html");
});
app.post("/signup", (req, res) => {
    // get the form
    let form = req.body;
    // get the form data
    console.log(form);
});

// listen on port 8080
app.listen(4000, () => {
    console.log("Server started on port 4000");
});
