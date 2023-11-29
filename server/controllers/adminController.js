import { Transaction, User } from "../models/index.js";
import expressAsyncHandler from "express-async-handler";
import generateToken from "../utils/generateAuthToken.js";

// create user
const createUser = expressAsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !password || !name) {
    res.status(400);
    throw new Error("All fields required");
  }
  const isExists = await User.findOne({ email });

  if (isExists) {
    res.status(400);
    throw new Error("Email already existed. Please use another email");
  }

  // create new user
  const user = await User.create({ name, email, password, role: "banker" });

  res.status(201).json({ success: true, user: user });
});

// login

const login = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Email already existed. Please use another email");
  }

  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("User does not exists");
  }

  const isCorrect = await user.comparePassword(password);
  if (!isCorrect) {
    res.status(400);
    throw new Error("Email or password is wrong");
  }
  const authToken = generateToken(res, user._id);
  res.status(201).json({
    success: true,
    user: {
      name: user.name,
      email: user.email,
      account_number: user.account_number,
      role: user.role,
      authToken,
    },
  });
});
// get all users
const getAllUsers = expressAsyncHandler(async (req, res) => {
  const { _id } = req.user;
  const isExists = await User.findById(_id).select("-password");
  if (!isExists) {
    res.status(400);
    throw new Error("User does not exists");
  }
  if (isExists.role !== "banker") {
    res.status(400);
    throw new Error("You are not authorized");
  }
  const users = await User.find({ role: "customer" }).select("-password");
  res.status(200).json({ success: true, users });
});

// get user information
const getUser = expressAsyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { userAccountNumber } = req.params;
  // console.log(_id);
  const isExists = await User.findById(_id).select("-password");
  if (!isExists) {
    res.status(400);
    throw new Error("User does not exists");
  }
  if (isExists.role !== "banker") {
    res.status(400);
    throw new Error("You are not authorized");
  }
  const user = await User.findOne({ account_number: userAccountNumber }).select(
    "-password"
  );

  const transactions = await Transaction.find({
    account_number: userAccountNumber,
  });

  res.status(200).json({ success: true, user: user, transactions });
});

export default { getUser, getAllUsers, createUser, login };
