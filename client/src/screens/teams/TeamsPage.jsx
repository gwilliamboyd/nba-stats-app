/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, lazy, Suspense } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Typography } from '@mui/material'
import { setTeamsPerGameStats } from '../../slices/team-stats/teamsPerGameSlice'
import { setTeamsTotalStats } from '../../slices/team-stats/teamsTotalSlice'
import { setTeamsAdvancedStats } from '../../slices/team-stats/teamsAdvancedSlice'
import { useTheme } from '@mui/material/styles'
import LoadingScreen from '../utility/LoadingScreen'
import StatsTypeButtonGroup from '../../components/tables/util/StatsTypeButtonGroup'
import MainStatsContainer from '../../components/layout/MainStatsContainer'
/* const MainStatsContainer = lazy(() =>
	testDelay(import('../../components/layout/MainStatsContainer'))
) */
import MainStatsBox from '../../components/layout/MainStatsBox'
const TeamsStatsTable = lazy(() =>
	testDelay(import('../../components/tables/TeamsStatsTable'))
)

const TeamsPage = () => {
	// theme
	const theme = useTheme()
	const { league } = theme.palette

	// not sure if user info will be necessary after all
	// const { userInfo } = useSelector(state => state.auth)

	const dispatch = useDispatch()
	const [statsType, setStatsType] = useState('perGame')
	const [loading, setLoading] = useState(true)

	const getTeamsStats = async () => {
		const [perGameRes, totalRes, advancedRes] = await Promise.all([
			fetch(`https://nba-stats-app-62o4.onrender.com/stats/teams/per-game`, {
				method: 'GET',
			}),
			fetch(`https://nba-stats-app-62o4.onrender.com/stats/teams/total`, {
				method: 'GET',
			}),
			fetch(`https://nba-stats-app-62o4.onrender.com/stats/teams/advanced`, {
				method: 'GET',
			}),
		])
		// convert res to JSON
		const perGameData = await perGameRes.json()
		const totalData = await totalRes.json()
		const advancedData = await advancedRes.json()
		// set redux state
		dispatch(setTeamsPerGameStats({ teamsPerGameStats: perGameData }))
		dispatch(setTeamsTotalStats({ teamsTotalStats: totalData }))
		dispatch(setTeamsAdvancedStats({ teamsAdvancedStats: advancedData }))
		// disable loading
		setLoading(false)
	}

	useEffect(() => {
		getTeamsStats()
	}, [])

	// grab redux state
	const teamsPerGameStats = useSelector(state => state.teamsPerGameStats)
	const teamsTotalStats = useSelector(state => state.teamsTotalStats)
	const teamsAdvancedStats = useSelector(state => state.teamsAdvancedStats)

	// extract stat array from redux state
	const teamsPerGameStatistics = Object.values(teamsPerGameStats)[0]
	const teamsTotalStatistics = Object.values(teamsTotalStats)[0]
	const teamsAdvancedStatistics = Object.values(teamsAdvancedStats)[0]

	return (
		<Suspense fallback={<LoadingScreen />}>
			<MainStatsContainer league={league}>
				<MainStatsBox>
					<Box
						sx={{
							display: 'flex',
							flexDirection: { xs: 'column', md: 'row' },
							alignItems: { xs: 'flex-start', md: 'baseline' },
							gap: { xs: '1rem', md: '3rem' },
						}}>
						<Typography variant='h3'>Team Stats</Typography>
						<Typography
							variant='h5'
							sx={{ fontWeight: '600', opacity: '90%' }}>
							2022-23 Season
						</Typography>
					</Box>
					<StatsTypeButtonGroup
						league={league}
						secondaryColor={league.nbaWhite}
						tertiaryColor={league.nbaRed}
						setStatsType={setStatsType}
					/>
				</MainStatsBox>
				<Suspense fallback={<LoadingScreen />}>
					<TeamsStatsTable
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
						secondaryColor={league.nbaWhite}
						tertiaryColor={league.nbaRed}
						borderColor={league.nbaWhite}
					/>
				</Suspense>
			</MainStatsContainer>
		</Suspense>
	)
}

export default TeamsPage
const testDelay = async promise => {
	await new Promise(resolve => {
		setTimeout(resolve, 700)
	})
	return promise
}
