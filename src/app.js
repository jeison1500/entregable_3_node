const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');

const usersRouter = require('./routes/users.route');
const transferRouter = require('./routes/transfers.route');

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/transfer', transferRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

module.exports = app;
