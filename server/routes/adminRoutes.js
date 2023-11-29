import express from "express";
import authMiddleware from "../middlewares/auth.js";
import adminController from "../controllers/adminController.js";

const adminRouter = express.Router();

adminRouter.route("/login").post(adminController.login);
adminRouter.route("/").post(adminController.createUser);
adminRouter.route("/getUsers").get(authMiddleware, adminController.getAllUsers);
adminRouter
  .route("/getUser/:userAccountNumber")
  .get(authMiddleware, adminController.getUser);

export default adminRouter;
