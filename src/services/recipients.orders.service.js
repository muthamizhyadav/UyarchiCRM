const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const moment = require('moment');
const RecipentOrdes = require('../models/recipient.orders.model');

const createRecipientsOrders = async (body) => {
  let values = { ...body, ...{ created: moment(), date: moment().format('YYYY-MM-DD'), time: moment().format('HH:MM a') } };
  const create = await RecipentOrdes.create(values);
  return create;
};


module.exports = { createRecipientsOrders };
