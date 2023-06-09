import { Container, Grid, Box, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import backgroundKawhi from '../../public/images/kawhi-leonard.jpg'

const HomePage = () => {
	const theme = useTheme()
	const { league } = theme.palette

	return (
		<main
			style={{
				backgroundColor: league.nbaBackground,
				height: 'calc(100vh - 100px)',
				width: '100vw',
				padding: '0',
			}}>
			<Grid
				container
				columns={6}
				height='100%'>
				<Box
					sx={{
						width: '100vw',
						height: '50%',
						backgroundImage: 'url(../../public/images/kawhi-leonard.jpg)',
						backgroundPosition: 'center',
						backgroundSize: 'cover',
						color: league.nbaWhite,
					}}
					backgroundColor={league.nbaRed}>
					<Typography variant='h3'>Team Stats</Typography>
				</Box>
				<Box></Box>
			</Grid>
		</main>
	)
}

export default HomePage
