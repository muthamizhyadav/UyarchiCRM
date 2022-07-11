const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const liveStreamservice= require('../services/liveStream.service');
 
const createliveStream= catchAsync(async (req, res) => {
    const data = await liveStreamservice.createLiveStream(req.body);
    res.send(data);
  });
  
  const getliveStreamId = catchAsync(async (req, res) => {
    const data = await liveStreamservice.getliveStream(req.params.id);
    res.send(data);
  });

  module.exports={createliveStream, getliveStreamId};