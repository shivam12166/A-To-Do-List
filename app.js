const express = require("express");
const bodyParser = require("body-parser");
var items = [];

const app = express();
app.use(express.static("public"))
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", function(require, respond) {
    var today = new Date();
    var options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    };

    var day = today.toLocaleDateString("en-US", options);

    respond.render("list", { kindOfDay: day, newitem: items });
})
app.post("/", function(require, respond) {
    var item = require.body.newitem;
    items.push(item);
    respond.redirect("/");
})

app.listen(3000, function() {
    console.log("server is running on port number 3000");
})