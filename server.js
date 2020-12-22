//Import packages
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config()

//Configures the app to use body-parser and transform req in JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, Accept");
	//Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    next();
})

//Mongo Connection
const connectionString = process.env.CONNECTION_URL;
mongoose.connect(connectionString,  {useNewUrlParser:true, useUnifiedTopology: true, useFindAndModify: false});

//Define the app port
const port = process.env.PORT || 3000;

//Define the Routes
const router = express.Router();//intercept all routes
const portfolioRoute = require('./src/routes/portfolio-route');

//Link the app with the routes 
//portfolio route
app.use('/api/portfolio/', portfolioRoute);

app.listen(port, () => {
    console.log("server is up and running...on port ", port);
});