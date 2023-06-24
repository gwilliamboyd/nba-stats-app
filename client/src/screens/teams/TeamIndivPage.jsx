/* eslint-disable react-hooks/exhaustive-deps */
import { useTheme } from '@emotion/react'
import { useSelector, useDispatch } from 'react-redux'
import { setTeamIndivStats } from '../../slices/teamIndivSlice'
import { setTeamsPerGameStats } from '../../slices/teamsPerGameSlice'
import { Box, Container, Grid, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import TeamIndivStatsRow from '../../components/stats-pages/TeamIndivStatsRow'
import LoadingScreenBlank from '../utility/LoadingScreenBlank'
import fullTeamNames from '../../hooks/fullTeamNames'
import QuickStat from '../../components/stats-pages/QuickStat'

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
			fetch(`http://localhost:5000/stats/teams/${team}`, {
				method: 'GET',
			}),
			fetch(`http://localhost:5000/stats/teams/per-game`, {
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

	return (
		<Container
			disableGutters
			maxWidth='100%'
			sx={{
				height: 'calc(100vh - 100px)',
				backgroundColor: primaryColor,
			}}>
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
						width: '85%',

						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-between',
					}}>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'flex-start',
							gap: '2rem',
							minWidth: '680px',
							// flex: '1 0 0',
						}}>
						<img
							src={`../../public/images/svgs/team-logos/${team}.svg`}
							width={200}
							alt={`${team} logo`}
						/>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								gap: '16px',
								flex: 1,
							}}>
							<Typography
								color={tertiaryColor}
								fontWeight={800}
								variant='h3'
								sx={{
									marginTop: '2rem',
									letterSpacing: '-2.5px',
								}}>
								{fullTeamNames(team)}
							</Typography>
							<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
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
										fontWeight={600}
										variant='h5'
										sx={{
											color: tertiaryColor,
											letterSpacing: '-2.5px',
										}}>
										{arena}
									</Typography>
								</Box>
							</Box>
						</Box>
					</Box>
					<Grid
						container
						columns={6}
						columnSpacing={4}
						rowSpacing={2}
						sx={{ width: '28%', marginTop: '1rem' }}>
						<QuickStat
							heading='PTS'
							featuredStat={statsPts}
							secondaryColor={secondaryColor}
							tertiaryColor={tertiaryColor}
						/>
						<QuickStat
							heading='TRB'
							featuredStat={statsTrb}
							secondaryColor={secondaryColor}
							tertiaryColor={tertiaryColor}
						/>
						<QuickStat
							heading='AST'
							featuredStat={statsAst}
							secondaryColor={secondaryColor}
							tertiaryColor={tertiaryColor}
						/>
						<QuickStat
							heading='FG'
							featuredStat={statsFg}
							secondaryColor={secondaryColor}
							tertiaryColor={tertiaryColor}
						/>
						<QuickStat
							heading='FG%'
							featuredStat={statsFgPer}
							secondaryColor={secondaryColor}
							tertiaryColor={tertiaryColor}
						/>
						<QuickStat
							heading='3P%'
							featuredStat={stats3pPer}
							secondaryColor={secondaryColor}
							tertiaryColor={tertiaryColor}
						/>
					</Grid>
				</Box>
				{loading ? (
					<LoadingScreenBlank />
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
			</Box>
		</Container>
	)
}

export default TeamIndivPage
