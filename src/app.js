const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//values provided by wrapper functionaround code
console.log(__dirname)
console.log(path.join(__dirname,'../public'))

const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath =  path.join(__dirname,'../templates/views')
const partialPath =  path.join(__dirname,'../templates/partials')

//set-up handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)

//customise the server set up static directory to serve 
app.use(express.static(publicDirectoryPath))

//routes and handlers using handelbars views
app.get('' , (req,res) => {
    res.render('index', {
       title : 'Weather',
       name : 'Damien Mc Gilloway'
    })
})

app.get('/about' , (req,res) => {
    res.render('about', {
      title : 'About Me',
      name : 'Damien Mc Gilloway'
  })
})

app.get('/help' , (req,res) => {
    res.render('help', {
      helpMessage : 'This a really useful help message.',
      title: 'Help',
      name: 'Damien Mc Gilloway'
    })
})

app.get('/weather', (req, res) => {
    //send something back to requestor
    if (!req.query.address){
      return res.send({
          error : 'You must enter an address to search on.'
      })
    }

    geocode(req.query.address, (error, {longitute,latitute,location} = {}) => {
      if (error !== undefined){
        return res.send({error})
      }
      
     forecast( longitute, latitute,(error, forecastData) => {
       if (error){
          return res.send({error})
       }
      
       res.send({
        forecast : forecastData,
        location,
        address : req.query.address
       })

     })
 
   });
});

//query string example
// app.get('/products',(req,res) => {
//     if (!req.query.search){
//        return res.send({
//          error : 'You must provide a search term'
//        })
//     }

//     console.log(req.query.search)
//     res.send({products: [] })

// })

app.get('/help/*',(req,res) => {
  res.render('404', {
    errorMessage : 'Help Article doesn\'t exist.',
    title: '404',
    name: 'Damien Mc Gilloway'
  })
})
//match anything that hasn't been matched in gets above
app.get('*', (req, res) => {
  res.render('404', {
    errorMessage : 'Page not found.',
    title: '404',
    name: 'Damien Mc Gilloway'
  })
});

//start the server up on specific port
app.listen(3000, () => {
  console.log('Server is up on port 3000.');
});
