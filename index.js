const express = require("express");
const connectDB = require("./db/connect");
const path = require("path");
require("dotenv").config();
const app = express();
const postsRouter = require("./routes/postsRouter");
const usersRouter = require("./routes/usersRouter");

app.use(express.json());

app.use("/api/", postsRouter);
app.use("/api/user", usersRouter);

app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "././client/build", "index.html"));
});

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`server is listening on port ${port}....`));
  } catch (error) {
    console.log(error);
  }
};

start();
