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
     
      var resultObject={
        speech:filteredList[0].shopname,
        displayText:filteredList[0].shopname,
        resourse:'simpleresponse'
      }
    
    return response.json(resultObject);


 });
    


app.listen(shivaport,function(){
console.log('The application in Port ...'+ shivaport);
});
