import mongoose from 'mongoose'

const PlayersTotalsSchema = mongoose.Schema({
	id: {
		type: Number,
		required: true,
		unique: true,
	},
	player: {
		type: String,
		required: true,
	},
	pos: {
		type: String,
		required: true,
	},
	age: {
		type: Number,
		required: true,
	},
	tm: {
		type: String,
		required: true,
	},
	g: {
		type: Number,
		required: true,
	},
	gs: {
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
	eFgPer: {
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
	playerAdditional: {
		type: String,
		required: true,
		unique: true,
	},
})

const PlayersTotal = mongoose.model('PlayersTotal', PlayersTotalsSchema)
export default PlayersTotal
