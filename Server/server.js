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

//Environment veriables is set by SET ENV_SECRET="DUMMY"
var secret = process.env.ENV_SECRET
if (!secret) {
    //Use the dummy secret if no other secret is set.
    secret = 'this is the secret secret secret 12356';
}

var app = express();

/*
var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill(process.env.ENV_MANDRILL_KEY);


var message = {
    "html": "<p>Testing Testing</p>",
    "text": "Testing Testing",
    "subject": "Test APA",
    "from_email": "jacob@ankarberg.net",
    "from_name": "Jacob Ankarberg",
    "to": [{
            "email": "jacob@ankarberg.net",
            "name": "Jacob Ankarberg",
            "type": "to"
        }],
    "headers": {
        "Reply-To": "doNotReply@ankarberg.net"
    },
    "important": false,
    "track_opens": null,
    "track_clicks": null,
    "auto_text": null,
    "auto_html": null,
    "inline_css": null,
    "url_strip_qs": null,
    "preserve_recipients": null,
    "view_content_link": null,
    "tracking_domain": null,
    "signing_domain": null,
    "return_path_domain": null,
    "merge": true,
    "merge_language": "mailchimp",
    "global_merge_vars": null,
    "merge_vars": null,
    "tags": null,
    "subaccount": null
};
var async = false;
var ip_pool = "Main Pool";
mandrill_client.messages.send({"message": message, "async": async}, function(result) {
    console.log(result);
    
}, function(e) {
    // Mandrill returns the error as an object with name and message keys
    console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
    // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
});

*/




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
            //Fetch the groups for this user as well
            Group.find({users: user._id}, function (err, groups) {
                if (!err) {
                    console.log("Groups:" +  groups);
                    res.json({
                        token: token,
                        user: user,
                        groups : groups
                    });
                } else {
                    console.log("Error occured. Message : " + err);
                }
            });
        } else {
            res.status(401).send('Unauthorized');
        }

    });

});

app.post('/editUser', function (req, res) {
    console.log('Call to /editUser');
    var user = {
        email: req.body.email,
        name: req.body.name,
        password: req.body.password
    };
    User.update({_id : req.body._id }, user, {
        upsert: true
    }, function (err,user) {
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
    User.findOne({_id: req.param('userId')},function (err,user) {
        if (!err && user !== null) {
            Wish.find({
                userId: req.param('userId')
            }, function (err, wishes) {
                if (!err) {
                    console.log(wishes);
                    res.json({user : user, wishes:wishes});
                } else {
                    console.log("Error occured. Message : " + err);
                }
            });
        } else {
            console.log("Failed to find user. Message: " + err);
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


app.get('/getGroupWithUsers', function (req, res) {
    console.log('Call to /getGroupWithUsers');
    console.log('GroupId:' + req.param('groupId'));
    Group.findOne({
        _id: req.param('groupId')
    }).populate('users').exec(function (err, group) {
        if (!err) {
            console.log(group);
            res.json(group);
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

app.set('port', (process.env.PORT || 5000))

app.listen(app.get('port'), function () {
    console.log("Node app is running at localhost:" + app.get('port'))
});