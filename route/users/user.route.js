const express = require('express');
const { signup, userLogin, sendOTP, verifyOTP, forgot_password, get_singel_user, userUpdate } = require('../../controller/users/user.controller');
const { authentication } = require('../../middleware/auth');
const uplode = require('../../middleware/upload')
const router = express.Router();

router.post('/user-signup', signup)
router.post('/user-login', userLogin)
router.post('/send-otp',sendOTP)
router.post('/verify-otp',verifyOTP)
router.post('/forgot-password',forgot_password)
router.post('/get-singel-user',authentication,get_singel_user)
router.post('/user-update',uplode.single('image'),userUpdate)




module.exports = router