const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  name: String,
  emailVerified: Date,
  image: String,
}, { timestamps: true });

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);