const express = require('express');
const bodyparser = require('body-parser');
const shops = require('./speedwayShops.json');
const inventory = require('./inventory.json');
const request = require('request');
const nearestshops = require('./locate.js');
const listeningPort = process.env.PORT || 3000;
const app = express();

app.use(bodyparser.json());
app.get('/', function (request, response) {
    response.send('The application is running and user Location is Set as NewYork Stock Exchange ');
});

app.post('/shops', function (request, response) {

     const a =request.body.inputs[0].rawInputs[0].query;
    if(a=="shops near me"){
        return response.send({fulfillmentText="success"});
    }
   
    
}); /// End of POST method


app.listen(listeningPort, function () {
    console.log('The application in Port ...' + listeningPort);
    console.log('Assumtion User location : NewYork Stock Exchange');
    console.log('The Nearest shop is' + nearestshops[0].title);
    console.log()
});
