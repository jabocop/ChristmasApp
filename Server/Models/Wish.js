var mongoose = require('mongoose');

module.exports = mongoose.model('wishes', {
    name: String,
    comment: String,
    url: String,
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'users'
    }
});