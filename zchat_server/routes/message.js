const express = require('express')
const router = express.Router()
const message = require('../controllers/message')

router.post('/getByUid', message.getMessageByUid)
router.post('/getByFid', message.getMessageByFid)
router.post('/updateRead', message.updateRead)
router.post('/deleteMsg', message.deleteMsg)
router.post('/search', message.search)

module.exports = router