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
import { setTeamsPerGameStats } from '../../slices/team-stats/teamsPerGameSlice'
import { setTeamsTotalStats } from '../../slices/team-stats/teamsTotalSlice'
import { setTeamsAdvancedStats } from '../../slices/team-stats/teamsAdvancedSlice'
import { useTheme, createTheme } from '@mui/material/styles'
import LoadingScreen from '../utility/LoadingScreen'
import StatsTypeButtonGroup from '../../components/tables/util/StatsTypeButtonGroup'
import MainStatsContainer from '../../components/layout/MainStatsContainer'
/* const MainStatsContainer = lazy(() =>
	testDelay(import('../../components/layout/MainStatsContainer'))
) */
import MainStatsBox from '../../components/layout/MainStatsBox'
// import LoadingScreenBlank from './LoadingScreenBlank'
const TeamsStatsTable = lazy(() =>
	testDelay(import('../../components/tables/TeamsStatsTable'))
)

const TeamsPage = () => {
	// theme
	const theme = useTheme()
	const { league } = theme.palette

	const { userInfo } = useSelector(state => state.auth)

	// state
	const dispatch = useDispatch()
	const teamsPerGameStats = useSelector(state => state.teamsPerGameStats)
	const teamsTotalStats = useSelector(state => state.teamsTotalStats)
	const teamsAdvancedStats = useSelector(state => state.teamsAdvancedStats)

	const [statsType, setStatsType] = useState('perGame')
	const [loading, setLoading] = useState(true)

	const getTeamsPerGame = async () => {
		const response = await fetch(`http://localhost:5000/stats/teams/per-game`, {
			method: 'GET',
		})
		const data = await response.json()
		dispatch(setTeamsPerGameStats({ teamsPerGameStats: data }))
		setLoading(false)
	}
	const getTeamsTotal = async () => {
		const response = await fetch(`http://localhost:5000/stats/teams/total`, {
			method: 'GET',
		})
		const data = await response.json()
		dispatch(setTeamsTotalStats({ teamsTotalStats: data }))
		setLoading(false)
	}
	const getTeamsAdvanced = async () => {
		const response = await fetch(`http://localhost:5000/stats/teams/advanced`, {
			method: 'GET',
		})
		const data = await response.json()
		dispatch(setTeamsAdvancedStats({ teamsAdvancedStats: data }))
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
	}, [statsType])

	// Test loading components
	// setTimeout(getTeamsPerGame, 5000)

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
							alignItems: 'baseline',
							gap: '3rem',
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
						secondaryColor={league.nbaBackground}
						tertiaryColor={league.nbaWhite}
					/>
				</Suspense>
			</MainStatsContainer>
		</Suspense>
	)
}

export default TeamsPage
const testDelay = async promise => {
	await new Promise(resolve => {
		setTimeout(resolve, 1000)
	})
	return promise
}
