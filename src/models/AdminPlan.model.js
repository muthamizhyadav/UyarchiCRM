const mongoose = require('mongoose');
const { v4 } = require('uuid');
const bcrypt = require('bcryptjs');

const AdminPlanSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: v4,
  },
  planName: {
    type: String,
  },
  PostNumber: {
    type: Number,
  },
  PlanValidate: {
    type: Date,
  },
  Videos: {
    type: Number,
  },
  Amount: {
    type: Number,
  },
  Type: {
    type: String,
  },
  images: {
    type: Number,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

const AdminPlan = mongoose.model('AdminPlan', AdminPlanSchema);

module.exports = AdminPlan;
