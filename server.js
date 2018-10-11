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

     var full = {
        "fulfillmentText": "here the list of shops",
        "fulfillmentMessages": [
        ],
        "payload": {
            "google": {
                "conversationToken": "",
                "expectUserResponse": true,
                "expectedInputs": [
                    {
                        "inputPrompt": {
                            "richInitialPrompt": {
                                "items": [
                                    {
                                        "simpleResponse": {
                                            "textToSpeech": "Howdy! I can tell you fun facts about almost any number like 0, 42, or 100. What number do you have in mind?",
                                            "displayText": request.body
                                        }
                                    }
                                ],
                                
                            }
                        },
                        "possibleIntents": [
                            {
                                "intent": "actions.intent.TEXT"
                            }
                        ]
                    }
                ]
            },
            "facebook": {
                "text": "Hello, Facebook!"
            }
        }

    }
 
    
return response.send(full);    
}); /// End of POST method


app.listen(listeningPort, function () {
    console.log('The application in Port ...' + listeningPort);
    console.log('Assumtion User location : NewYork Stock Exchange');
    console.log('The Nearest shop is' + nearestshops[0].title);
    console.log()
});
