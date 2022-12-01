const httpStatus = require('http-status');
const {Host, HostProduct, HostStreaming} = require('../models/hostreg.model');
const ApiError = require('../utils/ApiError');
const Agora = require('agora-access-token');

const createHost = async (body) => {
  return Host.create(body);
};

const loginhostEmailAndPassword = async (email, mobileNumber) => {
    const data = await Host.find({ email: email });
    let number = data[0].mobileNumber
    if (data != '') {
      if (number == mobileNumber) {
      } else {
        throw new ApiError(httpStatus.NOT_FOUND, 'mobileNumber not Match');
      }
    } else {
      throw new ApiError(httpStatus.NOT_FOUND, 'Email Not Registored');
    }
  
    return data;
  };

  const ManageId = async (id) => {
    const Manage = await manageTelecaller.findById(id);
    return Manage;
  };


  
const createHostProduct = async (body) => {
  const data = await Host.findById(body.uid)
  if(!data){
    throw new ApiError(httpStatus.NOT_FOUND, 'User Not Found');
  }
  return HostProduct.create(body);
};



const createHostStreaming = async (userBody) => {
  const appID = 'dd80ee642fa84a36a365f560c3741929';
  const appCertificate = '7861826a7d6547238a845836b0442d8e';

  // const user = req.body.user;
  // const role = Agora.RtmRole.Rtm_User;
  const expirationTimeInSeconds = 3600;
  const currentTimestamp = Math.floor(Date.now() / 1000);
  console.log(currentTimestamp);
  const expirationTimestamp = currentTimestamp + expirationTimeInSeconds;
  const token = Agora.RtmTokenBuilder.buildToken(appID, appCertificate,userBody.selectHost, expirationTimestamp);
  let values = { ...userBody, ...{token:token} };
  return HostStreaming.create(values);
};


  
const hostAll = async () => {
  const data = await Host.find();
  return data;
};


  
  const ManageAll = async () => {
    const data = await manageTelecaller.find();
    return data;
  };


  const updatemanageAttendance = async (id, updateBody) => {
    let users = await manageTelecaller.findById(id);
    if (!users) {
      throw new ApiError(httpStatus.NOT_FOUND, 'manageAttendance not Found');
    }
    users = await manageTelecaller.findByIdAndUpdate({ _id: id }, updateBody, { new: true });
    return users;
  };
  
  const deletemanageAttendance = async (id) => {
    let users = await manageTelecaller.findById(id);
    if (!users) {
      throw new ApiError(httpStatus.NOT_FOUND, 'manageAttendance Not Found');
    }
    (users.active = false), (users.archive = true);
    await users.save();
  };



module.exports = { createHost, loginhostEmailAndPassword, createHostProduct, createHostStreaming, hostAll};