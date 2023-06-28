/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from 'react'
import { useTheme } from '@emotion/react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../../slices/authentication/usersApiSlice'
import { setCredentials } from '../../slices/authentication/authSlice'
// mui
import { Box, Button, Container, TextField, Typography } from '@mui/material'
import TextFieldContainer from '../../components/layout/users/TextFieldContainer'

const LoginPage = () => {
	//theme
	const theme = useTheme()
	const { league } = theme.palette

	const navigate = useNavigate()
	// redux
	const dispatch = useDispatch()
	// state
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const [login, { isLoading }] = useLoginMutation()
	// Get user info
	const { userInfo } = useSelector(state => state.auth)

	// Navigate to home if logged in after clicking Login screen
	useEffect(() => {
		if (userInfo) {
			navigate('/')
		}
	}, [navigate, userInfo])

	const submitHandler = async e => {
		e.preventDefault()
		try {
			const res = await login({ email, password }).unwrap()
			dispatch(setCredentials({ ...res }))
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
	const textFieldStyles = {
		input: { color: '#FFF' },
		label: { color: '#FFF' },
		fieldset: { borderColor: 'lightgray' },
		'& .MuiOutlinedInput-root:hover': {
			'& > fieldset': {
				borderColor: 'white',
			},
		},
	}

	return (
		<Container
			disableGutters
			maxWidth='100%'
			sx={{
				height: 'calc(100vh - 100px)',
				display: 'flex',
				justifyContent: 'center',
				backgroundImage: 'url(../../public/images/login-background.jpg)',
				backgroundPosition: '50% 18%',
				backgroundSize: 'cover',
			}}>
			<Box
				sx={{
					marginTop: '3rem',
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
						Login
					</Typography>
					<Typography variant='h5'>
						Sign up for an account to follow your favorite teams!
					</Typography>
				</Box>
				<form
					onSubmit={submitHandler}
					style={{
						padding: '3rem 0',
						width: '60%',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						gap: '2rem',
						backgroundColor: 'rgba(37, 59, 115, 0.8)',
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
								textAlign='right'
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
					<Button type='submit'>Submit</Button>
				</form>
			</Box>
		</Container>
	)
}

export default LoginPage
