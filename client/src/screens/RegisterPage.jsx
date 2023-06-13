import { Box } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { Container } from '@mui/material'

const RegisterPage = () => {
	const theme = useTheme()
	const { league } = theme.palette

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
				}}></Box>
		</Container>
	)
}

export default RegisterPage
