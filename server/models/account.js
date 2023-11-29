import mongoose from "mongoose";

const accountSchema = new mongoose.Schema(
  {
    balance: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Account = mongoose.model("account", accountSchema);

export default Account;
