// Libraries
import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
// Middleware
import connectDB from './config/database.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
// Files
import playersRoutes from './routes/playersRoutes.js'
import teamsRoutes from './routes/teamsRoutes.js'
// Enable .env
dotenv.config()
// Connect to Mongo
connectDB()
// Vars
const PORT = process.env.PORT || 8000
const app = express()

// Middleware
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
app.use(cors())
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

// Routes
app.use('/stats/players', playersRoutes)
app.use('/stats/teams', teamsRoutes)
// index
app.get('/', (req, res) => res.send('NBA Stats App'))

// Error handling
app.use(notFound)
app.use(errorHandler)

// Server init
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
