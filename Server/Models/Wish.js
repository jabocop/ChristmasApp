var mongoose = require('mongoose');

module.exports = mongoose.model('wishes', {
    name: String,
    comment: String,
    url: String,
    userId:String
});