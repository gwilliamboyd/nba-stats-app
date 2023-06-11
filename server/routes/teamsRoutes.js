import express from 'express'
import {
	getTeamsPerGame,
	getTeamsTotal,
	getTeamsAdvanced,
	getIndivTeamStats,
} from '../controllers/teamsController.js'

const router = express.Router()

router.get('/per-game', getTeamsPerGame)
router.get('/total', getTeamsTotal)
router.get('/advanced', getTeamsAdvanced)
router.get('/:id', getIndivTeamStats)

export default router
