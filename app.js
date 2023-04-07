const express = require("express");
const bodyParser = require("body-parser");
let items = [];
let workItems = [];
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

    respond.render("list", { listTitle: day, newitem: items });
})
app.post("/", function(require, respond) {
    let item = require.body.newitem;
    items.push(item);
    respond.redirect("/");
})

app.get("/work", function(require, respond) {
    respond.render("list", { listTitle: "Work List", newitem: workItems });
})
app.post("/work", function(require, respond) {
    let item = respond.body.newitem;
    if (respond.body.list === "work") {
        workItems.push(item);
        respond.redirect("/work");
    } else {
        items.push(item);
        respond.redirect("/");
    }
})

app.listen(3000, function() {
    console.log("server is running on port number 3000");
})