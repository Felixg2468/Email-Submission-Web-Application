const express = require('express');
const app = express();
var bodyParser = require( 'body-parser' );
const fs = require('fs')

app.use(bodyParser.urlencoded( { extended: true } ));
app.use(bodyParser.json());



app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');

});
app.post('/submit', function(req, res){
  const email = req.body.email
  let str = "" + email; 
  fs.appendFile('emails.txt', str,  function (err) {  
    if (err) throw err;
  });
    
    res.send("Thanks " + email + " for submitting your form!" + "<p>View the list of emails: </p> <a href='/admin'>/admin</a>");

});
app.get('/admin', function(req, res){
  const readData = fs.readFileSync('emails.txt');
  res.send(readData.toString());
  
});
fs.truncateSync('emails.txt'); //reset the emails.txt list so its not filled with a bunch of emails that i tested.

app.listen(8080);