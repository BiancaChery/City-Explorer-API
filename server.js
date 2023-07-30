let express = require('express')
data = require("./data/weather.json")

let app = express()
let port = 3300

class Weather {
    constructor(weatherObj) {
        this.city_Name = weatherObj.city_Name;
    }
}

app.get('/', (request, response) => {
  response.send('Welcome To The Weather!')
})

app.get('/weather', (request, response) => {
    let weatherState = request. query.weatherState;
    let infoOfState = data
    let cityName = request.query.city_Name;
    
    let weather = data.find((w) => w.city_Name === cityName)
    if(weather) {
        response.status(200).send(new Weather(weather));
    } else {
        response.status(404).send(
            {
                error: "City not found"
            }
        );
    }
})








app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

