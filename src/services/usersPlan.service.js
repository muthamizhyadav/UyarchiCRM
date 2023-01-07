const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const usersPlan = require('../models/usersPlane.model');
const AdminPlan = require('../models/AdminPlan.model');
const moment = require('moment');

const createUserPlan = async (body, id) => {
  let today = moment().toDate();
  let values = { ...body, ...{ created: moment(), userId: id } };
  // if (plan.Amount !== body.Amount) {
  //   throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'In Valid Amount');
  // }
  let data = await usersPlan.create(values);
  return data;
};

module.exports = { createUserPlan };
