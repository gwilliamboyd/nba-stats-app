import express from 'express'
import {
	getPlayersPerGame,
	getPlayersTotals,
	getPlayersAdvanced,
	getIndivPlayerStats,
	// getOnePlayerTotals,
	// getOnePlayerPerGame,
} from '../controllers/playersController.js'

const router = express.Router()

router.get('/per-game', getPlayersPerGame)
router.get('/total', getPlayersTotals)
router.get('/advanced', getPlayersAdvanced)
router.get('/:id', getIndivPlayerStats)
// router.get('/total/:id', getOnePlayerTotals)
// router.get('/per-game/:id', getOnePlayerPerGame)

export default router
