import { Box, CircularProgress, Typography } from '@mui/material'
import { useTheme } from '@mui/material'

const LoadingScreen = () => {
	const theme = useTheme()
	const { league } = theme.palette

	return (
		<Box
			sx={{
				backgroundColor: league.nbaBackground,
				width: '100%',
				height: '100vh',
				display: 'flex',
				flexDirection: 'column',
				gap: '60px',
				alignItems: 'center',
				justifyContent: 'flex-start',
				mt: '3rem',
			}}>
			<Typography
				variant='h3'
				sx={{ color: league.nbaWhite }}>
				Loading
			</Typography>
			<CircularProgress />
		</Box>
	)
}

export default LoadingScreen
