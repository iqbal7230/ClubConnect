// models/User.js
const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    isClub: Boolean
});
module.exports = mongoose.model('User', UserSchema);