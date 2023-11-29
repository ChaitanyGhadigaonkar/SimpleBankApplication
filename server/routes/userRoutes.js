import express from "express";
import userController from "../controllers/userController.js";
import authMiddleware from "../middlewares/auth.js";

const userRouter = express.Router();

userRouter.route("/login").post(userController.login);
userRouter
  .route("/")
  .get(authMiddleware, userController.getUser)
  .post(userController.createUser);

export default userRouter;
