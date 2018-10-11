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

const actionName=request.body.queryResult.action;
//const inputName=request.body.inputs.rawInputs.query;

    switch (actionName) {
        case "action_list_products":
            ///actions list items starts here

            var numberofobjects = Object.keys(inventory.cooking_essentials).length;
            var rowData = [];
            for (var x = 0; x < numberofobjects; x++) {
                rowData.push(
                    {
                        "cells": [
                            {
                                "text": inventory.cooking_essentials[x].Productname
                            },
                            {
                                "text": inventory.cooking_essentials[x].Price

                            },
                            {
                                "buttons": [{
                                    "text": "Add",
                                    "postback": ""
                                }]
                            }
                        ],
                        "dividerAfter": true
                    }
                );
            }
            const fullfilmentResponse = {
                "fulfillmentText": "here the list of items in this shop",
                "payload": {
                    "google": {
                        "expectUserResponse": true,
                        "richResponse": {
                            "items": [
                                {
                                    "simpleResponse": {
                                        "textToSpeech": "Simple Response"
                                    }
                                },
                                {
                                    "tableCard": {
                                        "title": "List of Products ",
                                        "subtitle": "",
                                        "image": {
                                            "url": "https://avatars0.githubusercontent.com/u/23533486",
                                            "accessibilityText": "Actions on Google"
                                        },
                                        "rows": rowData,
                                        "columnProperties": [
                                            {
                                                "header": "Product Name",
                                            },
                                            {
                                                "header": "Price",
                                            },
                                            {
                                                "header": "Quantity",
                                            }
                                        ],
                                        "buttons": [
                                            {
                                                "title": "Check out",
                                                "openUrlAction": {
                                                    "url": "https://github.com/actions-on-google"
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        "userStorage": "{\"data\":{}}"
                    }
                }

            }

            return response.send(fullfilmentResponse);

            break;

        /////End here 


        case "action_search_shops":
            //// action_list_categories starts here

            var numberofobjects = Object.keys(shops.NewYork).length;

            var carouselData = [];

            // var jsonobject=JSON.parse(shops.NewYork);

            for (var x = 0; x < 3; x++) {          /// Default you change the number of response
                carouselData.push(
                    {
                        "optionInfo": {
                            "key": nearestshops[x].optionInfo.key,
                            "synonyms": nearestshops[x].optionInfo.synonyms
                        },
                        "title": nearestshops[x].title,
                        "description": nearestshops[x].description,
                        "image": {
                            "url": nearestshops[x].image.url,
                            "accessibilityText": nearestshops[x].image.accessibilityText
                        }
                    }

                );
            }

            var carouselFullfillment = {
                "payload": {
                    "google": {
                        "expectUserResponse": true,
                        "richResponse": {
                            "items": [
                                {
                                    "simpleResponse": {
                                        "textToSpeech": "Choose a item"
                                    }
                                }
                            ]
                        },
                        "systemIntent": {
                            "intent": "actions.intent.OPTION",
                            "data": {
                                "@type": "type.googleapis.com/google.actions.v2.OptionValueSpec",
                                "carouselSelect": {
                                    "items": carouselData
                                }
                            }
                        }
                    }
                }
            }

            return response.send(carouselFullfillment);


            ////Ends
            break;

        case "action_list_categories":
            //// action_list_categories starts here
            var numberofobjects = Object.keys(inventory.Productcategories).length;
            var listData = [];

            for (var x = 0; x < numberofobjects; x++) {
                listData.push(
                    {
                        "optionInfo": {
                            "key": "ListKey_" + x
                        },
                        "description": inventory.Productcategories[x].description,
                        "image": {
                            "url": inventory.Productcategories[x].url,
                            "accessibilityText": inventory.Productcategories[x].productcategory
                        },
                        "title": inventory.Productcategories[x].productcategory
                    }
                );
            }



            var listFullfillment = {
                "payload": {
                    "google": {
                        "expectUserResponse": true,
                        "richResponse": {
                            "items": [
                                {
                                    "simpleResponse": {
                                        "textToSpeech": "Choose a item"
                                    }
                                }
                            ]
                        },
                        "systemIntent": {
                            "intent": "actions.intent.OPTION",
                            "data": {
                                "@type": "type.googleapis.com/google.actions.v2.OptionValueSpec",
                                "listSelect": {
                                    "title": "Please select the category",
                                    "items": listData
                                }
                            }
                        }
                    }
                }
            }

            return response.send(listFullfillment);
            ////Ends here
            break;

        default:
            /// Default case 
            break;
    } /// End of Switch Statement for ActionName

if(request.body.queryResult.queryText=="actions_intent_OPTION"){

var jagadeesh={
  "payload": {
    "google": {
      "expectUserResponse": true,
      "richResponse": {
        "items": [
          {
            "simpleResponse": {
              "textToSpeech": "this is a simple response from jaga"
            }
          }
        ]
      }
    }
  }
}
    return response.send(jagadeesh);
}

 const shopname = "Speedway Brooklyn 11207"
     list = nearestshops.filter(function (callback) {
        return callback.title == shopname;
    });









}); /// End of POST method


app.listen(listeningPort, function () {
    console.log('The application in Port ...' + listeningPort);
    console.log('Assumtion User location : NewYork Stock Exchange');
    console.log('The Nearest shop is' + nearestshops[0].title);
    console.log()
});
