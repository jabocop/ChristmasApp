module.exports.set = function(app) {
    var User = require('../Models/User');
    var Wish = require('../Models/Wish');
    var Group = require('../Models/Group');

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
    
    app.post('/removeGroup', function (req, res) {
        console.log('Call to /removeGroup');
        Group.remove({_id : req.body._id }, function (err) {
            if (!err) {
                console.log('Group removed');
                res.json({});
            } else {
                console.log("Error occured. Message : " + err);
            }
        });
    });


    app.post('/addUserToGroup', function (req, res) {
        console.log('Call to /addUserToGroup');
        Group.findOne({_id: req.body.groupId},function(err,group) {
            if (!err && group !== null) {
                group.users.push(req.body.userId);
                group.save(function (err) {
                if (err) {
                    console.log("Failed to save group" + err);
                } else {
                    console.log('User added to group. Group:' + group);
                    res.json({Group: group});    
                }
                });
            } else {
                if (err) {
                    console.log("Error occured. Message : " + err);
                } else {
                    console.log("Can't find group");
                }
            }
        });
    });
    
    app.post('/inviteToGroup', function (req, res) {
        console.log('Call to /inviteToGroup');
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
    
    

}