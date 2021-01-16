//jshint esversion:6
// for adding api keys and secrets. it is good to put this line on tp
require("dotenv").config();
const secret = process.env.secret;

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");
// now using bcrypt which includes salt
// const md5 = require("md5");
const bcrypt = require('bcrypt');

const app = express();


app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


let connString = "mongodb://localhost:27017/userDB";
mongoose.connect(connString, { useNewUrlParser: true, useUnifiedTopology: true });

// schema: simple JavaScript object
// const userSchema = {
//     email: String,
//     password: String
// }

// schema: proper mongoose schema. used for adv capabilities like encryption
const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

// now using hashing
// userSchema.plugin(encrypt, {secret: secret, encryptedFields: ["password"]});


// model
const User = mongoose.model("User", userSchema);



app.get("/", (req, res) => {
    res.render("home");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/register", (req, res) => {
    res.render("register");
});


app.post("/register", (req, res) => {
    let email = req.body.username;
    // now using bcrypt which includes salting
    // let password = md5(req.body.password);
    let password = req.body.password;
    bcrypt.hash(password, 2, (err, hash) => {
        const newUser = new User({ email: email, password: hash });
        newUser.save(err => {
            if (err) {
                console.log(err);
            }
            else {
                res.render("secrets");
            }
        });
    });

});


app.post("/login", (req, res) => {
    let username = req.body.username;
    // now using bcrypt
    // let password = md5(req.body.password);
    let password = req.body.password;

    User.findOne({ email: username }, (err, foundUser) => {
        if (err) {
            console.log(err);
        }
        else {
            if (foundUser) {
                // now using bcrypt
                // if (foundUser.password == password) {
                   bcrypt.compare(password, foundUser.password, (err, bres) => {
                       if(bres){
                        res.render("secrets");
                       }
                   });
            }
        }
    });
});







app.listen(3000, function () {
    console.log("Server started on port 3000");
});
