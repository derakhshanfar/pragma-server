const getBeersController = require('./getBeersController')

module.exports = (dependencies) => {
  return {
    getBeersController: getBeersController(dependencies),
  }
}
