import { Grid, Box, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { Link } from 'react-router-dom'
// import backgroundKawhi from '../../public/images/kawhi-leonard.jpg'
// Getting data from data folder seems easier since I'm only
// trying to map over them to get the logo images, not any stats
import teams from '../data/teams-perGame.json'
import HomeTeamCard from '../components/HomeTeamCard'

const HomePage = () => {
	const theme = useTheme()
	const { league } = theme.palette

	const sortedTeams = teams.sort((a, b) => a.team.localeCompare(b.team))
	console.log(sortedTeams)

	return (
		<main
			style={{
				backgroundColor: league.nbaBackground,
				height: 'calc(100vh - 100px)',
				width: 'calc(100vw - 17px)',
				padding: '0',
			}}>
			<Grid
				container
				columns={6}
				height='100%'>
				<Box
					sx={{
						padding: '2rem 0 4rem',
						width: '100vw',
						height: 'fit-content',
						backgroundImage: 'url(../../public/images/kawhi-leonard.jpg)',
						backgroundPosition: 'center',
						backgroundSize: 'cover',
						color: league.nbaWhite,
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
					backgroundColor={league.nbaRed}>
					<Box
						width='85%'
						sx={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
						<Typography variant='h3'>Team Stats</Typography>
						<Grid
							container
							columns={10}
							columnSpacing={6}
							rowSpacing={4}>
							{sortedTeams.map(team => {
								return (
									<Grid
										key={team.id}
										item
										xs={1}>
										<Link to={`http://localhost:3000/stats/teams/${team.team}`}>
											<HomeTeamCard team={team.team} />
										</Link>
									</Grid>
								)
							})}
						</Grid>
					</Box>
				</Box>
				<Box></Box>
			</Grid>
		</main>
	)
}

export default HomePage
