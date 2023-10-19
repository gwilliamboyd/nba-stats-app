/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { useTheme } from '@emotion/react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import fullTeamNames from '../../hooks/fullTeamNames'
import { setPlayerIndivStats } from '../../slices/players-stats/playerIndivSlice'
import { setPlayersPerGameStats } from '../../slices/players-stats/playersPerGameSlice'
import { Box, Container, Grid, Typography } from '@mui/material'
import PlayerIndivStatsRow from '../../components/stats-pages/PlayerIndivStatsRow'
import LoadingScreenBlank from '../utility/LoadingScreenBlank'
import QuickStat from '../../components/stats-pages/quick-stats/QuickStat'
import PlayerAvatar from '../../components/stats-pages/PlayerAvatar'
import QuickStatsContainer from '../../components/stats-pages/quick-stats/QuickStatsContainer'

const PlayerIndivPage = () => {
	// not an error, eslint doesn't recognize the theme
	// call in the eval
	const theme = useTheme()
	const { league } = theme.palette
	const dispatch = useDispatch()
	// redux state
	const playerIndivStats = useSelector(state => state.playerIndivStats)
	const playersPerGameStats = useSelector(state => state.playersPerGameStats)
	// grabs id param from url
	const { id } = useParams()
	// renaming the id variable more uniquely
	// to make it less confusing
	const playerId = id
	// component state
	const [loading, setLoading] = useState(true)

	const getPlayerIndivStats = async () => {
		const [playerIndivResponse, quickStatsResponse] = await Promise.all([
			fetch(
				`https://nba-stats-app-62o4.onrender.com/stats/players/${playerId}`,
				{
					method: 'GET',
				}
			),
			fetch(`https://nba-stats-app-62o4.onrender.com/stats/players/per-game`, {
				method: 'GET',
			}),
		])
		const indivData = await playerIndivResponse.json()
		const quickData = await quickStatsResponse.json()
		dispatch(setPlayerIndivStats({ playerIndivStats: indivData }))
		dispatch(setPlayersPerGameStats({ playersPerGameStats: quickData }))
		setLoading(false)
	}
	useEffect(() => {
		getPlayerIndivStats()
	}, [])
	const playerIndivStatistics = Object.values(playerIndivStats)[0]
	const player = playerIndivStatistics[0]

	const team = player?.team
	const primaryColor = eval(`theme.palette.teams.${team}?.primary`)
	const secondaryColor = eval(`theme.palette.teams.${team}?.secondary`)
	const tertiaryColor = eval(`theme.palette.teams.${team}?.tertiary`)
	// get quick stats from indiv stats fetch
	const quickStatsPlayer = Object.values(playersPerGameStats)
	const qs = Object.values(quickStatsPlayer)
	const qsArray = qs[0]
	// find quick stat for given team
	const quickStat = qsArray.find(q => q.id === player?.id)

	// quick stats variables
	const statsPts = quickStat?.pts
	const statsTrb = quickStat?.trb
	const statsAst = quickStat?.ast
	const statsFg = quickStat?.fg
	const statsFgPer = quickStat?.fgPer
	const stats3pPer = quickStat?.$3pPer

	return (
		<Container
			disableGutters
			maxWidth='100%'
			sx={{
				height: { xs: '100%', lg: 'calc(100vh - 100px)' },
				backgroundColor: league.nbaBackground,
			}}>
			{loading ? (
				<LoadingScreenBlank />
			) : (
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						gap: '1rem',
					}}>
					<Box
						sx={{
							marginTop: '3rem',
							width: { xs: '95%', lg: '90%' },
							maxWidth: '1434px',
							display: 'flex',
							flexDirection: { xs: 'column', lg: 'row' },
							justifyContent: 'space-between',
							alignItems: 'center',
						}}>
						<Box
							sx={{
								width: 'fit-content',
								display: 'flex',
								flexDirection: { xs: 'column', md: 'row' },
								justifyContent: { xs: 'center', lg: 'flex-start' },
								alignItems: { xs: 'center', md: 'flex-start' },
								gap: '2rem',
							}}>
							<PlayerAvatar
								team={team}
								src={`/images/players/${player?.player}.png`}
								secondaryColor={secondaryColor}
							/>
							<Box
								sx={{
									width: 'fit-content',
									display: 'flex',
									flexDirection: 'column',
									alignItems: { xs: 'center', md: 'flex-start' },
									justifyContent: { xs: 'center', md: 'flex-start' },
									gap: '16px',
								}}>
								<Typography
									color={tertiaryColor}
									fontWeight={800}
									variant='h3'
									sx={{
										fontSize: { xs: '2.5rem', md: '3.2rem' },
										marginTop: { xs: '0', md: '2rem' },
										letterSpacing: '-2.5px',
									}}>
									{player?.player}
								</Typography>
								<Box
									sx={{
										display: 'flex',
										alignItems: 'baseline',
										gap: '12px',
									}}>
									<Typography
										color={secondaryColor}
										marginLeft={'0.2rem'}
										variant='h5'
										fontWeight={700}>
										{fullTeamNames(team)}
									</Typography>
									<Typography
										variant='h5'
										fontWeight={700}
										color={tertiaryColor}>
										|
									</Typography>
									<Typography
										color={tertiaryColor}
										variant='h5'
										fontWeight={700}>
										{player?.pos}
									</Typography>
								</Box>
							</Box>
							<Box sx={{ display: { xs: 'none', md: 'block' } }}>
								<img
									src={`/images/svgs/team-logos/${team}.svg`}
									alt={`${team} logo`}
									width={100}
									style={{
										marginLeft: '-1rem',
									}}
								/>
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
						<LoadingScreenBlank />
					) : (
						<Box
							sx={{
								width: '100%',
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
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
								<PlayerIndivStatsRow
									team={team}
									primaryColor={primaryColor}
									secondaryColor={secondaryColor}
									tertiaryColor={tertiaryColor}
									statsType={'perGame'}
									loading={loading}
									statistics={playerIndivStatistics}
								/>
							</Box>
							<Box
								sx={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									gap: '0.5rem',
								}}>
								<Typography
									variant='h5'
									fontWeight={700}
									color={tertiaryColor}
									sx={{ alignSelf: 'flex-start' }}>
									Totals
								</Typography>
								<PlayerIndivStatsRow
									team={team}
									primaryColor={primaryColor}
									secondaryColor={secondaryColor}
									tertiaryColor={tertiaryColor}
									statsType={'total'}
									loading={loading}
									statistics={playerIndivStatistics}
								/>
							</Box>
							<Box
								sx={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									gap: '0.5rem',
								}}>
								<Typography
									variant='h5'
									fontWeight={700}
									color={tertiaryColor}
									sx={{ alignSelf: 'flex-start' }}>
									Advanced
								</Typography>
								<PlayerIndivStatsRow
									team={team}
									primaryColor={primaryColor}
									secondaryColor={secondaryColor}
									tertiaryColor={tertiaryColor}
									statsType={'advanced'}
									loading={loading}
									statistics={playerIndivStatistics}
								/>
							</Box>
						</Box>
					)}
				</Box>
			)}
		</Container>
	)
}

export default PlayerIndivPage
