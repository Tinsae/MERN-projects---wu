const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
});

app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.post("/", (req0, res0) =>{
    const query = req0.body.city;
    const appId = "6deda334167283fd70c5fe59bc68ed5f";
    const unit = "metric";
    const wURL = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${appId}&units=${unit}`;
    https.get(wURL, (res1) => {
        console.log(res1.statusCode);
        res1.on("data", (data) => {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = `https://openweathermap.org/img/wn/${icon}.png`;
            res0.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
            res0.write(`<p> The Weather is currently <strong> ${weatherDescription} </strong> </p>`);
            res0.write(`<h1>The temperature in ${query} is ${temp} °C </h1>`);
            res0.write(`<img style="background-color:black; height:80px; width:80px" src=${imageURL} />`);
            res0.send();
        });
    });   
});