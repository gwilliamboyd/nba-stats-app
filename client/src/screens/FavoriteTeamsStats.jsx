/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, lazy, Suspense } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {
	Container,
	Box,
	Typography,
	ButtonGroup,
	Button,
	Skeleton,
	CircularProgress,
} from '@mui/material'
import { setTeamsPerGameStats } from '../slices/teamsPerGameSlice'
import { setTeamsTotalStats } from '../slices/teamsTotalSlice'
import { setTeamsAdvancedStats } from '../slices/teamsAdvancedSlice'
import { useTheme, createTheme } from '@mui/material/styles'
import LoadingScreen from './LoadingScreen'
import FavoriteTeamOverview from '../components/FavoriteTeamOverview'
// import LoadingScreenBlank from './LoadingScreenBlank'
const FavoriteTeamsStatsTable = lazy(() =>
	testDelay(import('../components/FavoriteTeamsStatsTable'))
)
// recharts
import {
	Radar,
	RadarChart,
	PolarGrid,
	Legend,
	PolarAngleAxis,
	PolarRadiusAxis,
	ResponsiveContainer,
} from 'recharts'
import fullTeamNames from '../hooks/fullTeamNames'
import { setLeagueStandings } from '../slices/standingsSlice'

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
		const response = await fetch(`http://localhost:5000/stats/teams/per-game`, {
			method: 'GET',
		})
		const data = await response.json()
		dispatch(setTeamsPerGameStats({ teamsPerGameStats: data }))
		setLoading(false)
	}
	// totals stats
	const getTeamsTotal = async () => {
		const response = await fetch(`http://localhost:5000/stats/teams/total`, {
			method: 'GET',
		})
		const data = await response.json()
		dispatch(setTeamsTotalStats({ teamsTotalStats: data }))
		setLoading(false)
	}
	// advanced stats
	const getTeamsAdvanced = async () => {
		const response = await fetch(`http://localhost:5000/stats/teams/advanced`, {
			method: 'GET',
		})
		const data = await response.json()
		dispatch(setTeamsAdvancedStats({ teamsAdvancedStats: data }))
		setLoading(false)
	}
	// LEAGUE STANDINGS
	const getLeagueStandings = async () => {
		const response = await fetch(
			`http://localhost:5000/stats/teams/standings`,
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
			`http://localhost:5000/stats/teams/per-game`,
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
	console.log(teamsPerGameStatistics)
	const teamsTotalStatistics = Object.values(teamsTotalStats)[0]
	const teamsAdvancedStatistics = Object.values(teamsAdvancedStats)[0]

	return (
		<Suspense fallback={<LoadingScreen />}>
			<Container
				backgroundColor={league.nbaBackground}
				disableGutters
				maxWidth='100%'
				sx={{
					// backgroundColor: league.nbaBackground,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					color: league.nbaWhite,
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
						return (
							<FavoriteTeamOverview
								key={team}
								team={team}
								leagueStandings={leagueStandings}
							/>
						)
					})}
					{/* <ResponsiveContainer
						width='100%'
						height='100%'>
						<RadarChart
							cx='50%'
							cy='50%'
							outerRadius='80%'
							data={teamOverviewStats}>
							<PolarGrid />
							<PolarAngleAxis dataKey='team' />
							<PolarRadiusAxis
								angle={30}
								domain={[0, 150]}
							/>
							<Radar
								key={teamOverviewStats[0].id}
								name='team'
								dataKey='pts'
								stroke='#8884d8'
								fill='red'
								fillOpacity={0.6}
							/>
							<Radar
								key={teamOverviewStats[0].id}
								name='team'
								dataKey='trb'
								stroke='#8884d8'
								fill='blue'
								fillOpacity={0.6}
							/>
							<Radar
								key={teamOverviewStats[0].id}
								name='team'
								dataKey='ast'
								stroke='#8884d8'
								fill='green'
								fillOpacity={0.6}
							/>
							{teamOverviewStats.map(tm => {
								return (
									<Radar
										key={`${tm.id}`}
										name={`${tm.team}`}
										dataKey={`${tm.pts}`}
										stroke='#8884d8'
										fill='#8884d8'
										fillOpacity={0.6}
									/>
								)
							})}
							<Legend />
						</RadarChart>
					</ResponsiveContainer> */}
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
