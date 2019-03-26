const express = require('express');
const app = express();
const router = require("express").Router();
require('dotenv').config()
const bodyParser = require('body-parser');
const path = require('path')
const port =  5693
const mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.connect(process.env.DATABASE_URL, {
    // mongodb://localhost:27017/registration   
    useNewUrlParser: true
})

process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination')
        process.exit(0)
    })
})


/////needed to get the data into the req.body

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
/////////end of req.body///////////////////////

app.use(
    "/public",
    express.static(path.join(__dirname, "public"), {
        fallthrough: false
    })
);

app.use(require('./public/routes/index'));


app.listen(port, () => {
    console.log(`Magic Happens @ ${port}`);
})

module.exports = router