const { createServer } = require('http')

const app = require('./app')
const PORT = process.env.PORT || 3000

module.exports = {
  start: () => {
    const expressApp = app.initial()
    const server = createServer(expressApp)
  
    server.listen(PORT, () => {
      console.log(`WOHOOO our server is running under port ${PORT}`)
    })
  },
}
