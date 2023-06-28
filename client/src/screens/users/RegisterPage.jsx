/* eslint-disable react/no-unescaped-entities */
import { Box, TextField, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { Container } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import Dropzone from 'react-dropzone'
import { useRegisterMutation } from '../../slices/authentication/usersApiSlice'
import { setCredentials } from '../../slices/authentication/authSlice'
import TextFieldContainer from '../../components/layout/users/TextFieldContainer'

const RegisterPage = () => {
	const theme = useTheme()
	const { league } = theme.palette

	const textFieldStyles = {
		input: { color: '#FFF' },
		label: { color: '#FFF' },
		fieldset: { borderColor: 'lightgray' },
		'& .MuiOutlinedInput-root:hover': {
			'& > fieldset': {
				borderColor: 'white',
			},
		},
		'& .MuiOutlinedInput-root.Mui-focused.MuiOutlinedInput-notchedOutline': {
			'& > fieldset': {
				borderColor: 'yellow',
			},
		},
	}

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
				height: 'calc(100vh - 100px)',
				display: 'flex',
				justifyContent: 'center',
				backgroundImage: 'url(../../public/images/registration-background.jpg)',
				backgroundPosition: 'center',
				backgroundSize: 'cover',
			}}>
			<Box
				sx={{
					marginTop: '2rem',
					// height: 'calc(100vh - 100px)',
					width: '75%',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					color: league.nbaWhite,
					gap: '2rem',
				}}>
				<Box sx={{ display: 'flex', alignItems: 'baseline', gap: '2rem' }}>
					<Typography
						variant='h3'
						fontWeight={900}>
						Register
					</Typography>
					<Typography variant='h5'>
						Sign up for an account to follow your favorite teams!
					</Typography>
				</Box>
				<form
					onSubmit={
						password === confirmPassword ? submitHandler : passwordMatchHandler
					}
					style={{
						padding: '3rem 0',
						width: '60%',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						gap: '2rem',
						backgroundColor: 'rgba(37, 59, 115, 0.8)',
						border: `2px solid ${league.nbaWhite}`,
					}}>
					<TextFieldContainer>
						<Box
							sx={{
								width: '40%',
								display: 'flex',
								justifyContent: 'flex-end',
							}}>
							<Typography
								textAlign='right'
								tableCellStyles
								variant='h6'>
								Name
							</Typography>
						</Box>
						<TextField
							required
							id='outlined-required'
							label='Required'
							type='name'
							onChange={e => setName(e.target.value)}
							placeholder='Name'
							sx={textFieldStyles}
							value={name}
						/>
					</TextFieldContainer>
					<TextFieldContainer>
						<Box
							sx={{
								width: '40%',
								display: 'flex',
								justifyContent: 'flex-end',
							}}>
							<Typography
								tableCellStyles
								variant='h6'>
								Email
							</Typography>
						</Box>
						<TextField
							required
							id='outlined-required'
							label='Required'
							type='email'
							onChange={e => setEmail(e.target.value)}
							placeholder='Email'
							sx={textFieldStyles}
							value={email}
						/>
					</TextFieldContainer>
					<TextFieldContainer>
						<Box
							sx={{
								width: '40%',
								display: 'flex',
								justifyContent: 'flex-end',
							}}>
							<Typography
								tableCellStyles
								variant='h6'>
								Password
							</Typography>
						</Box>
						<TextField
							required
							id='outlined-required'
							label='Required'
							type='password'
							onChange={e => setPassword(e.target.value)}
							placeholder='Password'
							sx={textFieldStyles}
							value={password}
						/>
					</TextFieldContainer>
					<TextFieldContainer>
						<Box
							sx={{
								width: '40%',
								display: 'flex',
								justifyContent: 'flex-end',
							}}>
							<Typography variant='h6'>Confirm Password</Typography>
						</Box>
						<TextField
							required
							id='outlined-required'
							label='Required'
							type='password'
							onChange={e => setConfirmPassword(e.target.value)}
							placeholder='Confirm Password'
							sx={textFieldStyles}
							value={confirmPassword}
						/>
					</TextFieldContainer>
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
