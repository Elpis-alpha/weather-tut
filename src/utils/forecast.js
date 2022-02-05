const axios = require('axios')

const forecast = (latitude, longititude, callback) => {

  const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longititude}&appid=6b8802fe254602a214508542c2b91740`

  axios.get(weatherURL)

    .then(response => {

      const weatherData = response.data

      callback(undefined, {

        temperature: Math.floor(weatherData.main.temp - 273),

        description: weatherData.weather[0].description,

        windSpeed: weatherData.wind.speed,

        humidity: weatherData.main.humidity,

        name: weatherData.name,

      })

    })

    .catch(error => {

      callback("Unable to connect to the weather service", undefined);

    })

}

module.exports = forecast