import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { Account } from "./index.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "user name is required"],
    },
    email: {
      type: String,
      require: [true, "email is required"],
      unique: [true, "email is already taken"],
    },
    password: {
      type: String,
      require: [true, "password is required"],
    },
    account_number: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account", // it must be created before the addition of user
      require: [true, "account number must be present"],
    },
    role: {
      type: String,
      enum: ["customer", "banker"],
      default: "customer",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  //   create an account associated with that user
  const account = await Account.create({});
  this.account_number = account._id;
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  const isCorrect = await bcrypt.compare(enteredPassword, this.password);
  return isCorrect;
};

const User = mongoose.model("user", userSchema);

export default User;
