import TeamsPerGame from '../models/teamsPerGameModel.js'

export const getTeamsPerGame = async (req, res) => {
	try {
		const teamsPerGame = await TeamsPerGame.find()
		res.status(200).json(teamsPerGame)
	} catch (err) {
		res.status(404).json({ message: err.message })
	}
}
