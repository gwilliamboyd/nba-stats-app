/* eslint-disable react-hooks/exhaustive-deps */
import { useTheme } from '@emotion/react'
import { useSelector, useDispatch } from 'react-redux'
import { setTeamIndivStats } from '../slices/teamIndivSlice'
import { Box, Container, Grid, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import TeamIndivStatsRow from '../components/TeamIndivStatsRow'
import LoadingScreenBlank from './LoadingScreenBlank'
import fullTeamNames from '../hooks/fullTeamNames'
import QuickStat from '../components/stats-pages/QuickStat'

const TeamIndivPage = () => {
	// not an error, eslint doesn't recognize the theme
	// call in the eval function
	const theme = useTheme()
	const dispatch = useDispatch()
	const teamIndivStats = useSelector(state => state.teamIndivStats)
	const team = window.location.href.slice(-3)
	// const { teams } = theme.palette
	const primaryColor = eval(`theme.palette.teams.${team}.primary`)
	const secondaryColor = eval(`theme.palette.teams.${team}.secondary`)
	const tertiaryColor = eval(`theme.palette.teams.${team}.tertiary`)

	const [loading, setLoading] = useState(true)

	const getTeamIndivStats = async () => {
		const response = await fetch(`http://localhost:5000/stats/teams/${team}`, {
			method: 'GET',
		})
		const data = await response.json()
		dispatch(setTeamIndivStats({ teamIndivStats: data }))
		setLoading(false)
	}
	console.log(teamIndivStats)
	const teamIndivStatistics = Object.values(teamIndivStats)[0]
	// returns an array, [0] is object, so this returns object directly
	const quickStatsArray = teamIndivStatistics[0][0]

	const statsPts = quickStatsArray.pts
	const statsTrb = quickStatsArray.trb
	const statsAst = quickStatsArray.ast
	const statsFg = quickStatsArray.fg
	const statsFgPer = quickStatsArray.fgPer
	const stats3pPer = quickStatsArray.$3pPer

	useEffect(() => {
		getTeamIndivStats()
	}, [])

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
							statistics={teamIndivStatistics[0]}
						/>
						<TeamIndivStatsRow
							team={team}
							primaryColor={primaryColor}
							secondaryColor={secondaryColor}
							tertiaryColor={tertiaryColor}
							statsType={'total'}
							loading={loading}
							statistics={teamIndivStatistics[1]}
						/>
						<TeamIndivStatsRow
							team={team}
							primaryColor={primaryColor}
							secondaryColor={secondaryColor}
							tertiaryColor={tertiaryColor}
							statsType={'advanced'}
							loading={loading}
							statistics={teamIndivStatistics[2]}
						/>
					</>
				)}
			</Box>
		</Container>
	)
}

export default TeamIndivPage
