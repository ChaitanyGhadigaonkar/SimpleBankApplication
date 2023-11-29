import jwt from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";
import { JWT_SECRET } from "../config/index.js";
import User from "../models/user.js";

const authMiddleware = expressAsyncHandler(async (req, res, next) => {
  let token;
  token = req.header("authToken");
  if (token) {
    const { id } = jwt.verify(token, JWT_SECRET);
    req.user = await User.findById(id).select("-password");
    next();
  } else {
    res.status(400);
    throw new Error("Not authorized");
  }
});
export default authMiddleware;
