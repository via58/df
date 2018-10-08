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
              "rows": [
                {
                  "cells": [
                    {
                      "text": "row 1 item 1"
                    },
                    {
                      "text": "row 1 item 2"
                    },
                    {
                      "text": "row 1 item 3"
                    }
                  ],
                  "dividerAfter": true
                },
                {
                  "cells": [
                    {
                      "text": "row 2 item 1"
                    },
                    {
                      "text": "row 2 item 2"
                    },
                    {
                      "text": "row 2 item 3"
                    }
                  ],
                  "dividerAfter": true
                }
              ],
              "columnProperties": [
                {
                  "header": "header 1"
                },
                {
                  "header": "header 2"
                },
                {
                  "header": "header 3"
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

 

//////////////
return response.send(full);
 });
    


app.listen(listeningPort,function(){
console.log('The application in Port ...'+ listeningPort);
});
