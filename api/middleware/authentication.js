const jwt = require("jsonwebtoken")

const auth = (req, res, next) => {
  const token = req.header('authentication-token')
  if(!token) {
    res.status(400).json({msg: "Authorization not granted, token does not exist!"})
  }
  try {
    const verify = jwt.verify(token, process.env.JWT_SECRET)
    if(!verify) {
      res.status(401).json({msg:"Verification failed! You are unauthorized!"})
    }
    req.user = verify;
    next()
  } catch (err) {
    res.status(401).json({msg: err})
  }
}

module.exports = auth;