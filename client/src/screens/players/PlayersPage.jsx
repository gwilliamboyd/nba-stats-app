/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, lazy, Suspense } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
	Container,
	Box,
	Typography,
	ButtonGroup,
	Button,
	Skeleton,
} from '@mui/material'
import { setPlayersPerGameStats } from '../../slices/players-stats/playersPerGameSlice'
import { setPlayersTotalStats } from '../../slices/players-stats/playersTotalSlice'
import { setPlayersAdvancedStats } from '../../slices/players-stats/playersAdvancedSlice'
import { useTheme } from '@mui/material/styles'
import LoadingScreen from '../utility/LoadingScreen'
import StatsTypeButtonGroup from '../../components/tables/util/StatsTypeButtonGroup'
import MainStatsContainer from '../../components/layout/MainStatsContainer'
import MainStatsBox from '../../components/layout/MainStatsBox'
// import LoadingScreenBlank from './LoadingScreenBlank'
const PlayersStatsTable = lazy(() =>
	testDelay(import('../../components/tables/PlayersStatsTable'))
)

const PlayersPage = () => {
	// theme
	const theme = useTheme()
	const { league } = theme.palette

	const { userInfo } = useSelector(state => state.auth)

	// state
	const dispatch = useDispatch()
	const playersPerGameStats = useSelector(state => state.playersPerGameStats)
	const playersTotalStats = useSelector(state => state.playersTotalStats)
	const playersAdvancedStats = useSelector(state => state.playersAdvancedStats)

	const [statsType, setStatsType] = useState('perGame')
	const [includePagination, setIncludePagination] = useState(true)
	const [loading, setLoading] = useState(true)

	const getPlayersPerGame = async () => {
		const response = await fetch(
			`https://nba-stats-app-62o4.onrender.com/stats/players/per-game`,
			{
				method: 'GET',
			}
		)
		const data = await response.json()
		dispatch(setPlayersPerGameStats({ playersPerGameStats: data }))
		setLoading(false)
	}
	const getPlayersTotal = async () => {
		const response = await fetch(
			`https://nba-stats-app-62o4.onrender.com/stats/players/total`,
			{
				method: 'GET',
			}
		)
		const data = await response.json()
		dispatch(setPlayersTotalStats({ playersTotalStats: data }))
		setLoading(false)
	}
	const getPlayersAdvanced = async () => {
		const response = await fetch(
			`https://nba-stats-app-62o4.onrender.com/stats/players/advanced`,
			{
				method: 'GET',
			}
		)
		const data = await response.json()
		dispatch(setPlayersAdvancedStats({ playersAdvancedStats: data }))
		setLoading(false)
	}

	const getStatsType = statsType => {
		switch (statsType) {
			case 'perGame':
				getPlayersPerGame()
				// console.log('Per Game')
				break
			case 'total':
				getPlayersTotal()
				// console.log('Total')
				break
			case 'advanced':
				getPlayersAdvanced()
				// console.log('Advanced')
				break
		}
	}

	useEffect(() => {
		getStatsType(statsType)
	}, [statsType])

	// Test loading components
	// setTimeout(getTeamsPerGame, 5000)

	const playersPerGameStatistics = Object.values(playersPerGameStats)[0]
	const playersTotalStatistics = Object.values(playersTotalStats)[0]
	const playersAdvancedStatistics = Object.values(playersAdvancedStats)[0]

	return (
		<Suspense fallback={<LoadingScreen />}>
			<MainStatsContainer league={league}>
				<MainStatsBox>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'baseline',
							gap: '3rem',
							// marginLeft: '5rem',
						}}>
						<Typography variant='h3'>Player Stats</Typography>
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
					<PlayersStatsTable
						loading={loading}
						statsType={statsType}
						statistics={
							statsType === 'perGame'
								? playersPerGameStatistics
								: statsType === 'total'
								? playersTotalStatistics
								: statsType === 'advanced'
								? playersAdvancedStatistics
								: null
						}
						containerBackground={league.nbaBackground}
						primaryColor={'#18264a'}
						secondaryColor={league.nbaWhite}
						tertiaryColor={league.nbaWhite}
						includePagination={includePagination}
						playersPerPage={10}
					/>
				</Suspense>
			</MainStatsContainer>
		</Suspense>
	)
}

export default PlayersPage
const testDelay = async promise => {
	await new Promise(resolve => {
		setTimeout(resolve, 1000)
	})
	return promise
}
