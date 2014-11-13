var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('groups',{ 
	name: String,
	users: [{ type : Schema.ObjectId, ref: 'users' }],
    admins:  [{ type : Schema.ObjectId, ref: 'users' }]
});