const catchAsync = require('./../utils/catchAsync');
const Transfer = require('./../models/transfers.models');
const AppError = require('./../utils/appError');
const User = require('./../models/users.models');

exports.transfer = catchAsync(async (req, res, next) => {
  const { accountNumber, amount, senderUserId } = req.body;

  const userRx = await User.findOne({
    where: {
      accountNumber: accountNumber,
      status: 'active',
    },
  });

  if (userRx.accountNumber !== accountNumber) {
    return next(new AppError('Invalid account number', 401));
  }

  const receiverUserId = userRx.accountNumber;

  const userTx = await User.findOne({
    where: {
      accountNumber: senderUserId,
      status: 'active',
    },
  });

  if (amount > userTx.amount) {
    return next(new AppError('Insufficient funds', 401));
  }

  if (userTx.accountNumber === accountNumber) {
    return next(new AppError('You cannot transfer to yourself', 401));
  }

  const newAmountTx = userTx.amount - amount;
  const newAmountRx = userRx.amount + amount;

  await userTx.update({ amount: newAmountTx });
  await userRx.update({ amount: newAmountRx });

  const transfer = await Transfer.create({
    amount: amount,
    senderUserId: senderUserId,
    receiverUserId: receiverUserId,
  });

  res.status(200).json({
    status: 'success',
    message: 'Transfer created successfully',
    transfer: {
      id: transfer.id,
      amount: transfer.amount,
      senderUserId: transfer.senderUserId,
      receiverUserId: transfer.receiverUserId,
    },
  });
});
