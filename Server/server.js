var express = require('express');
var jwt = require('jsonwebtoken');  //https://npmjs.org/package/node-jsonwebtoken
var expressJwt = require('express-jwt'); //https://npmjs.org/package/express-jwt
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');


//Environment veriables is set by SET ENV_SECRET="DUMMY"
var mongoConnection = process.env.ENV_MONGODB
if (!mongoConnection) {
    //Use the dummy secret if no other secret is set.
    mongoConnection = "localhost:27017/ChristmasApp";
}




mongoose.connect(mongoConnection);

var User = require('./Models/User');
var Wish = require('./Models/Wish');
var Group = require('./Models/Group');

var app = express();





/*
User.create({
      email : 'test@testapa',
      name: 'TestAPA',
      password : '123'
    },function (err,user) {
      if (err) {
        console.log("Failed to create user" + err);
      } else {
          console.log('User created');
          Wish.create({
              name: 'Name',
              comment: 'Comment',
              url: 'www.google.com',
              userId: user._id
          }, function(err, wish) {
              if (err) {
                  console.log("Failed to create wish. Message: " + err);
              } else {
                  console.log('Wish created' + wish);
              }
          });
        
      }
    });
*/


//Environment veriables is set by SET ENV_SECRET="DUMMY"
var secret = process.env.ENV_SECRET
if (!secret) {
    //Use the dummy secret if no other secret is set.
    secret = 'this is the secret secret secret 12356';
}//Environment veriables is set by SET ENV_SECRET="DUMMY"
var secret = process.env.ENV_SECRET
if (!secret) {
    //Use the dummy secret if no other secret is set.
    secret = 'this is the secret secret secret 12356';
}
    


// We are going to protect /api routes with JWT
app.use('/api', expressJwt({secret: secret}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', express.static(path.join(__dirname, '../FrontEnd')));

app.use(function (err, req, res, next) {
    if (err.constructor.name === 'UnauthorizedError') {
        res.status(401).send('Unauthorized');
    }
});


    




app.get('/api/restricted', function (req, res) {
    console.log('Call to /restricted');
    console.log('user ' + req.user.email + ' is calling /api/restricted');
    res.json({
        name: 'foo'
    });
});

app.get('/', function (req, res) {
    console.log('Call to *');
    res.sendFile(path.join(__dirname, '../FrontEnd', 'index.html')); // load the single view file (angular will handle the page changes on the front-end)
});

var wishController = require('./controllers/wish');
wishController.set(app);

var userController = require('./controllers/user');
userController.set(app,secret);

var groupController = require('./controllers/group');
groupController.set(app);

app.set('port', (process.env.PORT || 5000))

app.listen(app.get('port'), function () {
    console.log("Node app is running at localhost:" + app.get('port'))
});