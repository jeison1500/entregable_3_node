const catchAsync = require('../utils/catchAsync');
const User = require('./../models/users.models');
const AppError = require('./../utils/appError');

exports.signUp = catchAsync(async (req, res, next) => {
  const { name, password } = req.body;

  const accountNumber = Math.floor(100000 + Math.random() * 900000);

  const amount = 1000;

  const user = await User.create({
    name: name,
    accountNumber: accountNumber,
    password: password,
    amount: amount,
  });

  res.status(200).json({
    status: 'success',
    message: 'User created successfully',
    user: {
      id: user.id,
      name: user.name,
      accountNumber: user.accountNumber,
      amount: user.amount,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { accountNumber, password } = req.body;

  const user = await User.findOne({
    where: {
      accountNumber: accountNumber,
      password: password,
      status: 'active',
    },
  });

  if (!user) {
    return next(new AppError('Invalid account number or password', 401));
  }

  res.status(200).json({
    user: {
      id: user.id,
      name: user.name,
      accountNumber: user.accountNumber,
      amount: user.amount,
    },
  });
});
