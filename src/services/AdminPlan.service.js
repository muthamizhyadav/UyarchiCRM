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
  let data = await AdminPlan.find({ active: true });
  return data;
};

const updatePlan = async (id, body) => {
  let values = await AdminPlan.findById(id);
  if (!values) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Not Found');
  }
  if (body.Type === 'disable') {
    values = await AdminPlan.findByIdAndUpdate({ _id: id }, { active: false }, { new: true });
    return values;
  } else {
    values = await AdminPlan.findByIdAndUpdate({ _id: id }, { active: true }, { new: true });
    return values;
  }
};

module.exports = {
  createAdminPlane,
  GetAll_Planes,
  updatePlan,
};
