/* eslint-disable react-hooks/exhaustive-deps */
import { useTheme } from '@emotion/react'
import { useSelector, useDispatch } from 'react-redux'
import { setTeamIndivStats } from '../../slices/team-stats/teamIndivSlice'
import { setTeamsPerGameStats } from '../../slices/team-stats/teamsPerGameSlice'
import { Box, Container, Typography } from '@mui/material'
import { Suspense, lazy, useEffect, useState } from 'react'
import TeamIndivStatsRow from '../../components/stats-pages/TeamIndivStatsRow'
import fullTeamNames from '../../hooks/fullTeamNames'
import LoadingScreen from '../utility/LoadingScreen'
import { setPlayersPerGameStats } from '../../slices/players-stats/playersPerGameSlice'
import { setPlayersTotalStats } from '../../slices/players-stats/playersTotalSlice'
import { setPlayersAdvancedStats } from '../../slices/players-stats/playersAdvancedSlice'
import StatsTypeButtonGroup from '../../components/tables/util/StatsTypeButtonGroup'
import QuickStatsContainer from '../../components/stats-pages/quick-stats/QuickStatsContainer'
const PlayersStatsTable = lazy(() =>
	testDelay(import('../../components/tables/PlayersStatsTable'))
)

const TeamIndivPage = () => {
	// not an error, eslint doesn't recognize the theme
	// call in the eval
	const theme = useTheme()
	const { league } = theme.palette
	const dispatch = useDispatch()
	const teamIndivStats = useSelector(state => state.teamIndivStats)
	const teamsPerGameStats = useSelector(state => state.teamsPerGameStats)
	const team = window.location.href.slice(-3)
	const primaryColor = eval(`theme.palette.teams.${team}.primary`)
	const secondaryColor = eval(`theme.palette.teams.${team}.secondary`)
	const tertiaryColor = eval(`theme.palette.teams.${team}.tertiary`)

	const [loading, setLoading] = useState(true)

	const getTeamIndivStats = async () => {
		const [teamIndivResponse, quickStatsResponse] = await Promise.all([
			fetch(`https://nba-stats-app-62o4.onrender.com/stats/teams/${team}`, {
				method: 'GET',
			}),
			fetch(`https://nba-stats-app-62o4.onrender.com/stats/teams/per-game`, {
				method: 'GET',
			}),
		])
		const indivData = await teamIndivResponse.json()
		const quickData = await quickStatsResponse.json()
		dispatch(setTeamIndivStats({ teamIndivStats: indivData }))
		dispatch(setTeamsPerGameStats({ teamsPerGameStats: quickData }))
		setLoading(false)
	}
	useEffect(() => {
		getTeamIndivStats()
	}, [])
	// parse indiv stats from fetch
	const teamIndivStatistics = Object.values(teamIndivStats)[0]
	// get quick stats from indiv stats fetch
	const quickStatsTeam = Object.values(teamsPerGameStats)
	const qs = Object.values(quickStatsTeam)
	const qsArray = qs[0]
	// find quick stat for given team
	const quickStat = qsArray.find(q => q.team === `${team}`)

	// quick stats variables
	const statsPts = quickStat?.pts
	const statsTrb = quickStat?.trb
	const statsAst = quickStat?.ast
	const statsFg = quickStat?.fg
	const statsFgPer = quickStat?.fgPer
	const stats3pPer = quickStat?.$3pPer

	const arena = quickStat?.arena
	const home = quickStat?.home

	// Player stats table
	// state
	const playersPerGameStats = useSelector(state => state.playersPerGameStats)
	const playersTotalStats = useSelector(state => state.playersTotalStats)
	const playersAdvancedStats = useSelector(state => state.playersAdvancedStats)

	const [statsType, setStatsType] = useState('perGame')
	// const [includePagination, setIncludePagination] = useState(false)
	const includePagination = false

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
				console.log('Per Game')
				break
			case 'total':
				getPlayersTotal()
				console.log('Total')
				break
			case 'advanced':
				getPlayersAdvanced()
				console.log('Advanced')
				break
		}
	}

	useEffect(() => {
		getStatsType(statsType)
	}, [statsType])

	// Test loading components
	// setTimeout(getTeamsPerGame, 5000)

	const playersPerGameStatistics = Object.values(playersPerGameStats)[0]
	const filteredPerGameStatistics = playersPerGameStatistics.filter(
		player => team === player.team
	)
	const playersTotalStatistics = Object.values(playersTotalStats)[0]
	const filteredTotalStatistics = playersTotalStatistics.filter(
		player => team === player.team
	)
	const playersAdvancedStatistics = Object.values(playersAdvancedStats)[0]
	const filteredAdvancedStatistics = playersAdvancedStatistics.filter(
		player => team === player.team
	)

	return (
		<Container
			disableGutters
			maxWidth='100%'
			sx={{
				// height: 'calc(100vh - 100px)',
				backgroundColor: primaryColor,
			}}>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					gap: { xs: '3rem', md: '1rem' },
				}}>
				<Box
					sx={{
						marginTop: { xs: '0', md: '3rem' },
						width: { xs: '95%', lg: '85%' },
						display: 'flex',
						flexDirection: { xs: 'column', lg: 'row' },
						justifyContent: 'space-between',
						alignItems: { xs: 'center', md: 'flex-start' },
						gap: { xs: '2rem', md: '0' },
					}}>
					<Box
						sx={{
							display: 'flex',
							flexDirection: { xs: 'column', md: 'row' },
							justifyContent: { xs: 'center', lg: 'flex-start' },
							alignItems: { xs: 'center', md: 'flex-start' },
							gap: { xs: '0.5rem', md: '2rem' },
							minWidth: { xs: '0px', md: '680px' },
							// flex: '1 0 0',
						}}>
						<img
							src={`/images/svgs/team-logos/${team}.svg`}
							width={200}
							alt={`${team} logo`}
						/>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								gap: { xs: '2rem', md: '1rem' },
								flex: 1,
							}}>
							<Typography
								color={tertiaryColor}
								fontWeight={800}
								variant='h3'
								sx={{
									marginTop: { xs: '0', md: '2rem' },
									letterSpacing: '-2.5px',
									fontSize: { xs: '38px', md: '52px' },
								}}>
								{fullTeamNames(team)}
							</Typography>
							<Box
								sx={{
									display: 'flex',
									justifyContent: { xs: 'space-around', md: 'space-between' },
								}}>
								<Box
									sx={{
										display: 'flex',
										flexDirection: 'column',
										// gap: '6px',
									}}>
									<Typography
										color={secondaryColor}
										marginLeft={'0.2rem'}
										variant='body2'
										fontWeight={700}>
										HOMETOWN
									</Typography>
									<Typography
										color={tertiaryColor}
										fontWeight={600}
										variant='h5'
										sx={{
											letterSpacing: '-2.5px',
											fontSize: { xs: '20px', md: '26px' },
										}}>
										{home}
									</Typography>
								</Box>
								<Box
									sx={{
										display: 'flex',
										flexDirection: 'column',
										// gap: '6px',
									}}>
									<Typography
										color={secondaryColor}
										marginLeft={'0.2rem'}
										variant='body2'
										fontWeight={700}>
										ARENA
									</Typography>
									<Typography
										color={tertiaryColor}
										fontWeight={600}
										variant='h5'
										sx={{
											letterSpacing: '-2.5px',
											fontSize: { xs: '20px', md: '26px' },
										}}>
										{arena}
									</Typography>
								</Box>
							</Box>
						</Box>
					</Box>
					<QuickStatsContainer
						statsPts={statsPts}
						statsTrb={statsTrb}
						statsAst={statsAst}
						statsFg={statsFg}
						statsFgPer={statsFgPer}
						stats3pPer={stats3pPer}
						secondaryColor={secondaryColor}
						tertiaryColor={tertiaryColor}
					/>
				</Box>
				{loading ? (
					<LoadingScreen />
				) : (
					<Box
						sx={{
							width: '80%',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
							gap: '2rem',
						}}>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'center',
								gap: '0.5rem',
							}}>
							<Typography
								variant='h5'
								fontWeight={700}
								color={tertiaryColor}
								sx={{ alignSelf: 'flex-start' }}>
								Per-Game
							</Typography>
							<TeamIndivStatsRow
								team={team}
								primaryColor={primaryColor}
								secondaryColor={secondaryColor}
								tertiaryColor={tertiaryColor}
								statsType={'perGame'}
								loading={loading}
								statistics={teamIndivStats && teamIndivStatistics[0]}
							/>
						</Box>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'center',
								gap: '0.5rem',
							}}>
							<Typography
								variant='h5'
								fontWeight={700}
								color={tertiaryColor}
								sx={{ alignSelf: 'flex-start' }}>
								Totals
							</Typography>
							<TeamIndivStatsRow
								team={team}
								primaryColor={primaryColor}
								secondaryColor={secondaryColor}
								tertiaryColor={tertiaryColor}
								statsType={'total'}
								loading={loading}
								statistics={teamIndivStats && teamIndivStatistics[1]}
							/>
						</Box>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'center',
								gap: '0.5rem',
							}}>
							<Typography
								variant='h5'
								fontWeight={700}
								color={tertiaryColor}
								sx={{ alignSelf: 'flex-start' }}>
								Advanced
							</Typography>
							<TeamIndivStatsRow
								team={team}
								primaryColor={primaryColor}
								secondaryColor={secondaryColor}
								tertiaryColor={tertiaryColor}
								statsType={'advanced'}
								loading={loading}
								statistics={teamIndivStats && teamIndivStatistics[2]}
							/>
						</Box>
					</Box>
				)}
				<Box
					sx={{
						width: '75%',
						display: 'flex',
						flexDirection: { xs: 'column', md: 'row' },
						alignItems: { xs: 'center', md: 'baseline' },
						justifyContent: { xs: 'center', md: 'space-between' },
						gap: { xs: '1.5rem', md: '3rem' },
						marginLeft: { xs: '0', md: '5rem' },
					}}>
					<Typography
						color={tertiaryColor}
						variant='h3'>
						Player Stats
					</Typography>
					{/* <Typography
						color={secondaryColor}
						variant='h5'
						sx={{ fontWeight: '600', opacity: '90%' }}>
						2022-23 Season
					</Typography> */}

					<StatsTypeButtonGroup
						league={league}
						secondaryColor={secondaryColor}
						tertiaryColor={tertiaryColor}
						setStatsType={setStatsType}
					/>
				</Box>

				<Suspense fallback={<LoadingScreen />}>
					<PlayersStatsTable
						loading={loading}
						statsType={statsType}
						statistics={
							statsType === 'perGame'
								? filteredPerGameStatistics
								: statsType === 'total'
								? filteredTotalStatistics
								: statsType === 'advanced'
								? filteredAdvancedStatistics
								: null
						}
						primaryColor={primaryColor}
						secondaryColor={secondaryColor}
						tertiaryColor={tertiaryColor}
						includePagination={includePagination}
						playersPerPage={25}
					/>
				</Suspense>
			</Box>
		</Container>
	)
}

export default TeamIndivPage
const testDelay = async promise => {
	await new Promise(resolve => {
		setTimeout(resolve, 1000)
	})
	return promise
}
