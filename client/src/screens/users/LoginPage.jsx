import { useState, useEffect } from 'react'
import { useTheme } from '@emotion/react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { useLoginMutation } from '../../slices/authentication/usersApiSlice'
import { setCredentials } from '../../slices/authentication/authSlice'
// mui
import {
	Box,
	Container,
	FormControl,
	Input,
	InputLabel,
	OutlinedInput,
	TextField,
} from '@mui/material'

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
					color: league.nbaWhite,
				}}>
				<form
					onSubmit={submitHandler}
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}>
					<FormControl>
						<InputLabel htmlFor='component-outlined'>Name</InputLabel>
						<OutlinedInput
							color='primary'
							id='component-outlined'
							defaultValue='Composed TextField'
							label='Name'
						/>
					</FormControl>
					<TextField
						required
						id='outlined-required'
						label='Required'
						type='email'
						onChange={e => setEmail(e.target.value)}
						placeholder='Email'
						sx={{
							input: { color: '#FFF' },
							label: { color: '#FFF' },
							fieldset: { borderColor: 'white' },
						}}
						value={email}
					/>
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
					<button type='submit'>Submit</button>
				</form>
			</Box>
		</Container>
	)
}

export default LoginPage
