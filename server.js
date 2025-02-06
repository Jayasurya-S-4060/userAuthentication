const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const userRouter = require("./routes/userRoutes");

require("dotenv").config();

const app = express();
const Port = 3000;

connectDB();

app.use(express.json());
app.use(cors());
app.use("/api", userRouter);

app.listen(Port, () => {
  "server running";
});
