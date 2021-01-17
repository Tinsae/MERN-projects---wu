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
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require("mongoose-findorcreate");
const app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.static("public"));

// mongoose.set('useNewUrlParser', true);
// mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
app.use(bodyParser.urlencoded({ extended: true }));

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
    password: String,
    googleId: String,
    secret: String
});

// used to hash, salt password and save to database easily
userSchema.plugin(passportLocalMongoose);
// this wil make User.findOrCreate work
userSchema.plugin(findOrCreate);

// model
const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});



// this should be done after all the setup
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
},
    function (accessToken, refreshToken, profile, done) {
        console.log(profile);
        // findOrCreate is not a mongoose method so I added it as a plugin
        User.findOrCreate({ googleId: profile.id }, (err, user) => {
            return done(err, user);
        });
    }
));



app.get("/", (req, res) => {
    res.render("home");
});

app.get("/auth/google", passport.authenticate("google", { scope: ["profile"] })
);


app.get("/auth/google/secrets",
    passport.authenticate("google", { failureRedirect: "/login" }),
    function (req, res) {
        res.redirect("/secrets");
    });


    
app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/register", (req, res) => {
    res.render("register");
});

// if user is already logged in show this page
// else redirect to register route
// app.get("/secrets", (req, res) => {
//     if (req.isAuthenticated()) {
//         res.render("secrets");
//     } else {
//         res.render("login");
//     }
// });

app.get("/secrets", function(req, res){
    User.find({"secret": {$ne: null}}, function(err, foundUsers){
      if (err){
        console.log(err);
      } else {
        if (foundUsers) {
          res.render("secrets", {usersWithSecrets: foundUsers});
        }
      }
    });
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
        if (err) {
            console.log(err);
        }
        else {
            passport.authenticate("local")(req, res, () => res.redirect("/secrets"));
        }
    });

});
app.get("/submit", function(req, res){
    if (req.isAuthenticated()){
      res.render("submit");
    } else {
      res.redirect("/login");
    }
  });
app.post("/submit", function(req, res){
    const submittedSecret = req.body.secret;
  //Once the user is authenticated and their session gets saved, their user details are saved to req.user.
    // console.log(req.user.id);
    User.findById(req.user.id, function(err, foundUser){
      if (err) {
        console.log(err);
      } else {
        if (foundUser) {
          foundUser.secret = submittedSecret;
          foundUser.save(function(){
            res.redirect("/secrets");
          });
        }
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
