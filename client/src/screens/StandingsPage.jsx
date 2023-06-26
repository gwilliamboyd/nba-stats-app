/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, lazy, Suspense } from 'react'
import { useTheme } from '@emotion/react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {
	Container,
	Box,
	Typography,
	ButtonGroup,
	Button,
	Skeleton,
} from '@mui/material'
import LoadingScreen from './utility/LoadingScreen'
import { setLeagueStandings } from '../slices/standingsSlice'
// import LoadingScreenBlank from './LoadingScreenBlank'
const StandingsTable = lazy(() =>
	testDelay(import('../components/tables/StandingsTable'))
)

const StandingsPage = () => {
	// theme
	const theme = useTheme()
	const { league } = theme.palette

	// state
	const dispatch = useDispatch()

	const [loading, setLoading] = useState(true)

	const getLeagueStandings = async () => {
		const response = await fetch(`http://localhost:5000/standings`, {
			method: 'GET',
		})
		const data = await response.json()
		dispatch(setLeagueStandings({ leagueStandings: data }))
		setLoading(false)
	}
	const leagueStandings = useSelector(state => state.leagueStandings)
	const leagueWideStandings = Object.values(leagueStandings)[0]

	useEffect(() => {
		getLeagueStandings()
	}, [])
	console.log(leagueWideStandings)
	const easternStandings = leagueWideStandings.filter(
		tm => tm.conference === 'East'
	)
	const westernStandings = leagueWideStandings.filter(
		tm => tm.conference === 'West'
	)

	/* 	const getStandingsType = statsType => {
		switch (statsType) {
			case 'league':
				getLeagueStandings()
				console.log('League')
				break
			case 'east':
				getEastStandings()
				console.log('East')
				break
			case 'west':
				getWestStandings()
				console.log('West')
				break
		}
	} */

	return (
		<Suspense fallback={<LoadingScreen />}>
			<Container
				disableGutters
				maxWidth='100%'
				style={{
					height: 'calc(100vh - 100px)',
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
						margin: '2rem 0 1rem',
						width: '100%',
					}}>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'baseline',
							gap: '3rem',
							marginLeft: '5rem',
						}}>
						<Typography variant='h3'>Standings</Typography>
						<Typography
							variant='h5'
							sx={{ fontWeight: '600', opacity: '90%' }}>
							2022-23 Season
						</Typography>
					</Box>
				</Box>
				<Suspense fallback={<LoadingScreen />}>
					<Box
						width='100%'
						sx={{
							padding: '0 2rem',
							display: 'flex',
							justifyContent: 'center',
							gap: '0rem',
						}}>
						<Box
							width='100%'
							sx={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								gap: '12px',
							}}>
							<Typography>Eastern Conference</Typography>
							<StandingsTable
								loading={loading}
								// statsType={statsType}
								statistics={
									easternStandings
									/* statsType === 'perGame'
								? teamsPerGameStatistics
								: statsType === 'total'
								? teamsTotalStatistics
								: statsType === 'advanced'
								? teamsAdvancedStatistics
								: null */
								}
								primaryColor={'#18264a'}
								secondaryColor={league.nbaBackground}
								tertiaryColor={league.nbaWhite}
							/>
						</Box>
						<Box
							width='100%'
							sx={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								gap: '12px',
							}}>
							<Typography>Western Conference</Typography>
							<StandingsTable
								loading={loading}
								// statsType={statsType}
								statistics={
									westernStandings
									/* statsType === 'perGame'
								? teamsPerGameStatistics
								: statsType === 'total'
								? teamsTotalStatistics
								: statsType === 'advanced'
								? teamsAdvancedStatistics
								: null */
								}
								primaryColor={'#18264a'}
								secondaryColor={league.nbaBackground}
								tertiaryColor={league.nbaWhite}
							/>
						</Box>
						<Box
							width='100%'
							sx={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								gap: '12px',
							}}>
							<Typography>League-Wide</Typography>
							<StandingsTable
								loading={loading}
								// statsType={statsType}
								statistics={
									leagueWideStandings
									/* statsType === 'perGame'
								? teamsPerGameStatistics
								: statsType === 'total'
								? teamsTotalStatistics
								: statsType === 'advanced'
								? teamsAdvancedStatistics
								: null */
								}
								primaryColor={'#18264a'}
								secondaryColor={league.nbaBackground}
								tertiaryColor={league.nbaWhite}
							/>
						</Box>
					</Box>
				</Suspense>
			</Container>
		</Suspense>
	)
}

export default StandingsPage
// delay function to test loading screen component
const testDelay = async promise => {
	await new Promise(resolve => {
		setTimeout(resolve, 1000)
	})
	return promise
}
