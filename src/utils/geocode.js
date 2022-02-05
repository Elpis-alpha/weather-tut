const axios = require('axios')

const geocode = (address, callback) => {

  const locationURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(address)}.json?access_token=pk.eyJ1IjoiZWxwaXMtYWxwaGEiLCJhIjoiY2t6Nzl6NWZ4MGp3bTJvczgyNXRhajQzciJ9.S6BFSqCcJ3OjrxnWWjQbSw&autocomplete=true`

  axios.get(locationURL)

    .then(response => {

      const locationData = response.data.features

      if (locationData.length > 0) {

        callback(undefined, {

          location: locationData[0].place_name,

          latitude: Math.floor(locationData[0].center[1]),

          longititude: Math.floor(locationData[0].center[0]),
        })

      } else {

        callback("Unable to find location", undefined);

      }


    })

    .catch(error => {

      callback("Unable to connect to the location service", undefined);

    })

}

module.exports = geocode