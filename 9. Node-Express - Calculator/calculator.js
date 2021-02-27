const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.listen(3000, ()=>{
    console.log("server is live");
});


app.get("/", (req, res) => {
    // res.send("Hello World!");
    res.sendFile(`${__dirname}/index.html`);
});

app.post("/", (req, res) => {
    let num1 = parseFloat(req.body.num1);
    let num2 = parseFloat(req.body.num2);
    let result = num1 + num2;
    res.send("The result is " + result);

});

app.get("/bmiCalculator", (req, res) => {
    // res.send("Hello World!");
    res.sendFile(`${__dirname}/bmiCalculator.html`);
});

app.post("/bmiCalculator", (req, res) => {
    let weight = parseFloat(req.body.weight);
    let height = parseFloat(req.body.height);
    let bmi = weight / (height * height);
    res.send("Your BMI is " + bmi);
});