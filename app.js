const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');

dotenv.config({ path: `${__dirname}/config.env` });

//IMPORT ROUTERS
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

//DECLARE THE APP
const app = express();

//MIDDELWARE
if (process.env.NODE_ENV == 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  //console.log('Hello from the middleware 😄');
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  //console.log(`TIME: ${req.requestTime}`);
  next();
});

//MOUNTING THE ROUTERS
app.use('/api/v1/users', userRouter);
app.use('/api/v1/tours', tourRouter);

module.exports = app;
