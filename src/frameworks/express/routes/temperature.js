const express = require('express')

const { beerControllers } = require('../../../controllers')
const adaptRequest = require('../../common/adaptRequest')

module.exports = (dependencies) => {
  const router = express.Router()
  const { getBeersController } = beerControllers(dependencies)

  // this should be a factory and be in the common folder
  const routeHandler = (controllerHandler) => {
    return (req, res) => {
      const httpRequest = adaptRequest(req)
      controllerHandler(httpRequest)
        .then((httpResponse) => {
          if (httpResponse.headers) {
            res.set(httpResponse.headers)
          }
          res.status(httpResponse.statusCode).send(httpResponse.body)
        })
        .catch((err) => {
          console.log(err)
          res.status(500).json({ error: 'An unkown error occurred.' })
        })
    }
  }

  router.route('/').get(routeHandler(getBeersController))

  return router
}
