const mongoose = require('mongoose');
const { v4 } = require('uuid');

const userPlanSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: v4,
  },
  PlanId: {
    type: String,
  },
  planName: {
    type: String,
  },
  PostNumber: {
    type: Number,
  },
  Videos: {
    type: Number,
  },
  offer: {
    type: Number,
  },
  PlanRole: {
    type: String,
  },
  ContactNumber: {
    type: Number,
  },
  PayMentMethod: {
    type: String,
  },
  planValidate: {
    type: String,
  },

  Amount: {
    type: Number,
  },
  created: {
    type: Date,
  },
  userId: {
    type: String,
  },
});

const userPlan = mongoose.model('userplan', userPlanSchema);

module.exports = userPlan;
