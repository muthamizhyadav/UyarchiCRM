const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const AdminPlanService = require('../services/AdminPlan.service');

const createAdminPlane = catchAsync(async (req, res) => {
  const data = await AdminPlanService.createAdminPlane(req.body);
  res.send(data);
});

const GetAll_Planes = catchAsync(async (req, res) => {
  const data = await AdminPlanService.GetAll_Planes();
  res.send(data);
});

module.exports = {
  createAdminPlane,
  GetAll_Planes,
};
