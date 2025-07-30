//Route for credential comparison
var express = require('express');
var router = express.Router();

router.post('/login',function(req,res){
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

module.exports = router;