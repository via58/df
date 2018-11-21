
var firebase = require('firebase');
//var orderedItem = require('./app.js')
firebase.initializeApp({
    serviceAccount: "./Via58-2a6c82497ab2.json",
    databaseURL: "https://via58-aef09.firebaseio.com/"
});
var database = firebase.database();
var messageRef = database.ref('scores');

var dataFromServer = {
    itemName:null,
    itemQuantity:null
}
//var messageRef=ref.child('via58-aef09')

function dataMapping(dataFromServer) {

    dataToFiresBase = {
        productname: dataFromServer.itemName[0],
        quantity: dataFromServer.itemQuantity[0]
    }
    messageRef.push(dataToFiresBase);
    console.log('Entered into sessioncart');
    console.log(dataFromServer);
 return "created"
}

module.exports= dataMapping;


//get

//messageRef.on('value',gotdata)

 function gotdata(data) {
    var values = data.val();
    var keys = Object.keys(values)

    for (var i = 0; i < keys.length; i++) {

        var k = keys[i];
        var initials = values[k];
        console.log(initials.name + ' ' + initials.number)
    }





}
//messageRef.remove()
//console.log("deleted");


//console.log(firebase);










