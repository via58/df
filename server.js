const express = require('express');
const bodyparser = require('body-parser');
const shops = require('./speedwayShops.json');
const inventory = require('./inventory.json');
const request = require('request');

const shivaport = process.env.PORT || 3000;

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

    else {

        const shopname = "Speedway Brooklyn 11207"
        const filteredList = shops.NewYork.filter(function (title) {
            return title.shopname == shopname;
        });

        const all = shops.NewYork.filter(function (title) {
            return title;
        });
        var numberofobjects = Object.keys(shops.NewYork).length;

        var loop = [];

        // var jsonobject=JSON.parse(shops.NewYork);

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
        //var loopobject=JSON.parse(loop);

        //   var full={
        //     "fulfillmentMessages": [
        //         {
        //           "card": {
        //             "title": filteredList[0].shopname,
        //             "subtitle": "sample title from service",
        //             "imageUri": "https://assistant.google.com/static/images/molecule/Molecule-Formation-stop.png",
        //             "buttons": [
        //               {
        //                 "text": "button text",
        //                 "postback": "https://assistant.google.com/"
        //               }
        //             ]
        //           }
        //         }
        //       ]}
        //     var full={
        //     "fulfillmentMessages": loop}








        //delete

        var full = {
            "fulfillmentText": "here the list of shops",
            "fulfillmentMessages": [
                {
                    "card": {
                        "title": filteredList[0].shopname,
                        "subtitle": "sample title from service",
                        "imageUri": "https://assistant.google.com/static/images/molecule/Molecule-Formation-stop.png",
                        "buttons": [
                            {
                                "text": "button text",
                                "postback": "https://assistant.google.com/"
                            }
                        ]
                    }
                }
            ],
            "payload": {
                "google": {
                    "expectUserResponse": true,
                    "richResponse": {
                        "items": {
                            "carouselSelect": {
                                "items": [

                                    {
                                        "info": {
                                            "key": "MATH_AND_PRIME",
                                            "synonyms": [
                                                "math",
                                                "math and prime",
                                                "prime numbers",
                                                "prime"
                                            ]
                                        },
                                        "title": "Math & prime numbers",
                                        "description": "42 is an abundant number because the sum of its proper divisors 54 is greater…",
                                        "image": {
                                            "url": "http://example.com/math_and_prime.jpg",
                                            "accessibilityText": "Math & prime numbers"
                                        }


                                    },
                                    {
                                        "optionInfo": {
                                            "key": "EGYPT",
                                            "synonyms": [
                                                "religion",
                                                "egpyt",
                                                "ancient egyptian"
                                            ]
                                        },
                                        "title": "Ancient Egyptian religion",
                                        "description": "42 gods who ruled on the fate of the dead in the afterworld. Throughout the under…",
                                        "image": {
                                            "url": "http://example.com/egypt",
                                            "accessibilityText": "Egypt"
                                        }
                                    },
                                    {
                                        "optionInfo": {
                                            "key": "RECIPES",
                                            "synonyms": [
                                                "recipes",
                                                "recipe",
                                                "42 recipes"
                                            ]
                                        },
                                        "title": "42 recipes with 42 ingredients",
                                        "description": "Here's a beautifully simple recipe that's full of flavor! All you need is some ginger and…",
                                        "image": {
                                            "url": "http://example.com/recipe",
                                            "accessibilityText": "Recipe"
                                        }
                                    }
                                ]
                            }

                        }
                    }
                }
            }

        }





        return response.send(full);
    }
});



app.listen(shivaport, function () {
    console.log('The application in Port ...' + shivaport);
});
