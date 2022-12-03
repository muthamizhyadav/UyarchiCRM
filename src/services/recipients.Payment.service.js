const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const moment = require('moment');
const RecipentPayments = require('../models/recipients.Payment.model');
const { Host, HostProduct, HostStreaming } = require('../models/hostreg.model');

const createPayment = async (body, userid) => {
  const { streamingId, paidAmt, Qty } = body;
  let streaming = await HostStreaming.findById(streamingId);
  if (!streaming) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Streaming Not Found');
  }
  let totalStock = parseInt(streaming.stock);
  let availableStock = totalStock - parseInt(Qty);
  console.log(availableStock);
  let update = await HostStreaming.findByIdAndUpdate({ _id: streaming._id }, { stock: availableStock }, { new: true });
  return update;
};

module.exports = {
  createPayment,
};
