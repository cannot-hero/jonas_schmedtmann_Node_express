const express = require('express')
const viewController = require('./../controllers/viewsController')
const authController = require('../controllers/authController')

const router = express.Router()

router.use(authController.isLoggedIn)
// 3. ROUTE
// 连接模板 router.get('/') '/' root of website
router.get('/', viewController.getOverview)
router.get('/tour/:slug', viewController.getTour)
router.get('/login', viewController.getLoginForm)

module.exports = router
