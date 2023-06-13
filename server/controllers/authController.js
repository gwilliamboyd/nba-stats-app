import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'
import asyncHandler from 'express-async-handler'

export const registerUser = asyncHandler(async (req, res) => {
	try {
		const { name, email, password, favoriteTeams } = req.body

		const salt = await bcrypt.genSalt()
		const passwordHash = await bcrypt.hash(password, salt)

		const newUser = new User({
			name,
			email,
			password: passwordHash,
			favoriteTeams,
		})
		if (newUser) {
			generateToken(res, newUser._id)
			res.status(201).json({
				_id: newUser._id,
				name: newUser.name,
				email: newUser.email,
			})
		} else {
			res.status(400)
			throw new Error('Invalid user data')
		}
		const savedUser = await newUser.save()
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
})

export const loginUser = asyncHandler(async (req, res) => {
	try {
		const { email, password } = req.body

		const user = await User.findOne({ email: email })
		if (!user) {
			return res.status(400).json({ message: 'User does not exist' })
		}

		const isMatch = await bcrypt.compare(password, user.password)
		if (!isMatch) {
			return res.status(400).json({ message: 'Invalid email or password' })
		}

		generateToken(res, user._id)
		delete user.password
		res.status(200).json({
			_id: user._id,
			name: user.name,
			email: user.email,
		})
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
})

export const logoutUser = (req, res) => {
	res.cookie('jwt', '', { httpOnly: true, expires: new Date(0) })
	res.status(200).json({ message: 'Logged out successfully' })
}
