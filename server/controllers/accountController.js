import { Account, User, Transaction } from "../models/index.js";
import expressAsyncHandler from "express-async-handler";
import mongoose from "mongoose";

// create user
const getBalance = expressAsyncHandler(async (req, res) => {
  const { _id } = req.user;

  const isExists = await User.findById(_id).select("-password");
  if (!isExists) {
    res.status(400);
    throw new Error("User does not exists");
  }
  //   console.log(isExists.account_number);
  const account = await Account.findById(isExists.account_number);

  res.status(201).json({ success: true, balance: account.balance });
});

// get all transactions
const getAllTransactions = expressAsyncHandler(async (req, res) => {
  const { _id } = req.user;

  const isExists = await User.findById(_id).select("-password");
  if (!isExists) {
    res.status(400);
    throw new Error("User does not exists");
  }
  const transactions = await Transaction.find({
    account_number: isExists.account_number,
  });

  res.status(201).json({ success: true, transactions });
});

// add transaction
const addTransaction = expressAsyncHandler(async (req, res) => {
  const { _id } = req.user;

  const isExists = await User.findById(_id).select("-password");
  if (!isExists) {
    res.status(400);
    throw new Error("User does not exists");
  }
  const { amount, action } = req.body;
  let account = await Account.findById(isExists.account_number);
  if (action === "withdraw" && account.balance - amount <= 0) {
    res.status(400);
    throw new Error("You can't withdraw this amount. Insufficient balance!!");
  }
  let balance;
  if (action === "withdraw") {
    balance = account.balance - amount;
  }
  if (action === "deposit") {
    balance = account.balance + amount;
  }

  // add transactions
  const transaction = await Transaction.create({
    account_number: isExists.account_number,
    amount,
    action,
  });
  // update the account balance
  account = await Account.findByIdAndUpdate(
    isExists.account_number,
    {
      $set: { balance },
    },
    { new: true }
  );

  res
    .status(201)
    .json({ success: true, transaction, balance: account.balance });
});

export default { getBalance, getAllTransactions, addTransaction };
