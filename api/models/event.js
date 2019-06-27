const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const eventSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  eventId: {
    type: String,
    required: true
  },
  type: {
    type: String,
    require: true
  },
  actor: {
    type: Schema.Types.ObjectId,
    ref: 'Actor',
    required: false
  },
  repo: {
    type: Schema.Types.ObjectId,
    ref: 'Repo',
    required: false
  },

}, {
  timestamps: true
});

module.exports = mongoose.model('Event', eventSchema);