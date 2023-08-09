const express = require('express')
const cors = require("cors");

const app = express();
app.use(cors());

require("dotenv").config();
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
    try {
        let weather = data.find((city) => city.city_Name === request.query.searchQuery);
    if(weather) {
        let dates = weather.data.map((day) => {
            let forecast = new Forecast(day.valid_date, day.weather.description);
            
            return forecast;
        })
        response.send(dates);
    } else {
        response.status(404).send({error: "City not found"});
    } 
    } catch (error) {
        response.status(500).send({error: "An error has occurred"});
    }
});





app.use((error, request, response, next)=> {
    response.status(500).send(error.message);
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})