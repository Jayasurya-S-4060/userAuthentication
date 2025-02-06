const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const userRouter = require("./routes/userRoutes");

require("dotenv").config();
const port = process.env.PORT || 3000;

const app = express();

connectDB();

app.use(express.json());
app.use(cors());
app.use("/api", userRouter);

app.listen(port, () => {
  "server running";
});
