// require("dotenv").config();

const express = require('express')

const app = express()
const helmet = require('helmet')
const routes = require('./frameworks/express/routes')

const API_PREFIX = process.env.API_PREFIX || '/api/v1'

const dependencies = require('./config/dependencies')

module.exports = {
  initial: () => {
    // Midlewares
    app.use(helmet());
    app.use(express.json())
    app.use(
      express.urlencoded({
        extended: true,
      })
    )

    // Routes
    app.use(API_PREFIX, routes(dependencies))

    return app
  },
}
