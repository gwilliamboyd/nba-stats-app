/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from 'react'
import { useTheme } from '@emotion/react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../../slices/authentication/usersApiSlice'
import { setCredentials } from '../../slices/authentication/authSlice'
// mui
import {
	Box,
	Button,
	Container,
	/* IconButton,
	Snackbar, */
	Typography,
} from '@mui/material'
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
			navigate('/', { state: { fromLoginPage: true } })
			// setSnackbarOpen(true)
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
	// style rules for text fields
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
				backgroundImage: 'url(/login-background.jpg)',
				backgroundPosition: '50% 18%',
				backgroundSize: 'cover',
			}}>
			<Box
				sx={{
					marginTop: '3rem',
					width: { xs: '95%', lg: '75%' },
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					color: league.nbaWhite,
					gap: '2rem',
				}}>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'baseline',
						gap: '2rem',
					}}>
					<Typography
						variant='h3'
						fontWeight={900}>
						Login
					</Typography>
				</Box>
				<Box
					sx={{
						width: { xs: '95%', lg: '40%' },
						height: { xs: 'fit-content', sm: '500px', lg: 'fit-content' },
						display: 'flex',
						justifyContent: 'center',
					}}>
					<form
						onSubmit={submitHandler}
						style={{
							height: '100%',
							padding: '3rem 0',
							width: '100%',
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							gap: '2rem',
							backgroundColor: 'rgba(37, 59, 115, 0.8)',
						}}>
						<TextFieldContainer
							heading={'Email'}
							onChange={e => setEmail(e.target.value)}
							value={email}
							textFieldStyles={textFieldStyles}
						/>
						<TextFieldContainer
							heading={'Password'}
							onChange={e => setPassword(e.target.value)}
							type={'password'}
							value={password}
							textFieldStyles={textFieldStyles}
						/>
						<Button
							variant='contained'
							type='submit'>
							Submit
						</Button>
					</form>
				</Box>
			</Box>
		</Container>
	)
}

export default LoginPage
