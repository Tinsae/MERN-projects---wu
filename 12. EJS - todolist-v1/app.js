const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js")
const app = express();
let items = ["Buy Food", "Cook Food", "Eat Food"];
let workItems = [];
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.get("/", (req, res) => {
    let day = date.getDay();
    res.render("list", {listTitle: day, items: items});
});

app.post("/", (req, res) =>{
    if(req.body.list === "Work"){
        workItems.push(req.body.newItem);
        res.redirect("/work");
    }
    else{
        items.push(req.body.newItem);
        res.redirect("/");
    }
});

app.get("/work", (req, res) => {
   res.render("list", {listTitle: "Work Title", items: workItems});
});

// app.post("/work", (req, res) =>{
//     workItems.push(req.body.newItem);
//     res.redirect("/");
// });

app.listen(3000, ()=>{
    console.log("Server started on port 3000");
});
