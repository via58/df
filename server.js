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
var full= {
  "fulfillmentText":"Shops near you ",
  "fulfillmentMessages": [{"simpleResponse": {"textToSpeech": "vijay it is working"}}],
  "source":"from webapi",
  "payload":
  {  
    "google": {
    "expectUserResponse": true,
    "richResponse": {
      "items": [
        {
          "simpleResponse": {
            "textToSpeech": "this is a simple response from vijay"
                            }
        }
      ]
    }
  }
}
}

return response.send(full);
 });
    


app.listen(listeningPort,function(){
console.log('The application in Port ...'+ listeningPort);
});
