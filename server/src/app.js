const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const { sequelize } = require('./models')
const app = express()
const config = require('./config/config')

// express middleware
app.use(morgan('combined'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

// setup router
const router = express.Router()
app.use('/api', require('./routes')(router))

sequelize.sync()
  .then(() => {
    app.listen(config.port)
    console.log('Server running on port: ' + config.port)
  })
