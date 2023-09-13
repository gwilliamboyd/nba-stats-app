/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from 'react'
import { useTheme } from '@emotion/react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../../slices/authentication/usersApiSlice'
import {
	setCredentials,
	setSnackbar,
} from '../../slices/authentication/authSlice'
// mui
import { Box, Button, Container, Typography } from '@mui/material'
import TextFieldContainer from '../../components/layout/users/TextFieldContainer'
import ErrorSnackbar from '../../components/snackbars/ErrorSnackbar'
// icons
import EmailIcon from '@mui/icons-material/Email'
import KeyIcon from '@mui/icons-material/Key'

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
	const { snackbarIsOpen } = useSelector(state => state.auth)

	const handleIncorrectPassword = async () => {
		dispatch(setSnackbar({ incorrectPasswordSnackbar: true }))
	}

	const submitHandler = async e => {
		e.preventDefault()

		try {
			const res = await login({ email, password }).unwrap()
			dispatch(setCredentials({ ...res }))
			dispatch(setSnackbar({ loginSnackbar: true }))
			navigate('/', { state: { page: 'login' } })
		} catch (err) {
			console.log(err?.data.message || err?.error)
			if (err.status === 403 || err.status === 400) {
				handleIncorrectPassword()
			}
		}
	}

	// Navigate to home if logged in after clicking Login screen
	useEffect(() => {
		if (userInfo) {
			navigate('/')
		}
	}, [navigate, userInfo])

	// style rules for text fields
	const textFieldStyles = {
		justifySelf: 'flex-start',
		width: { xs: '300px', md: '300px' },
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
					width: { xs: '95%', sm: '80%', lg: '75%' },
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					color: league.nbaWhite,
					gap: '2rem',
				}}>
				<ErrorSnackbar
					open={snackbarIsOpen.incorrectPasswordSnackbar}
					message={'Incorrect email or password'}
				/>
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
						width: { xs: '95%', sm: '520px', md: '820px', lg: '640px' },
						height: {
							xs: 'fit-content',
							sm: '400px',
							lg: 'fit-content',
						},
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
							justifyContent: 'center',
							gap: '2rem',
							backgroundColor: 'rgba(37, 59, 115, 0.8)',
						}}>
						<TextFieldContainer
							width={'300px'}
							icon={<EmailIcon fontSize='medium' />}
							heading={'Email'}
							fontSize={'21px'}
							onChange={e => setEmail(e.target.value)}
							value={email}
							textFieldStyles={textFieldStyles}
						/>
						<TextFieldContainer
							width={'300px'}
							icon={<KeyIcon fontSize='medium' />}
							heading={'Password'}
							fontSize={'21px'}
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
