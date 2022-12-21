const mongoose = require('mongoose');
const { v4 } = require('uuid');

const AdminSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: v4,
  },
  userName: {
    type: String,
  },
  email: {
    type: String,
  },
  mobileNumber: {
    type: Number,
  },
  active: {
    type: Boolean,
    default: true,
  },
  created: {
    type: Date,
  },
});

const Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin;
