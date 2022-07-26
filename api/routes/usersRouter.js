const router = require('express').Router()
const auth = require('../middleware/authentication')
const {getUser, createUser, getProfile,login, tokenValid} = require('../controllers/usersController')

router.route('/register').get(getUser).post(createUser);
router.route('/profile').get(auth, getProfile);
router.route('/login').post(login);
router.route('/tokenValid').post(tokenValid);

module.exports = router;