const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const repoSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    require: false
  },
  url: {
    type: String,
    require: false
  }

}, {
  timestamps: true
});

module.exports = mongoose.model('Repo', repoSchema);