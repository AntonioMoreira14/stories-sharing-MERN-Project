const express = require('express');
const connectDB = require('./db/connect')
require('dotenv').config();
const app = express();
const postsRouter = require('./routes/postsRouter');
const usersRouter = require('./routes/usersRouter');

app.use(express.json())

app.use('/', postsRouter)
app.use('/user', usersRouter)

const port = process.env.PORT || 5000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, console.log(`server is listening on port ${port}....`))
  } catch (error) {
    console.log(error)
  }
}

start();