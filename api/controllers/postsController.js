const Post = require('../models/Post')

const getPosts = (req, res) => {
  Post.find()
    .then(post => res.json(post))
    .catch(err => res.status(400).json(err))
}

const getSinglePost = async (req, res) => {
  try {
     const post = await Post.findById(req.params.id)
     res.status(200).json(post);

  } catch (err) {
    res.status(500).json(err)
  }
}

const createPost = (req, res) => {

  const newPost = new Post({
    title: req.body.title,
    desc: req.body.desc,
    user: req.body.user
  });

  newPost.save()
    .then(() => res.json("A new post was added!"))
    .catch((err) => res.status(400).json(err));
}

const updatePost = (req, res) => {
  Post.findByIdAndUpdate(req.params.id, {$set: req.body})
  .then(() => res.json('The Post was updated!'))
  .catch(err => res.status(400).json(err))
}

const deletePost = (req, res) => {
  Post.findByIdAndDelete(req.params.id)
    .then(() => res.json('Post was deleted!'))
    .catch(err => res.status(400).json('Error: ' + err))
}

module.exports = {
  getPosts,
  getSinglePost,
  createPost,
  updatePost,
  deletePost
}