const mongoose = require('mongoose');

let AccountSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  time: Date,
  type: {
    type: Number,
    enum: [-1, 1] // -1支出 1收入
  },
  account: {
    type: Number,
    required: true
  },
  remarks: {
    type: String,
    unique: true
  }
});

module.exports = mongoose.model('Account', AccountSchema);