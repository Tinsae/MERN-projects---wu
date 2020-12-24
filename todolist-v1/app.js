const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.set("view engine", "ejs");
app.get("/", (req, res) => {
    let today = new Date();
    let options = {
        weekday: "long", 
        day: "numeric", 
        month: "long" 
    };
    let day = today.toLocaleDateString("en-US", options);  
    res.render("list", {kindOfDay: day });
});
app.listen(3000, ()=>{
    console.log("Server started on port 3000");
});
