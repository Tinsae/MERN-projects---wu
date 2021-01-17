//jshint esversion:6
// for adding api keys and secrets. it is good to put this line on tp
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const app = express();

app.set("view engine", "ejs");
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// session
app.use(session({
    secret: 'my little secret',
    resave: false,
    saveUninitialized: false
}));

// passport
app.use(passport.initialize());
app.use(passport.session());

let connString = "mongodb://localhost:27017/userDB";
mongoose.connect(connString, { useNewUrlParser: true, useUnifiedTopology: true });

// schema: proper mongoose schema. used for adv capabilities like encryption
const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

// used to hash, salt password and save to database easily
userSchema.plugin(passportLocalMongoose);

// model
const User = mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/register", (req, res) => {
    res.render("register");
});

// if user is already logged in show this page
// else redirect to register route
app.get("/secrets", (req, res) => {
    if (req.isAuthenticated()) {
        res.render("secrets");
    } else {
        res.render("login");
    }
});


app.post("/register", (req, res) => {
    User.register({ username: req.body.username }, req.body.password, (err, newUser) => {
        if (err) {
            console.log(err);
            res.redirect("/register");
        } else {
            passport.authenticate("local")(req, res, () => res.redirect("/secrets"));
        }
    });
});


app.post("/login", (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });

    req.login(user, err => {
        if(err){
            console.log(err);
        }
        else{
            passport.authenticate("local")(req, res, () => res.redirect("/secrets"));
        }
    });

});

app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});





app.listen(3000, function () {
    console.log("Server started on port 3000");
});
