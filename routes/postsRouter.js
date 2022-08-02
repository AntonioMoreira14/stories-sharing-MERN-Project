const router = require('express').Router()
const auth = require('../middleware/authentication')
const {getPosts, getSinglePost, createPost, updatePost, deletePost} = require('../controllers/postsController')

router.route('/posts').get(getPosts);
router.route('/post').post(auth, createPost);
router.route('/posts/:id').get( getSinglePost).put(auth, updatePost).delete(auth, deletePost);

module.exports = router;