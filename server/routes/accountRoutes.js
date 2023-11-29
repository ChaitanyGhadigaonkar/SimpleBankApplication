import express from "express";
import authMiddleware from "../middlewares/auth.js";
import accountController from "../controllers/accountController.js";

const accountRouter = express.Router();

accountRouter
  .route("/getBalance")
  .get(authMiddleware, accountController.getBalance);
accountRouter
  .route("/transactions")
  .get(authMiddleware, accountController.getAllTransactions)
  .post(authMiddleware, accountController.addTransaction);

export default accountRouter;
