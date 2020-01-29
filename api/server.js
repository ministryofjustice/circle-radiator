const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const apiroutes = require('./api_routes')

const app = express()
const port = 3030

const url = 'mongodb://127.0.0.1:27017/circle'

app.use(cors())
app.use(express.json())
app.use(apiroutes)

mongoose.set('useFindAndModify', false)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(port)
    console.info(`Radiator app listening on port ${port}.`)
  })
  .catch(err => console.error(err))
