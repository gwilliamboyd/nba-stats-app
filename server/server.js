// Libraries
import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'
// Middleware
import connectDB from './config/database.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
// Files
import playersRoutes from './routes/playersRoutes.js'
import teamsRoutes from './routes/teamsRoutes.js'
import standingsRoutes from './routes/standingsRoute.js'
// import registrationRoute from './routes/registrationRoute.js'
import loginRoute from './routes/loginRoute.js'
import logoutRoute from './routes/logoutRoute.js'
import userRoute from './routes/userRoute.js'
import { registerUser } from './controllers/authController.js'
// Configure dir/file for image upload
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
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
app.use(cors({ origin: true, credentials: true }))
app.use(cookieParser())
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ extended: true }))
app.use('/assets', express.static(path.join(__dirname, 'public/assets')))
// Image upload
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './server/public/assets')
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname)
	},
})
// const upload = multer({ storage: storage })
const upload = multer({ dest: 'public/assets/' })

// Routes
app.use('/stats/players', playersRoutes)
app.use('/stats/teams', teamsRoutes)
app.use('/standings', standingsRoutes)
// Register from route file
// app.use('/users/register', upload.single('avatar'), registrationRoute)
// Putting this in the server file to get multer upload to work
app.post('/users/register', upload.single('userAvatar'), registerUser)
app.use('/users/login', loginRoute)
app.use('/users/logout', logoutRoute)
app.use('/users', userRoute)
// index
app.get('/', (req, res) => res.send('NBA Stats App'))

// Error handling
app.use(notFound)
app.use(errorHandler)

// Server init
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
