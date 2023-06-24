import mongoose from 'mongoose'

const LeagueStandingsSchema = mongoose.Schema({
	team: {
		type: String,
		required: true,
	},
	conference: {
		type: String,
		required: true,
	},
	w: {
		type: Number,
		required: true,
	},
	l: {
		type: Number,
		required: true,
	},
})

const LeagueStanding = mongoose.model('LeagueStanding', LeagueStandingsSchema)
export default LeagueStanding
