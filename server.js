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

    switch (request.body.queryResult.action) {
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

            for (var x = 0; x < numberofobjects; x++) {
                carouselData.push(

                    {
                        "optionInfo": {
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
                                    "items": [
                                        {
                                            "optionInfo": {
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
    } /// End of Switch Statement
}); /// End of POST method



app.listen(listeningPort, function () {
    console.log('The application in Port ...' + listeningPort);
});
