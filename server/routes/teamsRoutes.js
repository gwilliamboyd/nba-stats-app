import express from 'express'
import {
	getTeamsPerGame,
	getTeamsTotal,
	getTeamsAdvanced,
	getIndivTeamStats,
	getStandings,
} from '../controllers/teamsController.js'

const router = express.Router()

router.get('/per-game', getTeamsPerGame)
router.get('/total', getTeamsTotal)
router.get('/advanced', getTeamsAdvanced)
router.get('/:id', getIndivTeamStats)
router.get('/standings', getStandings)

export default router
