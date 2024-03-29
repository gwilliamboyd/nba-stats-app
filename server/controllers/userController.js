import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'

export const getUser = asyncHandler(async (req, res) => {
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
		if (req.body.password) {
			user.password = req.body.password
		}
		user.avatar = req.body.avatar || user.avatar
		user.favoriteTeams = req.body.favoriteTeams || user.favoriteTeams
		const updatedUser = await user.save()

		res.status(204).json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			password: updateUser.password,
			favoriteTeams: updateUser.favoriteTeams,
		})
	} else {
		res.status(404)
		throw new Error('User not found')
	}
	res.status(204).json({ message: 'Updated profile' })
})
