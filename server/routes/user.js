var express = require('express');
var router = express.Router();
const {signUp, isPaidUser, saveDetails, getDetails, signIn, addSong, updateProfile, getAllUsers, blockUser, getUserById, validAdmin} = require('../controllers/user-controller');
const isAdmin = require('../middlewares/isAdmin');
const isLoggedIn = require('../middlewares/isLoggedIn');

router.post('/signup',signUp);
router.post('/onboarding',saveDetails)
router.get('/payment/:id',isPaidUser)
router.post('/profile',isLoggedIn,getDetails)
router.post('/signIn',signIn);
router.post('/addSong',addSong)
router.post('/updateProfile',updateProfile)
router.get('/users',getAllUsers)
router.post('/blockUser',blockUser)
router.get('/getUserById/:id',getUserById)
router.post('/isValidAdmin',isLoggedIn,isAdmin,validAdmin)

module.exports = router;
