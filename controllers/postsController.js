const Post = require('../models/Post')

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
    res.status(200).json(posts)
  } catch (err) {
    res.status(500).json(err)
  }
}

const getSinglePost = async (req, res) => {
  try {
     const post = await Post.findById(req.params.id)
     res.status(200).json(post);

  } catch (err) {
    res.status(500).json(err)
  }
}

const createPost = async (req, res) => {
  const newPost = await Post.create({
    title: req.body.title,
    desc: req.body.desc,
    user: req.body.user
  })
  res.status(201).json({ newPost })
}

const updatePost = async (req, res) => {
  try {
    const putPost = await Post.findByIdAndUpdate(req.params.id, {$set: req.body})
  
    res.status(200).json({ putPost })
  } catch (err) {
    res.status(404).json(err)
  }
}

const deletePost = async (req, res) => {
  try {
    const delPost = await Post.findByIdAndDelete(req.params.id);

    res.status(200).json({ delPost });
  } catch (err) {
    res.status(404).json(err)
  }
}

module.exports = {
  getPosts,
  getSinglePost,
  createPost,
  updatePost,
  deletePost
}