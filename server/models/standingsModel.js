import mongoose from 'mongoose'

const StandingsSchema = mongoose.Schema({
	team: {
		type: String,
		required: true,
		maxLength: 3,
	},
	conference: {
		type: String,
		required: true,
		maxLength: 4,
	},
	w: {
		type: Number,
		required: true,
		maxLength: 2,
	},
	l: {
		type: Number,
		required: true,
		maxLength: 2,
	},
})

const Standings = mongoose.model('Standing', StandingsSchema)
export default Standings
