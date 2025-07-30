/*
var express = require('express');  //used for routing
var app = express();
var http = require('http').Server(app); //used to provide http functionality
app.use(express.static(__dirname + '/www')); 

let server = http.listen(3000, function(){
    let host = server.address().address;
    let port = server.address().port;
    console.log("My First Nodejs Server!");
    console.log("Server listening on:"+host+"port:"+port);
});

app.get('/test', function(req, res){
    res.sendFile(__dirname+'/www/test.html');
});
*/

var express = require('express');  //used for routing
var app = express();

var bodyParser = require('body-parser'); //create an instance of a body-parser

app.use(bodyParser.json());

// Move the app.use(express.static(...)) below your app.get('/') route, or else index.html will load, which was the first part of the workshop
//app.use(express.static(__dirname + '/www')); 

app.listen(3000,()=>{
    var d = new Date();
    var n = d.getHours();
    var m = d.getMinutes();
    console.log('Server has been started at : ' + n + ':' + m);
});

//Route for Form
app.get('/',function(req,res){
    res.sendFile(__dirname + '/www/form.html');
});


app.use(express.static(__dirname + '/www'));

//Route for credential comparison
app.post('/api/login',function(req,res){
    let users = [{'email':'abc@com.au', 'pwd':'123'},{'email':'abd@com.au', 'pwd':'123'},{'email':'abe@com.au', 'pwd':'123'}];

    if(!req.body){
        return res.sendStatus(400);
    }

    var customer = {}; //create a new customer object that can be sent back as a response
    customer.email = req.body.email; //add in the value of the typed email
    customer.upwd = req.body.upwd; //add in the value of the typed password. Not a good practice though
    customer.valid = false; //set to false by default
    for (let i=0;i<users.length;i++){ //loop over each of the users to test for a match. This would be better done with a database
        if (req.body.email == users[i].email && req.body.upwd == users[i].pwd){
            customer.valid = true;
        }

    }
    res.send(customer);

});


