const httpStatus = require('http-status');
const manageTelecaller = require('../models/manageTelecaller.model');
const ApiError = require('../utils/ApiError');

const createManage = async (manageUserBody) => {
    // if (await User.isEmailTaken(manageUserBody.email)) {
    //     throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    //   }
  return manageTelecaller.create(manageUserBody);
};

const loginManageUserEmailAndPassword = async (email, dateOfBirth) => {
    const data = await manageTelecaller.find({ email: email });
    let dob = data[0].dateOfBirth.replace(/[^0-9\.]+/g, '');
    if (data != '') {
      if (dob == dateOfBirth) {
      } else {
        throw new ApiError(httpStatus.NOT_FOUND, 'DOB Not Match');
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


module.exports = { ManageId , loginManageUserEmailAndPassword, createManage };
