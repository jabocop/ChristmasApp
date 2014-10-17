var express = require('express');
var jwt = require('jsonwebtoken');  //https://npmjs.org/package/node-jsonwebtoken
var expressJwt = require('express-jwt'); //https://npmjs.org/package/express-jwt
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');

mongoose.connect("localhost:27017/ChristmasApp");

var User = require('./Models/User');

var secret = 'this is the secret secret secret 12356';

var app = express();


/*User.create({
      name : 'abc',
      password : '123'
    },function (err,user) {
      if (err) {
        console.log("Failed to create user" + err);
      } else {
        console.log('User created');
      }
    });*/

// We are going to protect /api routes with JWT
app.use('/api', expressJwt({secret: secret}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', express.static(path.join(__dirname, '../FrontEnd')));

app.use(function(err, req, res, next){
  if (err.constructor.name === 'UnauthorizedError') {
    res.status(401).send('Unauthorized');
  }
});

app.post('/authenticate', function (req, res) {
  console.log('Call to /autheticate');
  //TODO validate req.body.username and req.body.password
  //if is invalid, return 401
  
  
  console.log('Loggining in user: ' + req.body.username);
  User.findOne({name:req.body.username}, function(err,user) {
      
      var userFound = true;
      
      if (err) {
        console.log(err);
        userFound = false
      } 
      if (!user) {
          console.log('Cant find user');
          userFound = false
      } else {
        console.log('User' + user)
      
        if (user.password !== req.body.password) {
           console.log('Wrong password');
           userFound = false
        }
      }

      if (userFound) {
        var profile = {
          first_name: user.Name,
          last_name: user.Name,
          email: user.Name,
          id: user._id
        }; 

        // We are sending the profile inside the token
        var token = jwt.sign(profile, secret, { expiresInMinutes: 60*5 });
      
        res.json({ token: token });
      } else {
          res.status(401).send('Unauthorized');
      }
      
  });

});


app.get('/api/restricted', function (req, res) {
  console.log('Call to /restricted');
  console.log('user ' + req.user.email + ' is calling /api/restricted');
  res.json({
    name: 'foo'
  });
});

app.get('*', function(req, res) {
		console.log('Call to *');
    res.sendFile(path.join(__dirname, '../FrontEnd', 'index.html'));		// load the single view file (angular will handle the page changes on the front-end)
	});

app.listen(8080, function () {
  console.log('listening on http://localhost:8080');
});