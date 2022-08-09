const fetch = require('node-fetch')

module.exports = {
  get: (url) => {
    return fetch(url)
      .then((response) => response.json())
      .then((response) => response)
  },
}
