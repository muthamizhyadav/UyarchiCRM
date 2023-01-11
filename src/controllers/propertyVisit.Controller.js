const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const propertVisitService = require('../services/propertyVisit.service');

const createPropertyVisit = catchAsync(async (req, res) => {
  const data = await propertVisitService.createPropertyVisit(req.body);
  res.send(data);
});

module.exports = {
  createPropertyVisit,
};
