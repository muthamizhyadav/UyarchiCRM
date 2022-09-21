const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const cors = require('cors');
const passport = require('passport');
const httpStatus = require('http-status');
const config = require('./config/config');
// const config = require('./config/config');
const logger = require('./config/logger');
const morgan = require('./config/morgan');
const { jwtStrategy } = require('./config/passport');
const { authLimiter } = require('./middlewares/rateLimiter');
const routes = require('./routes/v1');
const { errorConverter, errorHandler } = require('./middlewares/error');
const ApiError = require('./utils/ApiError');
const app = express();
const mongoose = require('mongoose');
const http = require('http');
const MessageRoute = require('./routes/v1/message.route');
const httpServer = http.createServer(app);
const { Messages } = require('../src/models/message.model');
const moment = require('moment');
const io = require('socket.io')(httpServer, {
  cors: {
    origin: '*',
  },
});
io.on('connection', (socket) => {
  const { roomId } = socket.handshake.query;
  socket.join(roomId);
  socket.on('message', async ({ userId, message }) => {
    io.in(roomId).emit('message', { userId, message });
    await Messages.create({ userId: userId, message: message, roomId: roomId, created: moment() });
    console.log(userId, message, roomId);

    socket.on('callUser', ({ userToCall, signalData, from, name }) => {
      io.to(userToCall).emit('callUser', {
        signal: signalData,
        from,
        name,
      });
    });
    socket.on('updateMyMedia', ({ type, currentMediaStatus }) => {
      console.log('updateMyMedia');
      socket.broadcast.emit('updateUserMedia', { type, currentMediaStatus });
    });
    socket.on('answerCall', (data) => {
      socket.broadcast.emit('updateUserMedia', {
        type: data.type,
        currentMediaStatus: data.myMediaStatus,
      });
      io.to(data.to).emit('callAccepted', data);
    });
    socket.on('endCall', ({ id }) => {
      io.to(id).emit('endCall');
    });
  });
});
// Socket Message Api's
app.use('/meesageRoute', MessageRoute);
if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}
// set security HTTP headers
app.use(helmet());
// parse json request body
app.use(express.json());
// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));
// sanitize request data
app.use(xss());
app.use(mongoSanitize());
// gzip compression
app.use(compression());
// enable cors
app.use(cors());
app.options('*', cors());
// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);
// limit repeated failed requests to auth endpoints
if (config.env === 'production') {
  app.use('/v1/auth', authLimiter);
}
// v1 api routes
app.use('/v1', routes);
//default routes
app.get('/', (req, res) => {
  res.sendStatus(200);
});
// default v1 route
app.get('/v1', (req, res) => {
  res.sendStatus(200);
});
// health status code
app.get('/health', (req, res) => {
  res.sendStatus(200);
});
// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});
// convert error to ApiError, if needed
app.use(errorConverter);
// handle error
app.use(errorHandler);
// mongoose connection
mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  logger.info('Connected to MongoDB');
});
// server connection
httpServer.listen(config.port, () => {
  logger.info(`Listening to port ${config.port}`);
});
module.exports = app;
