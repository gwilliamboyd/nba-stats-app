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
import { useTheme } from '@mui/material/styles'
import LoadingScreen from './LoadingScreen'
import LoadingScreenBlank from './LoadingScreenBlank'
const TeamsStatsTable = lazy(() =>
	testDelay(import('../components/TeamsStatsTable'))
)

const TeamsPage = () => {
	// theme
	const theme = useTheme()
	const { league } = theme.palette
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
			<Container
				disableGutters
				maxWidth='100%'
				style={{
					backgroundColor: league.nbaBackground,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					color: league.nbaWhite,
				}}>
				<Box
					sx={{
						display: 'flex',
						alignSelf: 'flex-start',
						justifyContent: 'space-between',
						margin: '3rem 0 1rem',
						width: '100%',
					}}>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'baseline',
							gap: '3rem',
							marginLeft: '5rem',
						}}>
						<Typography variant='h3'>Team Stats</Typography>
						<Typography
							variant='h5'
							sx={{ fontWeight: '600', opacity: '90%' }}>
							2022-23 Season
						</Typography>
					</Box>
					<ButtonGroup
						variant='text'
						aria-label='text button group'
						size='large'
						sx={{ marginRight: '5rem' }}>
						<Button
							onClick={() => setStatsType('perGame')}
							sx={{
								color: league.nbaWhite,
								'&:hover': { color: league.nbaRed },
							}}>
							Per-Game
						</Button>
						<Button
							onClick={() => setStatsType('total')}
							sx={{
								color: league.nbaWhite,
								'&:hover': { color: league.nbaRed },
							}}>
							Totals
						</Button>
						<Button
							onClick={() => setStatsType('advanced')}
							sx={{
								color: league.nbaWhite,
								'&:hover': { color: league.nbaRed },
							}}>
							Advanced
						</Button>
					</ButtonGroup>
				</Box>
				<Suspense fallback={<LoadingScreenBlank />}>
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
					/>
				</Suspense>
			</Container>
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
