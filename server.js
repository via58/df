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
      "richResponse": {
        "items": [
         {
                        "simpleResponse":{
                            "textToSpeech":"Welcome to this Basic Card",
                            "displayText":"Welcome to this Basic Card"
                        }
                    },
      {
        "description": "Option One Description",
        "image": {
          "url": "http://imageOneUrl.com",
          "accessibilityText": "Image description for screen readers"
        },
        "optionInfo": {
          "key": "itemOne",
          "synonyms": [
            "thing one",
            "object one"
          ]
        },
        "title": "Option One Title"
      },
      {
        "description": "Option Two Description",
        "image": {
          "url": "http://imageTwoUrl.com",
          "accessibilityText": "Image description for screen readers"
        },
        "optionInfo": {
          "key": "itemTwo",
          "synonyms": [
            "thing two",
            "object two"
          ]
        },
        "title": "Option Two Title"
      }
    ],
    "platform": "google",
    "type": "carousel_card"
      }
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
