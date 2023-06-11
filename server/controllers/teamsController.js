import TeamsPerGame from '../models/teamsPerGameModel.js'
import TeamsTotal from '../models/teamsTotalModel.js'
import TeamsAdvanced from '../models/teamsAdvancedModel.js'

export const getTeamsPerGame = async (req, res) => {
	try {
		const teamsPerGame = await TeamsPerGame.find()
		res.status(200).json(teamsPerGame)
	} catch (err) {
		res.status(404).json({ message: err.message })
	}
}
export const getTeamsTotal = async (req, res) => {
	try {
		const teamsTotal = await TeamsTotal.find()
		res.status(200).json(teamsTotal)
	} catch (err) {
		res.status(404).json({ message: err.message })
	}
}
export const getTeamsAdvanced = async (req, res) => {
	try {
		const teamsAdvanced = await TeamsAdvanced.find()
		res.status(200).json(teamsAdvanced)
	} catch (err) {
		res.status(404).json({ message: err.message })
	}
}

export const getIndivTeamStats = async (req, res) => {
	try {
		const teamName = req.originalUrl.slice(-3)
		const teamIndivPerGame = await TeamsPerGame.find({
			team: teamName,
		})
		const teamIndivTotal = await TeamsTotal.find({ team: teamName })
		const teamIndivAdvanced = await TeamsAdvanced.find({
			team: teamName,
		})
		const teamIndivStats = [teamIndivPerGame, teamIndivTotal, teamIndivAdvanced]
		res.status(200).json(teamIndivStats)
	} catch (err) {
		res.status(404).json({ message: err.message })
	}
}
