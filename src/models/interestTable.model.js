const mongoose = require('mongoose');
const { v4}=require('uuid')
const supplierInterestSchema = mongoose.Schema({
  _id :{
    type : String,
    default:v4
  },
  userId: {
    type: String,
    
  },
  supplierReqId:{
    type:String,
  },
  matchedBuyerId: {
    type: String,
  },
  interestStatus:{
    type:String,
  },
  shortlistQuantity:{
    type:String,
  },
  active: {
    type: Boolean,
    default: true,
  },
  archive: {
    type: Boolean,
    default: false,
  },
});

const SupplierInterest = mongoose.model('supplierInterest', supplierInterestSchema);
module.exports = SupplierInterest ;
