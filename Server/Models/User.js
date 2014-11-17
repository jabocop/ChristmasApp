var mongoose = require('mongoose');

module.exports = mongoose.model('users',{ 
		email: String,
		name: String,
	 	password : String});
