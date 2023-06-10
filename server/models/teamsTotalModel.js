import mongoose from 'mongoose'

const TeamsTotalSchema = mongoose.Schema({
	id: {
		type: Number,
		required: true,
		unique: true,
	},
	team: {
		type: String,
		required: true,
		unique: true,
		maxLength: 3,
	},
	g: {
		type: Number,
		required: true,
	},
	mp: {
		type: Number,
		required: true,
	},
	fg: {
		type: Number,
		required: true,
	},
	fga: {
		type: Number,
		required: true,
	},
	fgPer: {
		type: Number,
		required: true,
	},
	$3p: {
		type: Number,
		required: true,
	},
	$3pA: {
		type: Number,
		required: true,
	},
	$3pPer: {
		type: Number,
		required: true,
	},
	$2p: {
		type: Number,
		required: true,
	},
	$2pA: {
		type: Number,
		required: true,
	},
	$2pPer: {
		type: Number,
		required: true,
	},
	ft: {
		type: Number,
		required: true,
	},
	fta: {
		type: Number,
		required: true,
	},
	ftPer: {
		type: Number,
		required: true,
	},
	orb: {
		type: Number,
		required: true,
	},
	drb: {
		type: Number,
		required: true,
	},
	trb: {
		type: Number,
		required: true,
	},
	ast: {
		type: Number,
		required: true,
	},
	stl: {
		type: Number,
		required: true,
	},
	blk: {
		type: Number,
		required: true,
	},
	tov: {
		type: Number,
		required: true,
	},
	pf: {
		type: Number,
		required: true,
	},
	pts: {
		type: Number,
		required: true,
	},
})

const TeamsTotal = mongoose.model('TeamsTotal', TeamsTotalSchema)
export default TeamsTotal
