import express from 'express'
import {
	getPlayersTotals,
	// getOnePlayerTotals,
	// getPlayersPerGame,
	// getOnePlayerPerGame,
} from '../controllers/playersController.js'

const router = express.Router()

router.get('/totals', getPlayersTotals)
// router.get('/totals/:id', getOnePlayerTotals)
// router.get('/per-game', getPlayersPerGame)
// router.get('/per-game/:id', getOnePlayerPerGame)

export default router
