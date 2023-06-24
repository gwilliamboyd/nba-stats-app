import express from 'express'
import { getStandings } from '../controllers/teamsController.js'

const router = express.Router()

router.get('/', getStandings)

export default router
