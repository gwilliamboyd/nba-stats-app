/* eslint-disable react-hooks/exhaustive-deps */
import { Grid, Box, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { Link } from 'react-router-dom'
// import backgroundKawhi from '/images/kawhi-leonard.jpg'
// Getting data from data folder seems easier since I'm only
// trying to map over them to get the logo images, not any stats
import teams from '../data/teams-perGame.json'
import HomeTeamCard from '../components/user-profile/HomeTeamCard'
import { Suspense, lazy, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPlayersPerGameStats } from '../slices/players-stats/playersPerGameSlice'
// import HomePlayersLeaders from '../components/home-page/HomePlayersLeaders'
import LoadingScreen from './utility/LoadingScreen'
import LoadingScreenBlank from './utility/LoadingScreenBlank'
// import HomePageBox from '../components/layout/HomePageBox'
const HomePageBox = lazy(() => import('../components/layout/HomePageBox'))
const HomePlayersLeaders = lazy(() =>
	import('../components/home-page/HomePlayersLeaders')
)

const HomePage = () => {
	const theme = useTheme()
	const { league } = theme.palette

	const dispatch = useDispatch()

	const playersPerGameStats = useSelector(state => state.playersPerGameStats)

	const sortedTeams = teams.sort((a, b) => a.team.localeCompare(b.team))

	const getPlayersPerGame = async () => {
		const response = await fetch(
			`https://nba-stats-app-62o4.onrender.com/stats/players/per-game`,
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

	const playersPerGameStatistics = Object.values(playersPerGameStats)[0]
	const sortableStatsPts = [...playersPerGameStatistics]
	const sortableStats$3p = [...playersPerGameStatistics]
	const sortableStatsTrb = [...playersPerGameStatistics]

	const possibleStatCategories = [
		sortableStatsPts,
		sortableStats$3p,
		sortableStatsTrb,
	]
	/* const getRandomStatsLeader = () => {
		const result = Math.floor(Math.random() * 3)
		// console.log(result)
		return result
	} */
	const getRandomStatsLeader = useMemo(() => {
		const result = Math.floor(Math.random() * 3)
		// console.log(result)
		return result
	}, [])
	/* useEffect(() => {
		console.log(getRandomStatsLeader())
	}, []) */

	return (
		// <Suspense fallback={<LoadingScreen />}>
		<Box
			// disableGutters
			sx={{
				backgroundColor: league.nbaBackground,
				width: { xs: '100%', md: 'calc(100vw - 8px)' },
				padding: '0',
			}}>
			<Grid
				container
				columns={6}
				height='100%'>
				<Suspense fallback={<LoadingScreen />}>
					<HomePageBox
						league={league}
						homeHeading={'Team Stats'}
						linkText={'See All Teams'}
						backgroundImage={'url(/images/kawhi-leonard.jpg)'}>
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
										xs={5}
										md={3}
										lg={1}
										sx={{
											justifySelf: 'center',
										}}>
										<Link to={`/stats/teams/${team.team}`}>
											<HomeTeamCard
												width={120}
												team={team.team}
											/>
										</Link>
									</Grid>
								)
							})}
						</Grid>
					</HomePageBox>
				</Suspense>
				<Suspense fallback={<LoadingScreenBlank />}>
					<HomePageBox
						league={league}
						homeHeading={'Player Stats'}
						linkText={'See All Players'}
						backgroundImage={'url(/images/players-home-background.jpg)'}>
						{/* <Typography
							variant='h4'
							fontWeight={700}
							alignSelf={'flex-start'}>
							Top Scorers
						</Typography> */}
						<Box justifyContent={'center'}>
							<Typography
								variant='h4'
								fontWeight={700}
								alignSelf={'flex-start'}>
								{getRandomStatsLeader === 0
									? 'Top Scorers'
									: getRandomStatsLeader === 1
									? 'Leaders From 3'
									: 'Total Rebounds Per Game'}
							</Typography>
							<HomePlayersLeaders
								stat={
									getRandomStatsLeader === 0
										? 'pts'
										: getRandomStatsLeader === 1
										? '$3p'
										: 'trb'
								}
								statArray={possibleStatCategories[getRandomStatsLeader]}
							/>
						</Box>
					</HomePageBox>
				</Suspense>
			</Grid>
		</Box>
	)
}

export default HomePage
