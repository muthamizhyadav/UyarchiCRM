const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const ApiError = require('../utils/ApiError');
const propertyVisit = require('../models/propertyVisit.model');
const { Buyer } = require('../models/BuyerSeller.model');
const moment = require('moment');

const createPropertyVisit = async (body) => {
  const data = { ...body, ...{ created: moment() } };
  const values = await propertyVisit.create(data);
  return values;
};

const getVisit_PropertyBy_Buyer = async (userId) => {
  const values = await Buyer.aggregate([
    {
      $match: { _id: userId },
    },
    {
      $lookup: {
        from: 'propertyvisits',
        localField: '_id',
        foreignField: 'userId',
        pipeline: [
          {
            $lookup: {
              from: 'sellerposts',
              localField: 'propertyId',
              foreignField: '_id',
              as: 'Properties',
            },
          },
          {
            $unwind: {
              preserveNullAndEmptyArrays: true,
              path: '$Properties',
            },
          },
        ],
        as: 'propertyvisit',
      },
    },
    {
      $project: {
        _id: 1,
        propertyvisit: 1,
      },
    },
  ]);
  return values[0];
};

module.exports = {
  createPropertyVisit,
  getVisit_PropertyBy_Buyer,
};
