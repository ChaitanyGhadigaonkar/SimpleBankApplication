import express from "express";
import { PORT } from "./config/index.js";
import connectToDb from "./db/connectToDb.js";
import userRouter from "./routes/userRoutes.js";
import errorHandler from "./errorHandler.js";
import accountRouter from "./routes/accountRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import cors from "cors";

const app = express();
// cors
const allowedOrigins = ["http://localhost:5173"];
app.use(cors(allowedOrigins));

// connection to db
connectToDb();
app.use(express.json());

// home route
app.get("/", (req, res) => {
  res.status(200).send("Hello from the bank server !!!");
});

app.use("/api/auth", userRouter);
app.use("/api/account", accountRouter);
app.use("/api/admin", adminRouter);

app.get("*", (req, res) => {
  res.send("No routes found");
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server is running http://localhost:${PORT}`);
});
