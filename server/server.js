
const express = require('express')
const app = express()
 const api = require('./routes/Api')
const bodyParser = require('body-parser')
const path = require(`path`)
const port = 3000



app.use(express.static(path.join(__dirname, '..', 'dist')))
app.use(express.static(path.join(__dirname, '..', 'node_modules')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use( '/', api )

const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost/weatherdb", { useNewUrlParser: true})





app.listen(port, function () {
    console.log(`Running on port ${port}`)
})

