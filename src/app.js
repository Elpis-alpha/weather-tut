const path = require('path')

const express = require('express')

const hbs = require('hbs')

const chalk = require('chalk')

const geocode = require('./utils/geocode')

const forecast = require('./utils/forecast')



const app = express()

const port = process.env.PORT || 3000

const publicPath = path.join(__dirname, '../public')

const viewsPath = path.join(__dirname, '../templates/views')

const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')

app.set('views', viewsPath)

app.use(express.static(publicPath))

hbs.registerPartials(partialsPath)

app.get('', (req, res) => {

  res.render('index', {
    title: 'Weather',
    name: 'Elpis',
  })

})


app.get('/about', (req, res) => {

  res.render('about', {
    title: 'About me',
    name: 'Elpis',
  })

})


app.get('/help', (req, res) => {

  res.render('help', {
    title: 'Help Page',
    name: 'Elpis',
    text: 'What do you need help on :)',
  })

})


app.get('/weather', (req, res) => {

  if (!req.query.address) {

    return res.send({
      error: "You must provide an address"
    })

  }

  geocode(req.query.address, (error, data) => {

    if (data) {

      const location = data.location

      forecast(data.latitude, data.longititude, (error, data) => {

        if (data) {

          return res.send({

            address: req.query.address,

            location,

            forecast: `We are reading a ${data.description}.Temperature is ${data.temperature} degree celcius and humidity is ${data.humidity}`

          })

        } else {

          return res.send({ error })

        }

      })

    } else {

      return res.send({ error })

    }

  })

})


app.get('/help/*', (req, res) => {

  res.render('gen_404', {
    error_text: 'Help Page not found'
  })

})


app.get('*', (req, res) => {

  res.render('gen_404', {
    error_text: 'Page not found'
  })

})


app.listen(port, () => {

  console.log(chalk.yellow('\n\n\nInitializing Server...'));

  console.log("Server started correctly on port " + port);

})
