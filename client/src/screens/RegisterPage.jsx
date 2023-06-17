/* eslint-disable react/no-unescaped-entities */
import { Box, TextField, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { Container } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import Dropzone from 'react-dropzone'
import { useRegisterMutation } from '../slices/authentication/usersApiSlice'
import { setCredentials } from '../slices/authentication/authSlice'

const RegisterPage = () => {
	const theme = useTheme()
	const { league } = theme.palette

	const navigate = useNavigate()
	// redux
	const dispatch = useDispatch()
	// state
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [avatar, setAvatar] = useState('')

	const [register, { isLoading }] = useRegisterMutation()
	// Get user info
	/* 	const { userInfo } = useSelector(state => state.auth)

	useEffect(() => {
		if (userInfo) {
			navigate('/')
		}
	}, [navigate, userInfo]) */

	const submitHandler = async e => {
		e.preventDefault()
		try {
			await register({ name, email, password, avatar }).unwrap()
			// dispatch(setCredentials({ ...res }))
			navigate('/')
		} catch (err) {
			console.log(err?.data.message || err?.error)
		}
	}
	const passwordMatchHandler = async e => {
		e.preventDefault()
		return (
			<Box>
				<Typography>Passwords don't match</Typography>
			</Box>
		)
	}

	return (
		<Container
			disableGutters
			maxWidth='100%'
			sx={{
				display: 'flex',
				justifyContent: 'center',
			}}>
			<Box
				sx={{
					marginTop: '3rem',
					height: 'calc(100vh - 100px)',
					width: '75%',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					color: league.nbaWhite,
				}}>
				<form
					onSubmit={
						password === confirmPassword ? submitHandler : passwordMatchHandler
					}
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}>
					<Typography>Name</Typography>
					<TextField
						required
						id='outlined-required'
						label='Required'
						type='name'
						onChange={e => setName(e.target.value)}
						placeholder='Name'
						sx={{ input: { color: '#FFF' }, label: { color: '#FFF' } }}
						value={name}
					/>
					<Typography>Email</Typography>
					<TextField
						required
						id='outlined-required'
						label='Required'
						type='email'
						onChange={e => setEmail(e.target.value)}
						placeholder='Email'
						sx={{ input: { color: '#FFF' }, label: { color: '#FFF' } }}
						value={email}
					/>
					<Typography>Password</Typography>
					<TextField
						required
						id='outlined-required'
						label='Required'
						type='password'
						onChange={e => setPassword(e.target.value)}
						placeholder='Password'
						sx={{ input: { color: '#FFF' }, label: { color: '#FFF' } }}
						value={password}
					/>
					<Typography>Confirm Password</Typography>
					<TextField
						required
						id='outlined-required'
						label='Required'
						type='password'
						onChange={e => setConfirmPassword(e.target.value)}
						placeholder='Confirm Password'
						sx={{ input: { color: '#FFF' }, label: { color: '#FFF' } }}
						value={confirmPassword}
					/>
					<Typography>Upload Profile Picture</Typography>
					<Dropzone
						onDrop={acceptedFiles => {
							console.log(acceptedFiles[0].name)
							setAvatar(acceptedFiles[0].name)
						}}>
						{({ getRootProps, getInputProps }) => (
							<section
								style={{
									border: `2px solid ${league.nbaWhite}`,
									padding: '0 1rem',
								}}>
								<div {...getRootProps()}>
									<input {...getInputProps()} />
									<p>Drag image here, or click to select file</p>
								</div>
							</section>
						)}
					</Dropzone>
					<button type='submit'>Submit</button>
				</form>
			</Box>
		</Container>
	)
}

export default RegisterPage
