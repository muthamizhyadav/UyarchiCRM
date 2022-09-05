const express = require('express');
const router = express.Router();
const { Messages } = require('../../models/message.model');
const moment = require('moment');
const meesageController = require('../../controllers/message.controller');

// router.route('/Message').post(async (req, res) => {
//   console.log(req.body);
//   let currendDate = moment().format('YYYY-MM-DD');
//   const { userId, message } = req.body;
//   let values = { sender: userId, created: moment(), content: message, date: currendDate };
//   const Message = await Messages.create(values);
//   try {
//     const saveMessage = await Message.save();
//     res.status(201).json(saveMessage);
//   } catch {
//     res.statusCode(500).json(err);
//   }
// });

router.route('/Message').post(meesageController.createMessage);
router.route('/get/Message').get(meesageController.getmessages);
router.get('/ShowMessage', async (req, res) => {
  let currendDate = moment().format('YYYY-MM-DD');
  let values = await Messages.find({ date: currendDate });
  try {
    res.status(200).json(values);
  } catch {
    res.send(400).json(err);
  }
});

module.exports = router;
