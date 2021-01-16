// **********************************
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// **********************************



// **********************************

let connString = "mongodb://localhost:27017/wikiDB";
mongoose.connect(connString, { useNewUrlParser: true, useUnifiedTopology: true });

// schema
const articleSchema = {
    title: String,
    content: String
}
// model
const Article = mongoose.model("Article", articleSchema);

// **********************************

// chained route handlers in express



// all articles
app.route("/articles")

    .get((req, res) => {
        Article.find({}, (err, foundArticles) => {
            if (!err) {
                res.send(foundArticles);
            }
            else {
                res.send(err);
            }
        });
    })

    .post((req, res) => {
        const newArticle = new Article({
            title: req.body.title,
            content: req.body.content
        });
        newArticle.save(err => {
            if (!err) {
                res.send("Successfully added a new article");
            }
            else {
                res.send(err);
            }
        });
    })

    .delete((req, res) => {
        Article.deleteMany({}, err => {
            if (!err) {
                res.send("Successfully deleted all articles")
            }
            else {
                res.send(err);
            }

        });
    });




// specific article

// you can use %20 in your request in post man to search 
// using strings that have space(s)
app.route("/articles/:articleTitle")

    .get((req, res) => {
        let articleTitle = req.params.articleTitle;
        Article.findOne({ title: articleTitle }, (err, foundArticle) => {
            if (err) {
                console.log("error: " + err);
            }
            else if (foundArticle) {
                let articleContent = foundArticle.content;
                res.send({ "title": articleTitle, "content": articleContent });
            }
            // post doesn't exitst
            else {
                res.send("no article matching that title was found")
            }
        });
    })
    // {overwrite: true} !important
    .put((req, res) => {
        let articleTitle = req.params.articleTitle;
        let newArticleTitle = req.body.title;
        let newArticleContent = req.body.content;
        Article.update(
            { title: articleTitle },
            { title: newArticleTitle, content: newArticleContent },
            { overwrite: true },
            (err, foundArticle) => {
                if (!err) {
                    res.send("Successfully replaced article");
                }
                else {
                    res.send("no article matching that title was found")
                }
            });
    })
    // updates fields that have new value as given by req.body json object
    .patch((req, res) => {
        let articleTitle = req.params.articleTitle;
        Article.update(
            { title: articleTitle },
            { $set: req.body},
            (err, foundArticle) => {
                if (!err) {
                    res.send("Successfully updated article");
                }
                else {
                    res.send("no article matching that title was found")
                }
            });
    })
    .delete((req, res) => {
        Article.deleteOne({title: req.params.articleTitle}, err => {
            if (!err) {
                res.send("Successfully deleted the article =>" + req.params.articleTitle)
            }
            else {
                res.send(err);
            }

        });
    });

app.listen(3000, function () {
    console.log("Server started on port 3000");
});
