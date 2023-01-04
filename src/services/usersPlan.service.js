const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const usersPlan = require('../models/usersPlane.model');
const moment = require('moment');

const createUserPlan = async (body, id) => {
  let sds = moment().add(body.PlanValidate, 'minutes');
  const currentDate = moment().toDate();
  let values = { ...body, ...{ created: moment(), userId: id, PlanValidate: sds } };
  let findByUsers = await usersPlan.findOne({ userId: id, active: true, PlanValidate: { $gte: currentDate } });
  if (findByUsers) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Exist plan Still in Active');
  }
  let data = await usersPlan.create(values);
  return data;
};

module.exports = { createUserPlan };
