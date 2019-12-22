const request = require("request");

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiZGFtaWVubWNnaWxsb3dheSIsImEiOiJjazRhaXFzYmYwNGIzM2xteHJmcmcwd2R5In0.i-2brc_Gh9-DUv5m1J_F0g&limit=1"
    
    request({ url, json: true }, (error, {body} = {}) => {
      if (error) {
        callback('Unable to connect to location servicses!',undefined)
      }
      else if (body.features.length === 0) {
        callback('Unable to find location! Try another search.',undefined);
      } else {
        const api_dets = body.features[0];
  
        callback(undefined,{
            longitute : api_dets.center[0],
            latitute :  api_dets.center[1],
            location :  api_dets.place_name
        })
      }
    })
  };

  module.exports = geocode
