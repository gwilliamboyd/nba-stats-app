import mongoose from 'mongoose'

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(
			'mongodb+srv://gwillboyd:TqRUS54bbGB81Vxo@stats.q8smoe6.mongodb.net/stats?retryWrites=true&w=majority',
			{
				useNewUrlParser: 'true',
				useUnifiedTopology: 'true',
			}
		)
		console.log(`MongoDB connected: ${conn.connection.host}`)
	} catch (err) {
		console.error(`Error ${err.message}`)
		process.exit(1)
	}
}

export default connectDB
