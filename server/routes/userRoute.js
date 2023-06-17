import express from 'express'
import { getUser, updateUser } from '../controllers/userController.js'
import { protect } from '../middleware/userAuthMiddleware.js'

const router = express.Router()

router.route('/profile').get(protect, getUser).put(protect, updateUser)

export default router
