import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    account_number: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account", // it must be created before the addition of user
      require: [true, "account number must be present"],
    },
    action: {
      type: String,
      enum: ["withdraw", "deposit"],
      require: [true, "action is required"],
    },
    amount: {
      type: Number,
      require: [true, "some amount must be present"],
    },
  },
  { timestamps: true }
);

const Transaction = mongoose.model("transaction", transactionSchema);

export default Transaction;
