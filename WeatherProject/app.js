// gderextismofrxpubk@miucce.com
// ofrxpubk@
const express = require("express");
const https = require("https");
const app = express();
app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
});
app.get("/", (req, res1) =>{
    // make a get request to weather api
    const wURL = "https://api.openweathermap.org/data/2.5/weather?q=Irving&appid=6deda334167283fd70c5fe59bc68ed5f&units=metric";
    https.get(wURL, (res2) => {
        console.log(res2.statusCode);
        res2.on("data", (data) => {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = `https://openweathermap.org/img/wn/${icon}.png`;
            res1.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
            res1.write(`<p> The Weather is currently <strong> ${weatherDescription} </strong> </p>`);
            res1.write(`<h1>The temperature in Irving is ${temp} °C </h1>`);
            res1.write(`<img style="background-color:black; height:80px; width:80px" src=${imageURL} />`);
            res1.send();
        });
    });   
});