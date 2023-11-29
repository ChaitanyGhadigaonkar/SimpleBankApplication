import { NODE_ENV } from "./config/index.js";

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    msg: err.message,
    stack: NODE_ENV === "dev" ? err.stack : null,
  });
};
export default errorHandler;
