require('dotenv').config()
const server = require('./server')
const db = require('./lib/db')

const port = process.env.PORT || 3000

db.sync().then(() => {
  server.listen(port, () => console.log(`API server started on ${port}`))
})
