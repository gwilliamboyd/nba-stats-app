import { Container, Grid, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'

const HomePage = () => {
	const theme = useTheme()
	const { league } = theme.palette

	return (
		<Container
			sx={{ backgroundColor: league.nbaBlue, height: '100vh' }}
			maxWidth='100%'>
			<Grid
				container
				spacing={3}
				columns={12}
				direction='row'
				sx={{ backgroundColor: league.nbaBlue }}>
				<Grid
					item
					xs={3}>
					<Typography
						variant='h5'
						sx={{ color: league.nbaWhite, backgroundColor: league.nbaRed }}>
						NBA Stats App
					</Typography>
				</Grid>
				<Grid
					item
					xs={3}>
					<Typography
						variant='h5'
						sx={{ color: league.nbaBlack, backgroundColor: league.nbaRed }}>
						NBA Stats App
					</Typography>
				</Grid>
				<Grid
					item
					xs={3}>
					<Typography
						variant='h5'
						sx={{ color: league.nbaWhite, backgroundColor: league.nbaRed }}>
						NBA Stats App
					</Typography>
				</Grid>
				<Grid
					item
					xs={3}>
					<Typography
						variant='h5'
						sx={{ color: league.nbaBlack, backgroundColor: league.nbaRed }}>
						NBA Stats App
					</Typography>
				</Grid>
			</Grid>
		</Container>
	)
}

export default HomePage
