const express = require('express')
const temperatureRouter = require('./temperature')

module.exports = (dependencies) => {
  const routes = express.Router()

  const beers = temperatureRouter(dependencies)

  routes.use('/beers', beers)

  return routes
}
