import { Box, TextField } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { Container } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useRegisterMutation } from '../slices/authentication/usersApiSlice'
import { setCredentials } from '../slices/authentication/authSlice'

const RegisterPage = () => {
	const theme = useTheme()
	const { league } = theme.palette

	const navigate = useNavigate()
	// redux
	const dispatch = useDispatch()
	// state
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const [login, { isLoading }] = useRegisterMutation()
	// Get user info
	const { userInfo } = useSelector(state => state.auth)

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
					onSubmit={submitHandler}
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}>
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

export default RegisterPage
