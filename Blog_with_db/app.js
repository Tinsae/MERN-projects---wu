//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const mongoose = require("mongoose");

let connString = "mongodb://localhost:27017/blogDB";
mongoose.connect(connString, { useNewUrlParser: true, useUnifiedTopology: true });

// mongo schema
const postsSchema = {
  postTitle: {
    type: String,
    required: [true, "post title is required"],
    minlength: [5, "minimum post title length is 5 chars"]

  },
  postBody: {
    type: String,
    required: [true, "post body is required"],
    minlength: [15, "minimum post length is 15 chars"]
  }
}

// mongo model
const Post = mongoose.model("Post", postsSchema);


const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
const posts = [];
const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  Post.find({}, (err, foundPosts) => {
    if (foundPosts) {
      res.render("home.ejs", { startingContent: homeStartingContent, posts: foundPosts });
    }
  });
});

app.get("/about", (req, res) => {
  res.render("about.ejs", { startingContent: aboutContent });
});


app.get("/contact", (req, res) => {
  res.render("contact.ejs", { startingContent: contactContent });
});

app.get("/compose", (req, res) => {
  res.render("compose.ejs");
});

app.post("/compose", (req, res) => {
  // const post = {postTitle: req.body.postTitle, postBody: req.body.postBody};
  // posts.push(post)
  const postTitle = req.body.postTitle;
  const postBody = req.body.postBody;
  const newPost = new Post({ postTitle: postTitle, postBody: postBody });
  newPost.save(err => {
    if (!err) {
      res.redirect("/");
    }
  });
});

app.get("/posts/:postId", (req, res) => {
  let reqPostId = req.params.postId;
  // with database
  Post.findOne({ _id: reqPostId }, (err, foundPost) => {
    if (err) {
      console.log("error: " + err);
    }
    else if (foundPost) {
      console.log("no error; post is found");
      let postTitle = foundPost.postTitle;
      let postBody = foundPost.postBody;
      res.render("post.ejs", { postTitle: postTitle, postBody: postBody });
    }
    // post doesn't exitst
    else {
      res.redirect("/");
    }
  });




  // without database
  // for(let post of posts){
  //   let thisTitle = _.lowerCase(post.postTitle);
  //   let thisBody = _.lowerCase(post.postBody);
  //   if(thisTitle &&  thisTitle == reqTitle){
  //     res.render("post.ejs", {postTitle: reqTitle, postBody: thisBody});
  //   }
  // }
});










app.listen(3000, function () {
  console.log("Server started on port 3000");
});
