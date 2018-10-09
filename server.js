const express=require('express');
const bodyparser= require('body-parser');
const shops=require('./speedwayShops.json');
const request=require('request');

const listeningPort = process.env.PORT || 3000;

const app = express();

app.use(bodyparser.json());
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
          "address": all[x].shopname,
          "imageUri": "https://assistant.google.com/static/images/molecule/Molecule-Formation-stop.png"
          
        }
    }        
 );
}
 
///////
 
var full = {
    "fulfillmentText": "Shops near you ",
    "fulfillmentMessages": [{ "simpleResponse": { "textToSpeech": "vijay it is working" } }],
    "source": "from webapi",
    "payload": {
        "google": {
            "expectUserResponse": true,
            "richResponse": {
                "carouselSelect": {
                    "items": [
                                { "optionInfo": {
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
                                {"optionInfo": {
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
                                }
                             ]}
            }
        }
    }
}

//////////////
return response.send(full);
 });
    


app.listen(listeningPort,function(){
console.log('The application in Port ...'+ listeningPort);
});
