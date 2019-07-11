const express = require('express')
const router = express.Router()
const user = require('../controllers/user')

router.post('/login', user.login)
router.get('/info', user.info)
router.post('/logout', user.logout)
router.post('/register', user.register)
router.get('/list', user.getList)
router.post('/getByUid', user.getUserByUid)
router.post('/profile', user.profile)
router.post('/search', user.search)
router.post('/deleteUser', user.deleteUser)

module.exports = router