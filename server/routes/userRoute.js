import express from 'express'
import { getUser } from '../controllers/userController.js'
import { protect } from '../middleware/userAuthMiddleware.js'

const router = express.Router()

router.get('/profile', protect, getUser)

export default router
