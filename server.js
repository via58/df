
const express = require('express');
const bodyparser = require('body-parser');
const shops = require('./speedwayShops.json');
const inventory = require('./inventory.json');
const request = require('request');

const listeningPort = process.env.PORT || 3000;

const app = express();

app.use(bodyparser.json());
app.get('/', function (request, response) {
    response.send('The application is running');
});

app.post('/shops', function (request, response) {

    if (request.body.queryResult.action == "action_list_Items") {

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
                                            "horizontalAlignment": "CENTER"
                                        },
                                        {
                                            "header": "Quantity",
                                            "horizontalAlignment": "LEADING"
                                        },
                                        {
                                            "header": "Price",
                                            "horizontalAlignment": "TRAILING"
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
    }

    else if(request.body.queryResult.action == "action_search_shops") {
        const shopname = "Speedway Brooklyn 11207"
        const filteredList = shops.NewYork.filter(function (title) {
            return title.shopname == shopname;
        });
        const all = shops.NewYork.filter(function (title) {
            return title;
        });
        var numberofobjects = Object.keys(shops.NewYork).length;

        var loop = [];
        for (var x = 0; x < numberofobjects; x++) {
            loop.push(
                {
                    "card": {
                        "title": all[x].shopname,
                        "address": all[x].shopname,
                        "imageUri": "https://assistant.google.com/static/images/molecule/Molecule-Formation-stop.png"

                    }
                }


            );
        }
          var full= {
  "expectUserResponse": true,
  "expectedInputs": [
    {
      "inputPrompt": {
        "richInitialPrompt": {
          "items": [
            {
              "simpleResponse": {
                "textToSpeech": "This is a simple response for a list."
              }
            }
          ],
          "suggestions": [
            {
              "title": "Basic Card"
            },
            {
              "title": "Browse Carousel"
            },
            {
              "title": "Carousel"
            },
            {
              "title": "List"
            },
            {
              "title": "Media"
            },
            {
              "title": "Suggestions"
            }
          ]
        }
      },
      "possibleIntents": [
        {
          "intent": "actions.intent.OPTION",
          "inputValueData": {
            "listSelect": {
              "title": "List Title",
              "items": [
                {
                  "image": {
                    "accessibilityText": "Image alternate text",
                    "url": "https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png"
                  },
                  "optionInfo": {
                    "synonyms": [
                      "synonym of title 1",
                      "synonym of title 2",
                      "synonym of title 3"
                    ],
                    "key": "title"
                  },
                  "description": "This is a description of a list item.",
                  "title": "Title of First List Item"
                },
                {
                  "image": {
                    "accessibilityText": "Google Home",
                    "url": "https://lh3.googleusercontent.com/Nu3a6F80WfixUqf_ec_vgXy_c0-0r4VLJRXjVFF_X_CIilEu8B9fT35qyTEj_PEsKw"
                  },
                  "optionInfo": {
                    "synonyms": [
                      "Google Home Assistant",
                      "Assistant on the Google Home"
                    ],
                    "key": "Speed way shop 1"
                  },
                  "description": "Google Home is a voice-activated speaker powered by the Google Assistant.",
                  "title": "Google Home"
                },
                {
                  "image": {
                    "accessibilityText": "Google Pixel",
                    "url": "https://storage.googleapis.com/madebygoog/v1/Pixel/Pixel_ColorPicker/Pixel_Device_Angled_Black-720w.png"
                  },
                  "optionInfo": {
                    "synonyms": [
                      "Google Pixel XL",
                      "Pixel",
                      "Pixel XL"
                    ],
                    "key": "speed Way shop 2"
                  },
                  "description": "Pixel. Phone by Google.",
                  "title": "Google Pixel"
                },
                {
                  "image": {
                    "accessibilityText": "Google Allo Logo",
                    "url": "https://allo.google.com/images/allo-logo.png"
                  },
                  "optionInfo": {
                    "synonyms": [
                      "Allo"
                    ],
                    "key": "Speed Way shop 4"
                  },
                  "description": "Introducing Google Allo, a smart messaging app that helps you say more and do more.",
                  "title": "Google Allo"
                }
              ]
            },
            "@type": "type.googleapis.com/google.actions.v2.OptionValueSpec"
          }
        }
      ]
    }
  ],
  "responseMetadata": {
    "status": {
      "message": "Success (200)"
    },
    "queryMatchInfo": {
      "queryMatched": true,
      "intent": "16fdf55a-d1d6-48a8-8909-8b9e1f023fac"
    }
  },
  "userStorage": "{\"data\":{}}"
}

        return response.send(full);
    }
    return response.send("The application is excited");
});



app.listen(listeningPort, function () {
    console.log('The application in Port ...' + listeningPort);
});

