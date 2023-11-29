import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/index.js";

const generateToken = (res, id) => {
  const token = jwt.sign({ id }, JWT_SECRET, {
    expiresIn: "30d",
  });

  return token;
};
export default generateToken;
