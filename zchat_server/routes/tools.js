const express = require('express')
const router = express.Router()
const tools = require('../controllers/tools')

router.post('/weather', tools.weather)
router.post('/express', tools.express)
router.get('/expressType', tools.expressType)
router.post('/robot', tools.robot)

module.exports = router