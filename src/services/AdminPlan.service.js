const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const moment = require('moment');
const AdminPlan = require('../models/AdminPlan.model');

const createAdminPlane = async (body) => {
  let tomorrow = moment().add(30, 'days');
  let values = { ...body };
  let data = await AdminPlan.create(values);
  return data;
};

const GetAll_Planes = async () => {
  let data = await AdminPlan.find();
  return data;
};

module.exports = {
  createAdminPlane,
  GetAll_Planes,
};
