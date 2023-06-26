/* eslint-disable react-hooks/exhaustive-deps */
import { Grid, Box, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { Link } from 'react-router-dom'
// import backgroundKawhi from '../../public/images/kawhi-leonard.jpg'
// Getting data from data folder seems easier since I'm only
// trying to map over them to get the logo images, not any stats
import teams from '../data/teams-perGame.json'
import HomeTeamCard from '../components/user-profile/HomeTeamCard'
import PlayerCard from '../components/PlayerCard'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPlayersPerGameStats } from '../slices/players-stats/playersPerGameSlice'
import { topScorers } from '../data/home-page-stats/topScorers'

const HomePage = () => {
	const theme = useTheme()
	const { league } = theme.palette

	const dispatch = useDispatch()

	const playersPerGameStats = useSelector(state => state.playersPerGameStats)

	const sortedTeams = teams.sort((a, b) => a.team.localeCompare(b.team))
	console.log(sortedTeams)

	const getPlayersPerGame = async () => {
		const response = await fetch(
			`http://localhost:5000/stats/players/per-game`,
			{
				method: 'GET',
			}
		)
		const data = await response.json()
		dispatch(setPlayersPerGameStats({ playersPerGameStats: data }))
	}
	useEffect(() => {
		getPlayersPerGame()
	}, [])

	/* // get 4 random indices from top 10 scorers
	const getTopStats = () => {
		let topScorersArr = []
		for (let i = 0; i < 4; i++) {
			topScorersArr.push(Math.floor(Math.random(i) * 10))
			console.log(topScorersArr)
		}
		return topScorersArr
	}
	const randomTopPlayers = getTopStats()
	console.log(randomTopPlayers) */

	/* 	function shuffleArray(array) {
		for (let i = array.length; i > 0; i--) {
			const j = Math.floor(Math.random() * array.length)
			;[array[i], array[j]] = [array[j], array[i]]
		}
		return array
	}

	const randomTopPlayers = shuffleArray(topScorers)
	console.log(randomTopPlayers)
	const topFourPlayers = randomTopPlayers.slice(0, 4)
	console.log(topFourPlayers) */

	let randomTopPlayers = topScorers
		.map(v => ({ v, sort: Math.random() }))
		.sort((a, b) => a.sort - b.sort)
		.map(({ v }) => v)
	console.log(randomTopPlayers)
	const topFourPlayers = randomTopPlayers.slice(0, 4)

	return (
		<main
			style={{
				backgroundColor: league.nbaBackground,
				// height: 'calc(100vh - 100px)',
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
						<Box sx={{ display: 'flex', alignItems: 'baseline', gap: '3rem' }}>
							<Typography variant='h3'>Team Stats</Typography>
							<Link to='/stats/teams'>
								<Typography variant='body1'>See All Teams</Typography>
							</Link>
						</Box>
						<Grid
							container
							columns={10}
							columnSpacing={6}
							rowSpacing={4}
							justify='center'
							// alignItems='center'
						>
							{sortedTeams.map(team => {
								return (
									<Grid
										p={0}
										key={team.id}
										item
										alignSelf='center'
										xs={1}
										sx={{
											justifySelf: 'center',
										}}>
										<Link to={`http://localhost:3000/stats/teams/${team.team}`}>
											<HomeTeamCard
												width={120}
												team={team.team}
											/>
										</Link>
									</Grid>
								)
							})}
						</Grid>
					</Box>
				</Box>
				<Box
					sx={{
						width: '100%',
						padding: '2rem 0 4rem',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'flex-start',
						gap: '3rem',
					}}>
					<Box
						width='85%'
						sx={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							gap: '3.5rem',
						}}>
						<Box
							alignSelf='flex-start'
							alignItems='baseline'
							color={league.nbaWhite}
							sx={{ display: 'flex', gap: '3rem' }}>
							<Typography variant='h3'>Player Stats</Typography>
							<Link to='/stats/players'>
								<Typography variant='body1'>See All Players</Typography>
							</Link>
						</Box>
						<Grid
							container
							width='100%'
							columns={6}
							columnSpacing={10}>
							{topFourPlayers?.map(p => (
								<Grid
									key={p}
									item
									xs={1}>
									<PlayerCard
										width={120}
										player={p}
									/>
								</Grid>
							))}
							{/* <Grid
								item
								xs={1}>
								<PlayerCard
									player='Lebron James'
									width={160}
								/>
							</Grid>
							<Grid
								item
								xs={1}>
								<PlayerCard
									player='Paul George'
									width={160}
								/>
							</Grid>
							<Grid
								item
								xs={1}>
								<PlayerCard
									player='Anthony Davis'
									width={160}
								/>
							</Grid>
							<Grid
								item
								xs={1}>
								<PlayerCard
									player='Rudy Gobert'
									width={160}
								/>
							</Grid>
							<Grid
								item
								xs={1}>
								<PlayerCard
									player='Stephen Curry'
									width={160}
								/>
							</Grid>
							<Grid
								item
								xs={1}>
								<PlayerCard
									player='Damian Lillard'
									width={160}
								/>
							</Grid> */}
						</Grid>
					</Box>
				</Box>
			</Grid>
		</main>
	)
}

export default HomePage
