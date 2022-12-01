const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const hostregService = require('../services/hostreg.service');
const {tokenService} = require('../services');
const { jwt } = require('../config/config');
const { NOT_FOUND } = require('http-status');

const createhostService = catchAsync(async (req, res) => {
    const {body} = req;
    const attach = await hostregService.createHost(body);
    console.log(req.files)
    if (req.files) {
      let path = '';
      req.files.forEach(function (files, index, arr) {
        path = "resumes/host/"+ files.filename
        // console.log(files.filename)
      });
    
      attach.image = path;
    }
    res.status(httpStatus.CREATED).send(attach);
    await attach.save(); 
});

const login = catchAsync(async (req, res) => {
  const { email, mobileNumber } = req.body;
  const data = await hostregService.loginhostEmailAndPassword(email, mobileNumber);
  const tokens = await tokenService.generateAuthTokens(data[0]);
  let options = {
    httpOnly : true,
  }
  res.cookie("token", tokens.access.token, options)
  // jwt.verify(req.cookies['token'],);
  res.send({ data, tokens });
});


const createhostProductService = catchAsync(async (req, res) => {
  const {body} = req;
  const attach = await hostregService.createHostProduct(body);
  // console.log(req.files)
  if (req.files) {
    let path = '';
    req.files.forEach(function (files, index, arr) {
      path = "resumes/hostProduct/"+ files.filename
      // console.log(files.filename)
    });
  
    attach.image = path;
  }
  res.status(httpStatus.CREATED).send(attach);
  await attach.save(); 
});


const createHostStremingService = catchAsync(async (req, res) => {
  const user = await hostregService.createHostStreaming(req.body);
  res.status(httpStatus.CREATED).send(user);
 
});

const getAllHost = catchAsync(async (req, res) => {
  const data = await hostregService.hostAll();
  res.send(data);
});

const RecipentAll = catchAsync(async (req, res) => {
  const data = await hostregService.RecipentAll();
  res.send(data);
});

const getAllLiveStremingDatas = catchAsync(async (req, res) => {
  const data = await hostregService.getAllLiveStremingDatas();
  res.send(data);
});

const getAllLiveStremingDatasSame = catchAsync(async (req, res) => {
  const data = await hostregService.getAllLiveStremingDatasSame(req.params.id);
  res.send(data);
});

const getAllproductById = catchAsync(async (req, res) => {
  const data = await hostregService.getAllproductById(req.params.id);
  res.send(data);
});

const getAllStreamingId = catchAsync(async (req, res) => {
  const data = await hostregService.getAllStreaming(req.params.id);
  res.send(data);
});


const getAllStreamingToken = catchAsync(async (req, res) => {
  const data = await hostregService.getAllStreamingToken(req.params.id);
  res.send(data);
});
module.exports = {
    createhostService,
    login,
    createhostProductService,
    createHostStremingService,
    getAllHost,
    getAllLiveStremingDatas,
    getAllLiveStremingDatasSame,
    getAllproductById,
    RecipentAll,
    getAllStreamingId,
    getAllStreamingToken,
  };