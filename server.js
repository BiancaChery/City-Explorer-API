const express = require('express');
const cors = require("cors");
const app = express();
const axios = require("axios");
app.use(cors());
require("dotenv").config();
app.use(express.json());

const port = 3300

data = require("./data/weather.json")

class Forecast {
    constructor(valid_date, description) {
        this.date = valid_date;
        this.description = description;
    }
}

app.get('/', (request, response) => {
  response.send('City Explorer Weather!')
})

app.get('/weather', async (request, response) => {
    const cityLat = req.query.lat;
    const cityLon = req.query.lon;
    const searchQuery = req.query.searchQuery;
    console.log(cityLat, cityLon, searchQuery);
    if (!cityLat || !cityLon) {
        return response.status(400).json({error: "Missin query parameters."});
    }
    console.log("weather");

//     try {
//         let weather = data.find((city) => city.city_Name === request.query.searchQuery);
//     if(weather) {
//         let dates = weather.data.map((day) => {
//             let forecast = new Forecast(day.valid_date, day.weather.description);
            
//             return forecast;
//         })
//         response.send(dates);
//     } else {
//         response.status(404).send({error: "City not found"});
//     } 
//     } catch (error) {
//         response.status(500).send({error: "An error has occurred"});
//     }
// });

try {
    const weatherApiKey = process.env.Weather_API_Key;
    console.log("Here's the weather for ya");
    console.log(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${cityLat}&lon=${cityLon}&key=${weatherApiKey}&days=3`);
    
    const apiResponse = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${cityLat}&lon=${cityLon}&key=${weatherApiKey}&days=3`);
    console.log(apiResponse);

    const forecast = apiResponse.data.data.map((city) => {
        return new Forecast(city.datetime, city.weather.description);
    });
    console.log(forecast);
    response.json(forecast);
} catch (error) {
    console.error("Error receiving weather data:", error.message);
    return response.status(500).json({error: "Failed to receive weather data."});
}
});




app.use((error, request, response, next)=> {
    response.status(500).send(error.message);
});


app.listen(port, () => {
  console.log(`App listening on port 3300...`);
})