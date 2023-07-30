import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'
import asyncHandler from 'express-async-handler'

export const registerUser = asyncHandler(async (req, res) => {
	try {
		const { name, email, password, avatar, favoriteTeams } = req.body
		console.log(req.file)

		const salt = await bcrypt.genSalt()
		const passwordHash = await bcrypt.hash(password, salt)

		const newUser = new User({
			name,
			email,
			password: passwordHash,
			avatar,
			favoriteTeams,
		})
		if (newUser) {
			// generateToken(res, newUser._id)
			res.status(201).json({
				_id: newUser._id,
				name: newUser.name,
				email: newUser.email,
				avatar: newUser.avatar,
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
	const { email, password } = req.body

	const user = await User.findOne({ email: email })
	if (!user) {
		return res.status(400).json({ message: 'User does not exist' })
	}

	const isMatch = await bcrypt.compare(password, user.password)
	if (!isMatch) {
		return res.status(400).json({ message: 'Invalid email or password' })
	}
	// delete user.password

	const token = jwt.sign({ user }, 'Toolfan123458', { expiresIn: '2d' })

	res.cookie('token', token, {
		domain: 'https://nba-stats-app-62o4.onrender.com',
		path: '/',
		httpOnly: true,
		secure: true,
		sameSite: 'none',
	})
	res.status(200).json({
		_id: user._id,
		name: user.name,
		email: user.email,
		avatar: user.avatar,
		favoriteTeams: user.favoriteTeams,
		token: token,
	})
})

export const logoutUser = (req, res) => {
	res.clearCookie('token', {
		domain: 'nba-stats-app-62o4.onrender.com',
		path: '/',
		httpOnly: true,
		secure: true,
		sameSite: 'none',
	})

	res.status(200).json({ message: 'Logged out successfully' })
}
export const getUser = asyncHandler(async (req, res) => {
	// TRAVERSY METHOD
	const user = {
		_id: req.user._id,
		name: req.user.name,
		email: req.user.email,
		avatar: req.user.avatar,
		favoriteTeams: req.user.favoriteTeams,
	}
	res.status(200).json(user)
})

export const updateUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id)
	if (user) {
		user.name = req.body.name || user.name
		user.email = req.body.email || user.email
		user.avatar = req.body.avatar || user.avatar
		user.favoriteTeams = req.body.favoriteTeams || user.favoriteTeams
		if (req.body.password) {
			user.password = req.body.password
		}
		const updatedUser = await user.save()

		res.status(200).json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			avatar: updatedUser.avatar,
			favoriteTeams: updatedUser.favoriteTeams,
		})
	} else {
		res.status(404)
		throw new Error('User not found')
	}
	res.status(200).json({ message: 'Updated profile' })
})
