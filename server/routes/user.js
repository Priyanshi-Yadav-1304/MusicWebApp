var express = require('express');
var router = express.Router();
const {signUp, isPaidUser, saveDetails, getDetails, signIn, addSong, updateProfile, getAllUsers, blockUser, getUserById} = require('../controllers/user-controller')

router.post('/signup',signUp);
router.post('/onboarding',saveDetails)
router.get('/payment/:id',isPaidUser)
router.post('/profile',getDetails)
router.post('/signIn',signIn);
router.post('/addSong',addSong)
router.post('/updateProfile',updateProfile)
router.get('/users',getAllUsers)
router.post('/blockUser',blockUser)
router.get('/getUserById/:id',getUserById)

module.exports = router;
