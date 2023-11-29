import { User } from "../models/index.js";
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
    res
      .status(400)
      .json({ success: false, message: "email password required" });
    return;
  }

  // create new user
  const user = await User.create({ name, email, password });

  res.status(201).json({ success: true, user: user });
});

// login

const login = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res
      .status(400)
      .json({ success: false, message: "email password required" });
    return;
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
      authToken,
    },
  });
});

// get user information
const getUser = async (req, res) => {
  const { _id } = req.user;
  // console.log(_id);
  const isExists = await User.findById(_id).select("-password");
  if (!isExists) {
    res.status(400);
    throw new Error("User does not exists");
  }

  res.status(200).json({ success: true, user: isExists });
};

export default { getUser, createUser, login };
