var mongoose = require('mongoose');

module.exports = mongoose.model('users',{ 
		email: String,
		firstname: String,
		lastname: String,
	 	password : String});
