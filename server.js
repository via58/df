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
                                            "displayText": "Howdy! I can tell you fun facts about almost any number. What number do you have in mind?"
                                        }
                                    }
                                ],
                                "suggestions": [
                                    {
                                        "title": "0"
                                    },
                                    {
                                        "title": "42"
                                    },
                                    {
                                        "title": "100"
                                    },
                                    {
                                        "title": "Never mind"
                                    }
                                ]
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
                                            "displayText": "Howdy! I can tell you fun facts about almost any number. What number do you have in mind?"
                                        }
                                    }
                                ],
                                "suggestions": [
                                    {
                                        "title": "0"
                                    },
                                    {
                                        "title": "42"
                                    },
                                    {
                                        "title": "100"
                                    },
                                    {
                                        "title": "Never mind"
                                    }
                                ]
                            }
                        },
                        "possibleIntents": [
                            {
                                "intent": "actions.intent.TEXT"
                            }
                        ]
                    }
                ]
            }
        }

    }
 

//////////////
return response.send(full);
 });
    


app.listen(listeningPort,function(){
console.log('The application in Port ...'+ listeningPort);
});
