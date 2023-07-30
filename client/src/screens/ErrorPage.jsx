import { Box, Container, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'

const ErrorPage = () => {
	const theme = useTheme()
	const { league } = theme.palette
	return (
		<Container
			maxWidth='100%'
			sx={{
				height: 'calc(100vh - 100px)',
				backgroundColor: league.nbaBackground,
			}}>
			<Box
				sx={{
					width: '100%',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					gap: '2.5rem',
				}}>
				<Typography
					variant='h1'
					fontWeight={700}
					sx={{ color: league.nbaWhite }}>
					<span style={{ color: league.nbaRed }}>404</span> Error!
				</Typography>
				<Typography
					variant='h3'
					fontWeight={600}
					sx={{ color: league.nbaWhite }}>
					Looks like something went wrong on our end!
				</Typography>
				<Typography
					variant='h4'
					fontWeight={600}
					sx={{ color: league.nbaWhite, textAlign: 'center' }}>
					Please click the{' '}
					<span style={{ color: league.nbaRed }}>back button</span> to return to
					the previous page, <br />
					and we'll come out stronger in the second half!
				</Typography>
			</Box>
		</Container>
	)
}

export default ErrorPage
