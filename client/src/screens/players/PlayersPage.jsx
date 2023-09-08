/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, lazy, Suspense } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Typography } from '@mui/material'
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

	// state
	const dispatch = useDispatch()

	const [statsType, setStatsType] = useState('perGame')
	const [includePagination, setIncludePagination] = useState(true)
	const [loading, setLoading] = useState(true)

	const getPlayersStats = async () => {
		const [perGameRes, totalRes, advancedRes] = await Promise.all([
			fetch(`https://nba-stats-app-62o4.onrender.com/stats/players/per-game`, {
				method: 'GET',
			}),
			fetch(`https://nba-stats-app-62o4.onrender.com/stats/players/total`, {
				method: 'GET',
			}),
			fetch(`https://nba-stats-app-62o4.onrender.com/stats/players/advanced`, {
				method: 'GET',
			}),
		])
		const perGameData = await perGameRes.json()
		const totalData = await totalRes.json()
		const advancedData = await advancedRes.json()
		// set redux state
		dispatch(setPlayersPerGameStats({ playersPerGameStats: perGameData }))
		dispatch(setPlayersTotalStats({ playersTotalStats: totalData }))
		dispatch(setPlayersAdvancedStats({ playersAdvancedStats: advancedData }))
		// disable loading
		setLoading(false)
	}

	useEffect(() => {
		getPlayersStats()
	}, [])

	// grab redux state
	const playersPerGameStats = useSelector(state => state.playersPerGameStats)
	const playersTotalStats = useSelector(state => state.playersTotalStats)
	const playersAdvancedStats = useSelector(state => state.playersAdvancedStats)

	// extract stat array from redux state
	const playersPerGameStatistics = Object.values(playersPerGameStats)[0]
	const playersTotalStatistics = Object.values(playersTotalStats)[0]
	const playersAdvancedStatistics = Object.values(playersAdvancedStats)[0]

	return (
		<Suspense fallback={<LoadingScreen />}>
			<MainStatsContainer league={league}>
				<MainStatsBox>
					<Box
						sx={{
							height: '100%',
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
