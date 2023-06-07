import PlayersTotal from '../models/playersTotalsModel.js'

export const getPlayersTotals = async (req, res) => {
	try {
		const playersTotals = await PlayersTotal.find()
		res.status(200).json(playersTotals)
	} catch (err) {
		res.status(404).json({ message: err.message })
	}
}
