/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, lazy, Suspense } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Container, Box, Typography } from '@mui/material'
import { setTeamsPerGameStats } from '../slices/team-stats/teamsPerGameSlice'
import { setTeamsTotalStats } from '../slices/team-stats/teamsTotalSlice'
import { setTeamsAdvancedStats } from '../slices/team-stats/teamsAdvancedSlice'
import { useTheme } from '@mui/material/styles'
import LoadingScreen from './utility/LoadingScreen'
import FavoriteTeamOverview from '../components/FavoriteTeamOverview'
// import LoadingScreenBlank from './LoadingScreenBlank'
const FavoriteTeamsStatsTable = lazy(() =>
	testDelay(import('../components/tables/FavoriteTeamsStatsTable'))
)
// import fullTeamNames from '../hooks/fullTeamNames'
import { setLeagueStandings } from '../slices/standingsSlice'
import { setPlayersPerGameStats } from '../slices/players-stats/playersPerGameSlice'
import StatsTypeButtonGroup from '../components/tables/util/StatsTypeButtonGroup'

const FavoriteTeamsStats = () => {
	// theme
	const theme = useTheme()
	const { league } = theme.palette

	// get favorite teams from credentials
	const { userInfo } = useSelector(state => state.auth)
	const fTeams = userInfo.favoriteTeams

	// reduxstate
	const dispatch = useDispatch()
	const teamsPerGameStats = useSelector(state => state.teamsPerGameStats)
	const teamsTotalStats = useSelector(state => state.teamsTotalStats)
	const teamsAdvancedStats = useSelector(state => state.teamsAdvancedStats)
	const leagueStandings = useSelector(state => state.leagueStandings)
	// component state
	const [statsType, setStatsType] = useState('perGame')
	const [loading, setLoading] = useState(true)

	// per-game stats
	const getTeamsPerGame = async () => {
		const response = await fetch(
			`https://nba-stats-app-62o4.onrender.com/stats/teams/per-game`,
			{
				method: 'GET',
			}
		)
		const data = await response.json()
		dispatch(setTeamsPerGameStats({ teamsPerGameStats: data }))
		setLoading(false)
	}
	// totals stats
	const getTeamsTotal = async () => {
		const response = await fetch(
			`https://nba-stats-app-62o4.onrender.com/stats/teams/total`,
			{
				method: 'GET',
			}
		)
		const data = await response.json()
		dispatch(setTeamsTotalStats({ teamsTotalStats: data }))
		setLoading(false)
	}
	// advanced stats
	const getTeamsAdvanced = async () => {
		const response = await fetch(
			`https://nba-stats-app-62o4.onrender.com/stats/teams/advanced`,
			{
				method: 'GET',
			}
		)
		const data = await response.json()
		dispatch(setTeamsAdvancedStats({ teamsAdvancedStats: data }))
		setLoading(false)
	}
	// LEAGUE STANDINGS
	const getLeagueStandings = async () => {
		const response = await fetch(
			`https://nba-stats-app-62o4.onrender.com/standings`,
			{
				method: 'GET',
			}
		)
		const data = await response.json()
		dispatch(setLeagueStandings({ leagueStandings: data }))
		setLoading(false)
	}
	const getStatsType = statsType => {
		switch (statsType) {
			case 'perGame':
				getTeamsPerGame()
				console.log('Per Game')
				break
			case 'total':
				getTeamsTotal()
				console.log('Total')
				break
			case 'advanced':
				getTeamsAdvanced()
				console.log('Advanced')
				break
		}
	}

	useEffect(() => {
		getStatsType(statsType)
		getLeagueStandings()
	}, [statsType])

	// TEAM OVERVIEW - Use Quick Stats
	const getTeamIndivStats = async () => {
		const quickStatsResponse = await fetch(
			`https://nba-stats-app-62o4.onrender.com/stats/teams/per-game`,
			{
				method: 'GET',
			}
		)
		const quickData = await quickStatsResponse.json()
		dispatch(setTeamsPerGameStats({ teamsPerGameStats: quickData }))
		setLoading(false)
	}
	useEffect(() => {
		getTeamIndivStats()
		console.log(teamsPerGameStats)
	}, [])
	const quickStatsTeam = Object.values(teamsPerGameStats)
	const qs = Object.values(quickStatsTeam)
	const qsArray = qs[0]
	// console.log(qsArray)
	const teamOverviewStats = qsArray.filter(q => fTeams.includes(q.team))
	// console.log(teamOverviewStats)
	// const quickStat = qsArray.find(q => q.team === `lak`)
	// console.log(quickStat)

	const teamsPerGameStatistics = Object.values(teamsPerGameStats)[0]
	// console.log(teamsPerGameStatistics)
	const teamsTotalStatistics = Object.values(teamsTotalStats)[0]
	const teamsAdvancedStatistics = Object.values(teamsAdvancedStats)[0]

	// PLAYER STATS
	const playersPerGameStats = useSelector(state => state.playersPerGameStats)
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
	const sortableStatsThree = [...playersPerGameStatistics]
	console.log(sortableStatsPts)
	console.log(sortableStatsThree)
	const getPointsLeaders = t => {
		const teamLeaders = sortableStatsPts?.filter(p => p.team === t)
		return teamLeaders
	}
	const get3PLeaders = t => {
		const teamLeaders = sortableStatsThree?.filter(p => p.team === t)
		return teamLeaders
	}

	return (
		<Suspense fallback={<LoadingScreen />}>
			<Container
				// backgroundColor={league.nbaBackground}
				disableGutters
				maxWidth='100%'
				sx={{
					backgroundColor: league.nbaBackground,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					color: league.nbaWhite,
					paddingBottom: '3rem',
				}}>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignSelf: 'flex-start',
						margin: '3rem 0 1rem',
						width: '100%',
					}}>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							gap: '12px',
						}}>
						<Typography
							fontWeight={800}
							variant='h3'>
							Favorite Teams
						</Typography>
						<Typography variant='h5'>Team-by Team Overview</Typography>
					</Box>
				</Box>
				<Suspense fallback={<LoadingScreen />}>
					{teamOverviewStats.map(team => {
						const ptsLeaders = getPointsLeaders(team.team)
						const threePLeaders = get3PLeaders(team.team)
						return (
							<FavoriteTeamOverview
								key={team}
								team={team}
								allTeams={teamsPerGameStatistics}
								leagueStandings={leagueStandings}
								ptsLeaders={ptsLeaders}
								threePLeaders={threePLeaders}
							/>
						)
					})}
					<Box
						sx={{
							width: '75%',
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'baseline',
						}}>
						<Typography
							variant='h3'
							fontWeight={900}
							m={'3rem 0 2rem'}>
							Compare Teams
						</Typography>
						<StatsTypeButtonGroup
							league={league}
							setStatsType={setStatsType}
						/>
					</Box>
					<FavoriteTeamsStatsTable
						fTeams={fTeams}
						loading={loading}
						statsType={statsType}
						statistics={
							statsType === 'perGame'
								? teamsPerGameStatistics
								: statsType === 'total'
								? teamsTotalStatistics
								: statsType === 'advanced'
								? teamsAdvancedStatistics
								: null
						}
						primaryColor={'#18264a'}
						secondaryColor={league.nbaBackground}
						tertiaryColor={league.nbaWhite}
					/>
				</Suspense>
			</Container>
		</Suspense>
	)
}

export default FavoriteTeamsStats
const testDelay = async promise => {
	await new Promise(resolve => {
		setTimeout(resolve, 1000)
	})
	return promise
}
