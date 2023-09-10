/* eslint-disable react/no-unescaped-entities */
import { Box, Button, Typography } from '@mui/material'
// import LoadingButton from '@mui/lab/LoadingButton'
import { useTheme } from '@mui/material/styles'
import { Container } from '@mui/material'
import { useNavigate } from 'react-router-dom'
// import { useDispatch } from 'react-redux'
import { useState } from 'react'
// import Dropzone from 'react-dropzone'
import { useRegisterMutation } from '../../slices/authentication/usersApiSlice'
// import { setCredentials } from '../../slices/authentication/authSlice'
import TextFieldContainer from '../../components/layout/users/TextFieldContainer'
import Dropzone from 'react-dropzone'
import { useDispatch, useSelector } from 'react-redux'
import { setSnackbar } from '../../slices/authentication/authSlice'
import ErrorSnackbar from '../../components/snackbars/ErrorSnackbar'

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
	}

	const navigate = useNavigate()
	// redux
	const dispatch = useDispatch()
	const { snackbarIsOpen } = useSelector(state => state.auth)
	// state
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [avatar, setAvatar] = useState('')
	const [userAvatar, setUserAvatar] = useState('')
	// loading button state
	const [loading, setLoading] = useState(false)

	// const joinDate = new Date()

	const [register, { isLoading }] = useRegisterMutation()

	const submitHandler = async e => {
		setLoading(true)
		e.preventDefault()
		try {
			const formData = new FormData()
			formData.append('name', name)
			formData.append('email', email)
			formData.append('password', password)
			formData.append('avatar', avatar)
			formData.append('userAvatar', userAvatar)
			console.log(formData)
			// await register({ name, email, password, avatar }).unwrap()
			await register(formData)
			// dispatch(setCredentials({ ...register }))
			dispatch(setSnackbar({ registerSnackbar: true }))
			setLoading(false)
			navigate('/')
		} catch (err) {
			console.log(err?.data.message || err?.error)
		}
	}
	const passwordMatchHandler = async e => {
		e.preventDefault()
		console.log("Passwords don't match")
		dispatch(setSnackbar({ passwordMismatchSnackbar: true }))
	}

	return (
		<Container
			disableGutters
			maxWidth='100%'
			sx={{
				height: { xs: '100%', md: 'calc(100vh - 100px)' },
				display: 'flex',
				justifyContent: 'center',
				backgroundImage: 'url(/images/registration-background.jpg)',
				backgroundPosition: 'center',
				backgroundSize: 'cover',
			}}>
			<Box
				sx={{
					marginTop: '2rem',
					width: { xs: '95%', lg: '75%' },
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					color: league.nbaWhite,
					gap: '2rem',
					paddingBottom: { xs: '2rem', md: '0' },
				}}>
				<ErrorSnackbar
					open={snackbarIsOpen.passwordMismatchSnackbar}
					message={"Passwords don't match"}
				/>
				<Box
					sx={{
						display: 'flex',
						flexDirection: { xs: 'column', md: 'row' },
						alignItems: 'baseline',
						gap: '2rem',
					}}>
					<Typography
						variant='h3'
						fontWeight={900}>
						Register
					</Typography>
					<Typography
						sx={{ display: { xs: 'none', md: 'block' } }}
						variant='h5'>
						Sign up for an account to follow your favorite teams!
					</Typography>
				</Box>
				<Box
					sx={{
						width: { xs: '95%', lg: '70%' },
						height: { xs: 'fit-content', sm: '500px', lg: 'fit-content' },
						display: 'flex',
						justifyContent: 'center',
					}}>
					<form
						// action='/users/register'
						method='post'
						encType='multipart/form-data'
						onSubmit={
							password === confirmPassword
								? submitHandler
								: passwordMatchHandler
						}
						style={{
							padding: '3rem 0',
							width: '100%',
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							gap: '2rem',
							backgroundColor: 'rgba(37, 59, 115, 0.8)',
							// border: `2px solid ${league.nbaWhite}`,
						}}>
						<TextFieldContainer
							heading={'Name'}
							onChange={e => setName(e.target.value)}
							value={name}
							textFieldStyles={textFieldStyles}
						/>
						<TextFieldContainer
							heading={'Email'}
							onChange={e => setEmail(e.target.value)}
							value={email}
							textFieldStyles={textFieldStyles}
						/>
						<TextFieldContainer
							heading={'Password'}
							onChange={e => setPassword(e.target.value)}
							type='password'
							value={password}
							textFieldStyles={textFieldStyles}
						/>
						<TextFieldContainer
							heading={'Confirm Password'}
							onChange={e => setConfirmPassword(e.target.value)}
							type='password'
							value={confirmPassword}
							textFieldStyles={textFieldStyles}
						/>
						<Typography>Upload Profile Picture</Typography>
						<Dropzone
							onDrop={acceptedFiles => {
								console.log(acceptedFiles[0].name)
								setAvatar(acceptedFiles[0].name)
								setUserAvatar(acceptedFiles[0])
							}}>
							{({ getRootProps, getInputProps }) => (
								<section
									style={{
										border: `2px solid ${league.nbaWhite}`,
										padding: '0 1rem',
									}}>
									<div {...getRootProps()}>
										<input
											type='file'
											name='userAvatar'
											{...getInputProps()}
											/* onChange={e => {
								console.log(e.target.files[0].name)
								setAvatar(e.target.files[0].name)
								setUserAvatar(e.target.files[0])
							}} */
										/>
										<p>Drag image here, or click to select file</p>
									</div>
								</section>
							)}
						</Dropzone>

						<Button
							// loading={loading}
							// loadingPosition='end'
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

export default RegisterPage
