const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const connectDb = require("./config/dbConnection");
const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");
const authRouter = require("./routes/authRoutes");
const categoryRouter = require("./routes/categoryRoutes");
const AppError = require("./utils/AppError");
const globalErrorHandler = require("./middlewares/globalErrorHandler");

const app = express();
const port = process.env.PORT || 5000;

// 1) Middlewares

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false })); // Form encoded data as body
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api", authRouter);
app.use("/api/categories", categoryRouter);
app.all("*", (req, res, next) => {
  next(new AppError(`This path ${req.originalUrl} isn't on this server!`, 404));
});
app.use(globalErrorHandler);

// 2) Route

// 3) Moongo Db connection
connectDb();

// 4) Global Error Handler

// 5) Server

app.listen(port, () => {
  console.log(`server is running at ${port}`);
});
