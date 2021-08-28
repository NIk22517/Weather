const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
   
   const query = req.body.cityName;
const apiKey = "d40eaaaa6d60e5433140e7309b22796f#";
const unit = "metric";
const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${unit}`;
https.get(url, function(response){
    console.log(response);

    response.on('data', function(data){
        const weatherData =  JSON.parse(data);
        const temp = weatherData.main.temp;
        const desc = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imgUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
        res.write(`<h1>The Weather is currently ${desc}</h1>`);
        res.write(`<h1>The temperature in ${query} is ${temp} </h1>`);
        res.write(`<img src = ${imgUrl}>`);
        res.send();
    })
});

})






app.listen(3000, function(){
    console.log('Express is running on port 3000')
})