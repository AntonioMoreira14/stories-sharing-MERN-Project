const router = require('express').Router()
const auth = require('../middleware/authentication')
const {getUser, createUser, getUserPage,login, tokenValid} = require('../controllers/usersController')

router.route('/register').get(getUser).post(createUser);
router.route('/userpage').get(auth, getUserPage);
router.route('/login').post(login);
router.route('/tokenValid').post(tokenValid);

module.exports = router;