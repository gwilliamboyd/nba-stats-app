/* eslint-disable react-hooks/exhaustive-deps */
import { Grid, Box, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { Link } from 'react-router-dom'
// import backgroundKawhi from '../../public/images/kawhi-leonard.jpg'
// Getting data from data folder seems easier since I'm only
// trying to map over them to get the logo images, not any stats
import teams from '../data/teams-perGame.json'
import HomeTeamCard from '../components/user-profile/HomeTeamCard'
import { Suspense, lazy, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPlayersPerGameStats } from '../slices/players-stats/playersPerGameSlice'
import HomePlayersLeaders from '../components/home-page/HomePlayersLeaders'
import LoadingScreen from './utility/LoadingScreen'
// import HomePageBox from '../components/layout/HomePageBox'
const HomePageBox = lazy(() => import('../components/layout/HomePageBox'))

const HomePage = () => {
	const theme = useTheme()
	const { league } = theme.palette

	const dispatch = useDispatch()

	const playersPerGameStats = useSelector(state => state.playersPerGameStats)

	const sortedTeams = teams.sort((a, b) => a.team.localeCompare(b.team))

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

	const playersPerGameStatistics = Object.values(playersPerGameStats)[0]
	const sortableStatsPts = [...playersPerGameStatistics]
	const sortableStats$3p = [...playersPerGameStatistics]
	const sortableStatsTrb = [...playersPerGameStatistics]

	const possibleStatCategories = [
		sortableStatsPts,
		sortableStats$3p,
		sortableStatsTrb,
	]
	const getRandomStatsLeader = () => {
		const result = Math.floor(Math.random() * 3)
		console.log(result)
		return (
			<HomePlayersLeaders
				stat={result === 0 ? 'pts' : result === 1 ? '$3p' : 'trb'}
				statArray={possibleStatCategories[result]}
			/>
		)
		// console.log(result)
		// return result
	}
	// useEffect(() => getRandomStatsLeader(), [])

	return (
		// <Suspense fallback={<LoadingScreen />}>
		<main
			style={{
				backgroundColor: league.nbaBackground,
				width: 'calc(100vw - 17px)',
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
						linkText={'See All Teams'}>
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
					</HomePageBox>
				</Suspense>
				<Suspense fallback={<LoadingScreen />}>
					<HomePageBox
						league={league}
						homeHeading={'Player Stats'}
						linkText={'See All Players'}>
						<Typography
							variant='h4'
							fontWeight={700}
							alignSelf={'flex-start'}>
							Top Scorers
						</Typography>
						{getRandomStatsLeader()}
					</HomePageBox>
					{/* 
						<Typography
							variant='h4'
							fontWeight={700}
							alignSelf={'flex-start'}>
							Top 3Pt Shooters
						</Typography>
						<HomePlayersLeaders
							stat={'$3p'}
							statArray={sortableStatsThree}
						/>
						<Typography
							variant='h4'
							fontWeight={700}
							alignSelf={'flex-start'}>
							Most Boards
						</Typography>
						<HomePlayersLeaders
							stat={'trb'}
							statArray={sortableStatsTrb}
						/> */}
				</Suspense>
			</Grid>
		</main>
	)
}

export default HomePage
