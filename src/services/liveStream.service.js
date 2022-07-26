const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const liveStream = require('../models/liveStream.model');
const Agora = require("agora-access-token");

const createLiveStream = async (userBody) => {

  const appID = "50c7493877764c85aa44d921a68f2b38";
  const appCertificate = "deb15b1b53e44c46abf51172bc552daa";

  // const user = req.body.user;
  // const role = Agora.RtmRole.Rtm_User;
  const expirationTimeInSeconds = 3600;
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const expirationTimestamp = currentTimestamp + expirationTimeInSeconds;
  const token = Agora.RtmTokenBuilder.buildToken(appID, appCertificate, "live", expirationTimestamp);
  console.log(userBody)
  return liveStream.create({ token: token, userId: userBody.userId, requirementId: userBody.requirementId });
};

const getliveStream = async (id) => {
  const data = await liveStream.findById(id);
  return data;
};


module.exports = { createLiveStream, getliveStream };