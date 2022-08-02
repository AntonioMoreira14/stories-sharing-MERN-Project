const mongoose = require('mongoose')

const connectDB = (url) => {
  return mongoose.connect(url).then(console.log('DB is running...'));
}

module.exports = connectDB;