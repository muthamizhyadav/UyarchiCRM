const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const ApiError = require('../utils/ApiError');
const propertyVisit = require('../models/propertyVisit.model');
const moment = require('moment');

const createPropertyVisit = async (body) => {
  const data = { ...body, ...{ created: moment() } };
  const values = await propertyVisit.create(data);
  return values;
};

module.exports = {
  createPropertyVisit,
};
