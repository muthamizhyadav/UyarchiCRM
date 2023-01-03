const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const usersPlan = require('../models/usersPlane.model');
const moment = require('moment');

const createUserPlan = async (body, id) => {
  let values = { ...body, ...{ created: moment(), userId: id } };
  let findByUsers = await usersPlan.findOne({ userId: id, active: true });
  if (findByUsers) {
    throw new ApiError(httpStatus.BAD_GATEWAY, 'Exist plan Still in Active');
  }
  let data = await usersPlan.create(values);
  return data;
};

module.exports = { createUserPlan };
