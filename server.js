const express = require('express');
const bodyparser = require('body-parser');
const shops = require('./speedwayShops.json');
const inventory = require('./inventory.json');
const cookie = require('cookie-parser');
const session = require('express-session');
//const request = require('request');
const nearestshops = require('./locate.js');

//const sessionCartValues = require('./sessioncart.js');

const listeningPort = process.env.PORT || 3000;

const app = express();
app.use(session({ secret: "cart data" }));
app.use(bodyparser.json());
app.get('/', function (request, response) {
    response.send('The application is running and user Location is Set as NewYork Stock Exchange ');
});

app.post('/shops', function (request, response) {

    //const inputName=request.body.inputs.rawInputs.query;
    var arr = [];

    switch (request.body.queryResult.action) {


        case "action_search_shops":
            //// action_list_categories starts here

            var numberofobjects = Object.keys(shops.NewYork).length;

            var carouselData = [];
            var suggestionData = [];
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
                        "expectUserResponse": false,
                        "richResponse": {
                            "items": [
                                {
                                    "simpleResponse": {
                                        "textToSpeech": "I found few shops near you"
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
                            "key": inventory.Productcategories[x].productcategory,
                            "synonyms": inventory.Productcategories[x].productcategory
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
                                        "textToSpeech": "please select the category"
                                    }
                                }
                            ]
                        },
                        "systemIntent": {
                            "intent": "actions.intent.OPTION",
                            "data": {
                                "@type": "type.googleapis.com/google.actions.v2.OptionValueSpec",
                                "listSelect": {
                                    "title": "product categories",
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
                                "text": "1 Pkt" ///inventory.cooking_essentials[x].Quantity

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
                                        "textToSpeech": "please pick an item from this Menu"
                                    }
                                },
                                {
                                    "tableCard": {
                                        "title": "List of Products ",
                                        "subtitle": "",
                                        "image": {
                                            "url": inventory.Productcategories[1].url,
                                            "accessibilityText": "Products"
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
        case "action_navigate_order":

            const actionornavi = {
                "fulfillmentText": "Shops near you ",
                "fulfillmentMessages": [{ "simpleResponse": { "textToSpeech": "vijay it is working" } }],
                "source": "from webapi",
                "payload":
                    {
                        "google": {
                            "expectUserResponse": true,
                            "richResponse": {
                                "items": [
                                    {
                                        "simpleResponse": {
                                            "textToSpeech": "would you like to navigate to shop or Order Items ?"
                                        }
                                    }
                                ],
                                "suggestions": [
                                    {
                                        "title": "Order"
                                    },
                                    {
                                        "title": "Navigate"
                                    }

                                ]

                            }
                        }
                    }
            }
            return response.send(actionornavi);

            break;
        case "action_addproducttocart":
            var dataToWrite = {
                product: "salt",
                Quantity: "2"
            }
            dataToWrite = JSON.stringify(dataToWrite)
            fs.appendFile('C:/Users/543687/Desktop/DialogFlow/file.json', dataToWrite, { 'Content-Type': 'application/json' }, function (err) {
                if (err) throw err;
                console.log('Saved!');
            });

            break;
        case "action_navigationcard":
            var navcard = {
                "fulfillmentText": "Do you want to navigate to shop ?",
                "payload": {
                    "google": {
                        "expectUserResponse": true,
                        "richResponse": {
                            "items": [
                                {
                                    "simpleResponse": {
                                        "textToSpeech": "Navigate to Speed Way shop ?"
                                    }
                                },
                                {
                                    "basicCard": {
                                        "title": "Speed Way Brooklyn",
                                        "formattedText": "On clicking the below navigate button will open Google maps for navigation",
                                        "image": {
                                            "url": "https://maps.googleapis.com/maps/api/staticmap?center=Berkeley,CA&zoom=13&size=400x400&key=AIzaSyDIJ9XX2ZvRKCJcFRrl-lRanEtFUow4piM&signature=NZMTsRQ98_nbqv4GNcrJJwjZAKA=",
                                            "accessibilityText": "SpeedWay Shop"
                                        },
                                        "buttons": [
                                            {
                                                "title": "Navigate",
                                                "openUrlAction": {
                                                    "url": "https://www.google.co.in/maps/place/Speedway/@40.6482096,-73.9676652,13z/data=!4m8!1m2!2m1!1sspeedway+near+Brooklyn,+NY,+USA!3m4!1s0x89c25b3325fc81f7:0x6ec871478a5c22f6!8m2!3d40.6348639!4d-73.9678491"
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
            return response.send(navcard);
            break;

        case "action_cart":

        //getting ordered item from dialog flow
            var orderedItem = {
                itemName: request.body.queryResult.outputContexts[0].parameters.products,
                itemQuantity: request.body.queryResult.outputContexts[0].parameters.number
            }

        //calling dataMapping function from another file  
            var dataMapping= require('./sessioncart.js')
            dataMapping(orderedItem);
            
            var rowData = [
                {
                    "cells": [
                        {
                            "text": 'Salt'
                        },
                        {
                            "text": "2"

                        },
                        {
                            "text": "$6"

                        }

                    ],
                    "dividerAfter": true
                },
                {
                    "cells": [
                        {
                            "text": 'Oil'
                        },
                        {
                            "text": "1"

                        },
                        {
                            "text": "$4.5"

                        }

                    ],
                    "dividerAfter": true
                },
                {
                    "cells": [
                        {
                            "text": 'Total'
                        },
                        {
                            "text": "3"

                        },
                        {
                            "text": "$10.5"

                        }

                    ],
                    "dividerAfter": true
                }
            ];

            const cartFullfillmentResponse = {
                "fulfillmentText": "here the list of items in this shop",
                "payload": {
                    "google": {
                        "expectUserResponse": true,
                        "richResponse": {
                            "items": [
                                {
                                    "simpleResponse": {
                                        "textToSpeech": "Would you like to proceed ? "
                                    }
                                },
                                {
                                    "tableCard": {
                                        "title": "Your Cart ",
                                        "subtitle": "",
                                        "image": {
                                            "url": inventory.Productcategories[1].url,
                                            "accessibilityText": "Products"
                                        },
                                        "rows": rowData,
                                        "columnProperties": [
                                            {
                                                "header": "Product Name",
                                            },
                                            {
                                                "header": "Quantity",
                                            },
                                            {
                                                "header": "Total Price",
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

            return response.send(cartFullfillmentResponse);
            break;

        case "session_variable":


            arr.push(request.body.queryResult.outputContexts[0].parameters.number);
            //request.session[shops]=arr

            //   request.session.cookie = "username=John Doe; expires=Thu, 18 Dec 2013 12:00:00 UTC";

            request.session.cookie = "4"


            return response.send(request.session.cookie)

            break;


        default:
            /// Default case 
            break;
    } /// End of Switch Statement for ActionName

}); /// End of POST method

app.listen(listeningPort, function () {
    console.log('The application in Port ...' + listeningPort);
    console.log('Assumtion User location : NewYork Stock Exchange');
    console.log('The Nearest shop is' + nearestshops[0].title);
    console.log()
});
