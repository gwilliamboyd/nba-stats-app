import express from 'express'
import {
	getTeamsPerGame,
	getTeamsTotal,
	getTeamsAdvanced,
} from '../controllers/teamsController.js'

const router = express.Router()

router.get('/per-game', getTeamsPerGame)
router.get('/total', getTeamsTotal)
router.get('/advanced', getTeamsAdvanced)

export default router
