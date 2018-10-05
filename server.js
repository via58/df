const express=require('express');
const bodyparser= require('body-parser');
const shops=require('./speedwayShops.json');
const request=require('request');

const shivaport = process.env.PORT || 3000;

const app = express();

app.get('/',function(request,response){
response.send('The application is running');
});




app.post('/shops',function(request,response){
 
    const shopname="Speedway Brooklyn 11207"
    const filteredList = shops.NewYork.filter(function(title) {
        return title.shopname==shopname;
      });
     const all = shops.NewYork.filter(function(title) {
        return title;
      });  
      var numberofobjects=Object.keys(shops.NewYork).length;   

var loop = [];

for(var x = 0; x < numberofobjects; x++){
 loop.push(
    {
        "card": {
          "title": all[x].shopname,
          "address": all[x].address,
          "imageUri": "https://assistant.google.com/static/images/molecule/Molecule-Formation-stop.png"
          
        }
    }
      
    
 );
}

 var full={
    "fulfillmentText": "This is a text response",
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
      "expectedInputs": [
        {
            "inputPrompt": {
                "initialPrompts": [
                    {
                        "textToSpeech": "Alright! Here are a few things you can learn. Which sounds interesting?"
                    }
                ],
                "noInputPrompts": []
            },
            "possibleIntents": [
                {
                    
                    "inputValueData": {
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
            ]
        }
    ]
    },
    "facebook": {
      "text": "Hello, Facebook!"
    },
    "slack": {
      "text": "This is a text response for Slack."
    }
  }

}



          
    return response.send(full);



 });
    


app.listen(shivaport,function(){
console.log('The application in Port ...'+ shivaport);
});
