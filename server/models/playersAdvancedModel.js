import mongoose from 'mongoose'

const PlayersAdvancedSchema = mongoose.Schema({
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
	team: {
		type: String,
		required: true,
	},
	g: {
		type: Number,
		required: true,
	},
	mp: {
		type: Number,
		required: true,
	},
	per: {
		type: Number,
		required: true,
	},
	tsPer: {
		type: Number,
		required: true,
	},
	$3pAr: {
		type: Number,
		required: true,
	},
	ftr: {
		type: Number,
		required: true,
	},
	orbPer: {
		type: Number,
		required: true,
	},
	drbPer: {
		type: Number,
		required: true,
	},
	trbPer: {
		type: Number,
		required: true,
	},
	astPer: {
		type: Number,
		required: true,
	},
	stlPer: {
		type: Number,
		required: true,
	},
	blkPer: {
		type: Number,
		required: true,
	},
	tovPer: {
		type: Number,
		required: true,
	},
	usgPer: {
		type: Number,
		required: true,
	},
	ows: {
		type: Number,
		required: true,
	},
	dws: {
		type: Number,
		required: true,
	},
	ws: {
		type: Number,
		required: true,
	},
	ws48: {
		type: Number,
		required: true,
	},
	obpm: {
		type: Number,
		required: true,
	},
	dbpm: {
		type: Number,
		required: true,
	},
	bpm: {
		type: Number,
		required: true,
	},
	worp: {
		type: Number,
		required: true,
	},
	playerAdditional: {
		type: String,
		required: true,
		unique: true,
	},
})

const PlayersAdvanced = mongoose.model('PlayersAdvanced', PlayersAdvancedSchema)
export default PlayersAdvanced
