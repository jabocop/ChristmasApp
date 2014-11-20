module.exports.set = function(app,secret) {
    var jwt = require('jsonwebtoken');
    var User = require('../Models/User');
    var Group = require('../Models/Group');
    
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


    app.post('/newUser', function (req, res) {
        console.log('Call to /newUser');
        User.create({
            email: req.body.email,
            name: req.body.name,
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


}