const express = require('express')
const router = express.Router()
const collect = require('../controllers/collect')

router.post('/createCollect', collect.createCollect)
router.post('/getCollectByUid', collect.getCollectByUid)
router.post('/getCollectById', collect.getCollectById)
router.post('/search', collect.search)

module.exports = router