var express = require('express');
var jwt = require('jsonwebtoken');  //https://npmjs.org/package/node-jsonwebtoken
var expressJwt = require('express-jwt'); //https://npmjs.org/package/express-jwt
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');

mongoose.connect("localhost:27017/ChristmasApp");

var User = require('./Models/User');
var Wish = require('./Models/Wish');
var Group = require('./Models/Group');

var secret = 'this is the secret secret secret 12356';

var app = express();

/*
User.create({
      email : 'test@testapa',
      firstname: 'TestAPA',
      lastname: 'BC',
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

app.post('/authenticate', function (req, res) {
    console.log('Call to /autheticate');
    //if is invalid, return 401
    console.log('Loggining in user: ' + req.body.email);
    User.findOne({
        email: req.body.email
    }, function (err, user) {
        var userFound = true;
        if (err) {
            console.log(err);
            userFound = false;
        }
        if (!user) {
            console.log('Cant find user');
            userFound = false;
        } else {
            console.log('User' + user);

            if (user.password !== req.body.password) {
                console.log('Wrong password');
                userFound = false;
            }
        }

        if (userFound) {
            // We are sending the profile inside the token
            var token = jwt.sign(user, secret, {
                expiresInMinutes: 60 * 5
            });
            res.json({
                token: token,
                user: user
            });
        } else {
            res.status(401).send('Unauthorized');
        }

    });

});

app.post('/newUser', function (req, res) {
    console.log('Call to /newUser');
    User.create({
        email: req.body.email,
        firstname: req.body.firstName,
        lastname: req.body.lastName,
        password: req.body.password
    }, function (err, user) {
        if (err) {
            console.log("Failed to create user" + err);
        } else {
            console.log('User created. User:' + user);
            res.json({
                User: user
            });
        }
    });
});

app.post('/newWish', function (req, res) {
    console.log('Call to /newWish');
    var wish = {
        name: req.body.name,
        comment: req.body.comment,
        url: req.body.url,
        userId: req.body.userId
    };
    Wish.create(wish, function (err, wish) {
        if (err) {
            console.log("Failed to create wish" + err);
        } else {
            console.log('Wish created. Wish:' + wish);
            res.json({
                Wish: wish
            });
        }
    });
});

app.post('/deleteWish', function (req, res) {
    console.log('Call to /deleteWish with id: ' + req.body._id);
    Wish.remove({
        _id: req.body._id
    }, function (err) {
        if (!err) {
            console.log('Wish removed');
            //return empty
            res.json({});
        } else {
            console.log("Error occured. Message : " + err);
        }
    });
});

app.post('/saveWish', function (req, res) {
    console.log('Call  to /saveWish');
    var wish = {
        name: req.body.name,
        comment: req.body.comment,
        url: req.body.url,
        userId: req.body.userId
    };
    Wish.update({
        _id: req.body._id
    }, wish, {
        upsert: true
    }, function (err) {
        if (!err) {
            console.log('Wish saved');
            res.json({
                Wish: wish
            });
        } else {
            console.log("Error occured. Message : " + err);
        }
    });
});


app.get('/listWishes', function (req, res) {
    console.log('Call to /listWishes');
    console.log('UserId:' + req.param('userId'));
    Wish.find({
        userId: req.param('userId')
    }, function (err, wishes) {
        if (!err) {
            console.log(wishes);
            res.json(wishes);
        } else {
            console.log("Error occured. Message : " + err);
        }
    });
});

app.post('/addGroup', function (req, res) {
    console.log('Call to /addGroup');
    var group = {
        name: req.body.group.name,
        users: [req.body.userId],
        admins: [req.body.userId]
    };
    Group.create(group, function (err,group) {
        if (!err) {
            console.log('Group added');
            res.json({
                Group: group
            });
        } else {
            console.log("Error occured. Message : " + err);
        }
    });
});

app.post('/addUserToGroup', function (req, res) {
    console.log('Call to /addUserToGroup');
    Group.findOne({_id: req.body._id},function(err,group) {
        if (!err && group !== null) {
            group.users.push(req.body.userId);
        } else {
            if (err) {
                console.log("Error occured. Message : " + err);
            } else {
                console.log("Can't find group");
            }
        }
    });
});

app.get('/listGroupsByUser', function (req, res) {
    console.log('Call to /listGroupsByUser');
    console.log('UserId:' + req.param('userId'));
    Group.find({
        users: req.param('userId')
    }, function (err, groups) {
        if (!err) {
            console.log(groups);
            res.json(groups);
        } else {
            console.log("Error occured. Message : " + err);
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

app.get('/', function (req, res) {
    console.log('Call to *');
    res.sendFile(path.join(__dirname, '../FrontEnd', 'index.html')); // load the single view file (angular will handle the page changes on the front-end)
});

app.listen(8080, function () {
    console.log('listening on http://localhost:8080');
});