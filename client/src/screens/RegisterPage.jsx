import { Box } from '@mui/material'
import { createTheme, useTheme, ThemeProvider } from '@mui/material/styles'
import { outlinedInputClasses } from '@mui/material/OutlinedInput'
import { Container, TextField } from '@mui/material'
import { ErrorMessage, Field, Form, Formik } from 'formik'

const customTheme = outerTheme =>
	createTheme({
		palette: {
			mode: outerTheme.palette.mode,
		},
		components: {
			MuiTextField: {
				styleOverrides: {
					root: {
						'--TextField-brandBorderColor': '#E0E3E7',
						'--TextField-brandBorderHoverColor': '#B2BAC2',
						'--TextField-brandBorderFocusedColor': '#6F7E8C',
						'& label.Mui-focused': {
							color: 'var(--TextField-brandBorderFocusedColor)',
						},
					},
				},
			},
			MuiOutlinedInput: {
				styleOverrides: {
					notchedOutline: {
						borderColor: 'var(--TextField-brandBorderColor)',
					},
					root: {
						[`&:hover .${outlinedInputClasses.notchedOutline}`]: {
							borderColor: 'var(--TextField-brandBorderHoverColor)',
						},
						[`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
							borderColor: 'var(--TextField-brandBorderFocusedColor)',
						},
					},
				},
			},
			MuiFilledInput: {
				styleOverrides: {
					root: {
						'&:before, &:after': {
							borderBottom: '2px solid var(--TextField-brandBorderColor)',
						},
						'&:hover:not(.Mui-disabled, .Mui-error):before': {
							borderBottom: '2px solid var(--TextField-brandBorderHoverColor)',
						},
						'&.Mui-focused:after': {
							borderBottom:
								'2px solid var(--TextField-brandBorderFocusedColor)',
						},
					},
				},
			},
			MuiInput: {
				styleOverrides: {
					root: {
						'&:before': {
							borderBottom: '2px solid var(--TextField-brandBorderColor)',
						},
						'&:hover:not(.Mui-disabled, .Mui-error):before': {
							borderBottom: '2px solid var(--TextField-brandBorderHoverColor)',
						},
						'&.Mui-focused:after': {
							borderBottom:
								'2px solid var(--TextField-brandBorderFocusedColor)',
						},
					},
				},
			},
		},
	})

const RegisterPage = () => {
	const theme = useTheme()
	const outerTheme = useTheme()
	const { league } = theme.palette

	const handleTextFieldInput = (value, defaultValue) => {
		if (value === defaultValue) {
			value = ''
		}
		/* if (value !== '') return value
		else {
			value = ''
		} */
	}
	const handleTextFieldBlur = (value, defaultValue) => {
		if (value !== '') return
		else {
			value = defaultValue
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
				<Formik
					initialValues={{ email: '', password: '' }}
					validate={values => {
						const errors = {}
						if (!values.email) {
							errors.email = 'Required'
						} else if (
							!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
						) {
							errors.email = 'Invalid email address'
						}
						return errors
					}}
					onSubmit={(values, { setSubmitting }) => {
						setTimeout(() => {
							alert(JSON.stringify(values, null, 2))
							setSubmitting(false)
						}, 400)
					}}>
					{({ isSubmitting }) => (
						<form
							style={{
								display: 'flex',
								flexDirection: 'column',
								gap: '2rem',
							}}>
							<ThemeProvider theme={customTheme(outerTheme)}>
								<TextField
									required
									id='outlined-required'
									label='Required'
									type='text'
									/* onFocus={e => {
										handleTextFieldInput(e.target.value, 'asdf')
									}}
									onBlur={e => {
										handleTextFieldBlur(e.target.value, 'First and last name')
									}} */

									placeholder='First and last name'
									sx={{ input: { color: '#FFF' }, label: { color: '#FFF' } }}
								/>
								<TextField
									required
									id='outlined-required'
									label='Required'
									type='email'
									placeholder='Email'
									sx={{ input: { color: '#FFF' }, label: { color: '#FFF' } }}
								/>
								<TextField
									required
									id='outlined-required'
									label='Required'
									type='password'
									placeholder='Password'
									sx={{ input: { color: '#FFF' }, label: { color: '#FFF' } }}
								/>
								<TextField
									required
									id='outlined-required'
									label='Required'
									type='password'
									placeholder='Confirm password'
									sx={{ input: { color: '#FFF' }, label: { color: '#FFF' } }}
								/>
								<button
									type='submit'
									disabled={isSubmitting}>
									Submit
								</button>
							</ThemeProvider>
						</form>
					)}
				</Formik>
			</Box>
		</Container>
	)
}

export default RegisterPage
