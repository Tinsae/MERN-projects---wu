//jsinit esversion:6
const express = require("express");
const app = express();
app.listen(3000, () => {
    console.log("Server started on port 3000");
});

app.get("/", (req, res) => {
    res.send("<h1>Hello Express</h1>");
});

app.get("/contact", (req, res) =>{
    res.send("Contact me at xyz@gg.com");
});

app.get("/about", (req, res) =>{
    res.send("About me: I am a bird");
});

app.get("/hobbies", (req, res) =>{
    res.send("<ul> <li> Music </li> <li>Programming<li>Cooking</li><ul>");
});