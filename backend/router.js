const express = require("express");
const app = express();
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
// listen on port 3000
app.listen(3000, () => {
    console.log("Server started on port 3000");
});