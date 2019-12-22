const request = require('request')
const forecast = (longitute,latitute,callback) => {

    const url = 'https://api.darksky.net/forecast/be4b337df011fa9e16af6360300b0707/' +  latitute + ',' +   longitute+ '?units=si&lang=en'
       
        request({ url, json: true }, (error, {body} = {}) => {
          console.log(body.daily)
          if (error) {
            callback('Unable to connect to weather service!',undefined);
          }
          else if ( body.error ){
            callback('Unable to find location',undefined);
          }
          else{              
              callback
              (
                  undefined,
                  body.daily.data[0].summary + " It is currently " + body.currently.temperature +" degrees out. There is " + (body.currently.precipProbability*100) + "% of rain." + 
                  'The tempature low for today was: ' + body.daily.data[0].temperatureLow + '. The temperature high today was: ' + body.daily.data[0].temperatureHigh + '.'
              )
          }
        })
  }

  module.exports = forecast
  