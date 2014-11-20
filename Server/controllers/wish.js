module.exports.set = function(app) {
    var User = require('../Models/User');
    var Wish = require('../Models/Wish');

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

}