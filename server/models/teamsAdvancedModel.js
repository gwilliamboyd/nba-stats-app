import mongoose from 'mongoose'

const TeamsAdvancedSchema = mongoose.Schema({
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
	age: {
		type: Number,
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
	pw: {
		type: Number,
		required: true,
	},
	pl: {
		type: Number,
		required: true,
	},
	mov: {
		type: Number,
		required: true,
	},
	sos: {
		type: Number,
		required: true,
	},
	srs: {
		type: Number,
		required: true,
	},
	ortg: {
		type: Number,
		required: true,
	},
	drtg: {
		type: Number,
		required: true,
	},
	nrtg: {
		type: Number,
		required: true,
	},
	pace: {
		type: Number,
		required: true,
	},
	ftr: {
		type: Number,
		required: true,
	},
	$3par: {
		type: Number,
		required: true,
	},
	tsPer: {
		type: Number,
		required: true,
	},
	offeFGPer: {
		type: Number,
		required: true,
	},
	offtovPer: {
		type: Number,
		required: true,
	},
	offorbPer: {
		type: Number,
		required: true,
	},
	offftFGA: {
		type: Number,
		required: true,
	},
	dffeFGPer: {
		type: Number,
		required: true,
	},
	dfftovPer: {
		type: Number,
		required: true,
	},
	dffdrbPer: {
		type: Number,
		required: true,
	},
	dffftFGA: {
		type: Number,
		required: true,
	},
})

const TeamsAdvanced = mongoose.model('TeamsAdvanced', TeamsAdvancedSchema)
export default TeamsAdvanced
