
// apikey: ab9941c3b838d576684a4988144778e9-us7
// listId: d6f0c2f209
const bodyParser = require("body-parser");
const express = require("express");
const request = require("request");
const https = require("https");

const app = express();
// used to expose static files
app.use(express.static("public"));
// used to make request human readable. re
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/signup.html`);
});

app.post("/", (req0, res0) => {
    const firstName = req0.body.fname;
    const lastName = req0.body.lname;
    const email = req0.body.email;
    
    // create the data
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);
    const url =  "https://us7.api.mailchimp.com/3.0/lists/d6f0c2f209";
    const options = {
        "method": "POST",
        "auth": "anynamehere:ab9941c3b838d576684a4988144778e9-us7",
    };
    const req1 = https.request(url, options, (res1) => {
        if(res1.statusCode == 200){
            res0.sendFile(`${__dirname}/success.html`);
        } else {
            res0.sendFile(`${__dirname}/failure.html`);
        }
        res1.on("data", function(data){
            console.log("success");
        })
    });

    req1.write(jsonData);
    req1.end();
});

app.post("/failure", (req, res) => {
    res.redirect("/");
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});