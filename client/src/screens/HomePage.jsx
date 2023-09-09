/* eslint-disable react-hooks/exhaustive-deps */
import {
	Grid,
	Box,
	Typography,
	Snackbar,
	Button,
	IconButton,
	Alert,
	Fade,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { Link } from 'react-router-dom'
// Getting data from data folder seems easier since I'm only
// trying to map over them to get the logo images, not any stats
import teams from '../data/teams-perGame.json'
import HomeTeamCard from '../components/user-profile/HomeTeamCard'
import { Suspense, lazy, /* memo, */ useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPlayersPerGameStats } from '../slices/players-stats/playersPerGameSlice'
import { setSnackbar } from '../slices/authentication/authSlice'
// import { setSnackbarState } from '../slices/snackbarSlice'
import LoadingScreen from './utility/LoadingScreen'
// import LoadingScreenBlank from './utility/LoadingScreenBlank'
const HomePageBox = lazy(() => import('../components/layout/HomePageBox'))
const HomePlayersLeaders = lazy(() =>
	import('../components/home-page/HomePlayersLeaders')
)

// close icon
import CloseIcon from '@mui/icons-material/Close'

const HomePage = () => {
	// memo components
	// const MemoHomePageBox = memo(HomePageBox)

	const theme = useTheme()
	const { league } = theme.palette

	const dispatch = useDispatch()

	// const { snackbarState } = useSelector(state => state.snackbarState)
	const { userInfo } = useSelector(state => state.auth)
	const { snackbarIsOpen } = useSelector(state => state.auth)
	// console.log(userInfo)

	// snackbar notif
	// const [snackbarOpen, setSnackbarOpen] = useState(false)
	const [logoutSnackbarOpen, setLogoutSnackbarOpen] = useState(false)
	// fade in effect
	const [fadeIn, setFadeIn] = useState(false)
	// load random player leaders
	const [loading, setLoading] = useState(true)
	// check if logged in
	// const [loggedInClient, setLoggedInClient] = useState(false)
	useEffect(() => {
		console.log(`Snackbar Is Open: ${snackbarIsOpen}`)
		// console.log(`Logged In Client: ${loggedInClient}`)
	}, [])

	// fade in effect on load
	useEffect(() => {
		setFadeIn(true)
	}, [])

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
	const getRandomStatsLeader = useMemo(() => {
		const result = Math.floor(Math.random() * 3)
		return result
	}, [])

	// snackbar element
	const snackbarAction = (
		<>
			<Button
				color='primary'
				size='small'
				onClick={() => dispatch(setSnackbar(false))}>
				UNDO
			</Button>
			<IconButton
				size='small'
				aria-label='close'
				color='inherit'
				onClick={() => dispatch(setSnackbar(false))}>
				<CloseIcon fontSize='small' />
			</IconButton>
		</>
	)

	return (
		<Box
			sx={{
				backgroundColor: league.nbaBackground,
				width: { xs: '100%', md: 'calc(100vw - 8px)' },
				padding: '0',
			}}>
			<Snackbar
				open={snackbarIsOpen}
				anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
				autoHideDuration={3000}
				onClose={() => dispatch(setSnackbar(false))}
				// message='You are logged in!'
				action={snackbarAction}
				sx={{ backgroundColor: league.nbaBackground, margin: '84px 7% 0 0' }}>
				<Alert
					variant='filled'
					onClose={() => dispatch(setSnackbar(false))}
					severity='success'
					sx={{ width: '100%' }}>
					You are logged in!
				</Alert>
			</Snackbar>
			<Snackbar
				open={logoutSnackbarOpen}
				anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
				autoHideDuration={5000}
				onClose={() => setLogoutSnackbarOpen(false)}
				// message='Logged out successfully!'
				action={snackbarAction}
				sx={{ backgroundColor: league.nbaBackground, margin: '84px 7% 0 0' }}>
				<Alert
					variant='filled'
					onClose={() => setLogoutSnackbarOpen(false)}
					severity='success'
					sx={{ width: '100%' }}>
					Logged out successfully!
				</Alert>
			</Snackbar>
			<Grid
				container
				columns={6}
				height='100%'>
				<Suspense fallback={<LoadingScreen />}>
					{/* for testing purposes */}
					{/* <Button onClick={() => setLogoutSnackbarOpen(true)}>Snackbar</Button> */}
					<Fade
						in={fadeIn}
						timeout={600}>
						<Box>
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
									/* sx={{
										padding: '1rem 3rem 4rem 0',
										background:
											'radial-gradient(circle, rgba(13,22,44,1) 0%, rgba(37,59,115,1) 100%)',
										borderRadius: '4px',
									}} */
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
													/* transition: 'all 0.3s ease-out',
											'&:hover': {
												transform: 'scale(1.05)',
											}, */
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
						</Box>
					</Fade>
				</Suspense>
				<Suspense fallback={<LoadingScreen />}>
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
								alignSelf={'flex-start'}
								marginBottom={'2rem'}>
								{getRandomStatsLeader === 0
									? 'Top Scorers'
									: getRandomStatsLeader === 1
									? 'Leaders From 3'
									: 'Total Rebounds Per Game'}
							</Typography>
							<HomePlayersLeaders
								loading={loading}
								setLoading={setLoading}
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
