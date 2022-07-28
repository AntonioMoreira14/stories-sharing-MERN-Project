const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const getUser = async (req, res) => {
  try {
    const user = await User.find()
    res.status(200).json(user)
  } catch (err) {
    res.status(500).json(err)
  }
}

const createUser = async (req, res) => {

  if(!req.body.username || !req.body.password || !req.body.email) {
    return res.status(400).json({msg: "Please insert all credentials!"})
  } 
  
  if(req.body.username.length > 14) {
    return res.status(400).json({msg: "Maximun characters for username is 14"})
  }

  const user = await User.findOne({username: req.body.username})

  const email = await User.findOne({email: req.body.email})

  if(user || email) {
    return res.status(400).json({msg: "User or Email already exists!"})
  }

  let hashedPass = bcrypt.hashSync(req.body.password, 10)

  const createUser = await User.create({
    username: req.body.username,
    password: hashedPass,
    email: req.body.email
  })

  res.status(201).json({ createUser })
}

const getUserPage = async (req, res) => {
  const user = await User.findById(req.user._id)
  res.json({
    username: user.username,
    email: user.email
  })
}

const login = async (req, res) => {

  const user = await User.findOne({username: req.body.username});
  if(!user) {
    return res.status(400).json({msg: "User does not exist!"})
  }

  bcrypt.compare(req.body.password, user.password, (err, response) => {
    if (!response) {
      return res.status(400).send({msg: "Incorrect Username/Password"})
    } else {
      const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET)
      res.json({
        token: token,
        user: {
          id: user._id,
          username: user.username
        }
      })
    }
  });
}

const tokenValid = async (req, res) => {
  try {
    const token = req.header('authentication-token')
    if(!token) {
      return res.json(false)
    }
    
    const verify = jwt.verify(token, process.env.JWT_SECRET) 
    if(!verify) {
      return res.json(false)
    }
    
    const user = await User.findById(verify._id)

    if(!user) {
      return res.json(false)
    }

    return res.json(true)
  } catch (err) {

    res.status(500).json({msg: err})
  }
}

module.exports = {
  getUser,
  createUser,
  getUserPage,
  login,
  tokenValid
}