import PlayersPerGame from '../models/playersPerGameModel.js'
import PlayersTotal from '../models/playersTotalsModel.js'
import PlayersAdvanced from '../models/playersAdvancedModel.js'

export const getPlayersPerGame = async (req, res) => {
	try {
		const playersPerGame = await PlayersPerGame.find()
		res.status(200).json(playersPerGame)
	} catch (err) {
		res.status(404).json({ message: err.message })
	}
}

export const getPlayersTotals = async (req, res) => {
	try {
		const playersTotals = await PlayersTotal.find()
		res.status(200).json(playersTotals)
	} catch (err) {
		res.status(404).json({ message: err.message })
	}
}

export const getPlayersAdvanced = async (req, res) => {
	try {
		const playersAdvanced = await PlayersAdvanced.find()
		res.status(200).json(playersAdvanced)
	} catch (err) {
		res.status(404).json({ message: err.message })
	}
}
