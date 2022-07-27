const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const liveStreamservice = require('../services/liveStream.service');

const createliveStream = catchAsync(async (req, res) => {
  // const data = await liveStreamservice.createLiveStream(req.body);
  res.send('not working');
});

const getliveStreamId = catchAsync(async (req, res) => {
  const data = await liveStreamservice.getliveStream(req.params.id);
  if (data.length == 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Token Not Available');
  }

  res.send(data[0]);
});
const getAllliveStriming = catchAsync(async (req, res) => {
  const data = await liveStreamservice.getAllliveStriming();
  res.send(data);
});
const updatetoken = catchAsync(async (req, res) => {
  const data = await liveStreamservice.updatetoken(req.params.id, req.body);
  res.send('not working');
});
const getAllliveStrimingapproved = catchAsync(async (req, res) => {
  const data = await liveStreamservice.getAllliveStrimingapproved(req.params.uId);
  res.send(data);
});
const getBuyerWatch = catchAsync(async (req, res) => {
  const data = await liveStreamservice.getBuyerWatch(req.params.uId);
  res.send(data);
});


module.exports = { createliveStream, getliveStreamId, getAllliveStriming, updatetoken, getAllliveStrimingapproved ,getBuyerWatch};