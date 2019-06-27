const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const actorSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  login: {
    type: String,
    require: false
  },
  avatar_url: {
    type: String,
    require: false
  }

}, {
  timestamps: true
});

module.exports = mongoose.model('Actor', actorSchema);