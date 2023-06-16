/* eslint-disable react-hooks/exhaustive-deps */
import { useTheme } from '@emotion/react'
import { useSelector, useDispatch } from 'react-redux'
import { setTeamIndivStats } from '../slices/teamIndivSlice'
import { setTeamsPerGameStats } from '../slices/teamsPerGameSlice'
import { Box, Container, Grid, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import TeamIndivStatsRow from '../components/TeamIndivStatsRow'
import LoadingScreenBlank from './LoadingScreenBlank'
import fullTeamNames from '../hooks/fullTeamNames'
import QuickStat from '../components/stats-pages/QuickStat'

const TeamIndivPage = () => {
	// not an error, eslint doesn't recognize the theme
	// call in the eval
	const theme = useTheme()
	const dispatch = useDispatch()
	const teamIndivStats = useSelector(state => state.teamIndivStats)
	const teamsPerGameStats = useSelector(state => state.teamsPerGameStats)
	const team = window.location.href.slice(-3)
	// const { teams } = theme.palette
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
	const teamIndivStatistics = Object.values(teamIndivStats)[0]
	const quickStatsTeam = Object.values(teamsPerGameStats)
	console.log(quickStatsTeam)
	const qs = Object.values(quickStatsTeam)
	const qsArray = qs[0]
	const quickStat = qsArray.find(q => q.team === `${team}`)
	console.log(quickStat)

	const statsPts = quickStat?.pts
	console.log(statsPts)
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
				height: 'calc(100vh - 100px)',
				backgroundColor: primaryColor,
			}}>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					gap: '3rem',
				}}>
				<Box
					sx={{
						marginTop: '3rem',
						width: '85%',
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-between',
					}}>
					<Box sx={{ display: 'flex', alignItems: 'flex-start', gap: '2rem' }}>
						<img
							src={`../../public/images/svgs/team-logos/${team}.svg`}
							width={200}
							alt='Chicago Bulls logo'
						/>
						<Typography
							variant='h3'
							sx={{ color: tertiaryColor, marginTop: '2rem' }}>
							{fullTeamNames(team)}
						</Typography>
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
					<>
						<TeamIndivStatsRow
							team={team}
							primaryColor={primaryColor}
							secondaryColor={secondaryColor}
							tertiaryColor={tertiaryColor}
							statsType={'perGame'}
							loading={loading}
							statistics={teamIndivStats && teamIndivStatistics[0]}
						/>
						<TeamIndivStatsRow
							team={team}
							primaryColor={primaryColor}
							secondaryColor={secondaryColor}
							tertiaryColor={tertiaryColor}
							statsType={'total'}
							loading={loading}
							statistics={teamIndivStats && teamIndivStatistics[1]}
						/>
						<TeamIndivStatsRow
							team={team}
							primaryColor={primaryColor}
							secondaryColor={secondaryColor}
							tertiaryColor={tertiaryColor}
							statsType={'advanced'}
							loading={loading}
							statistics={teamIndivStats && teamIndivStatistics[2]}
						/>
					</>
				)}
			</Box>
		</Container>
	)
}

export default TeamIndivPage
