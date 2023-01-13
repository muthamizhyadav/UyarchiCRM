const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const moment = require('moment');
const SavedSearch = require('../models/saved.search.model');

const CreateSavedSearch = async (body, userId) => {
  let values = { ...body, ...{ created: moment(), userId: userId } };
  const data = await SavedSearch.create(values);
  return data;
};

module.exports = {
  CreateSavedSearch,
};
