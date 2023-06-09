import express from 'express'
import { getTeamsPerGame } from '../controllers/teamsController.js'

const router = express.Router()

router.get('/', getTeamsPerGame)

export default router
