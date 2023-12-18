const express = require('express')
const router = express.Router()
const {registerUser, authUser} = require('../controller/userController')

router.post('/login',authUser)
router.post('/signup',registerUser)

module.exports = router;