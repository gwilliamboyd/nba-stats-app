import { useTheme } from '@emotion/react'
import { Box, Container, Grid, Typography } from '@mui/material'
import fullTeamNames from '../hooks/fullTeamNames'
import TeamIndivStatsRow from './TeamIndivStatsRow'
import QuickStat from './stats-pages/QuickStat'

/* eslint-disable react/prop-types */
const FavoriteTeamOverview = ({ team }) => {
	const theme = useTheme()

	// Quick stats overview
	const statsPts = team.pts
	const statsTrb = team.trb
	const statsAst = team.ast
	const statsFg = team.fg
	const statsFgPer = team.fgPer
	const stats3pPer = team.$3pPer

	const primaryColor = eval(`theme.palette.teams.${team.team}.primary`)
	const secondaryColor = eval(`theme.palette.teams.${team.team}.secondary`)
	const tertiaryColor = eval(`theme.palette.teams.${team.team}.tertiary`)

	return (
		<Container
			disableGutters
			maxWidth='100%'
			sx={{
				backgroundColor: primaryColor,
				paddingBottom: '3rem',
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
						width: '85%',
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'center',
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
							src={`../../public/images/svgs/team-logos/${team.team}.svg`}
							width={200}
							alt={`${team.team} logo`}
						/>
						<Typography
							color={tertiaryColor}
							fontWeight={800}
							variant='h3'
							sx={{
								marginTop: '4rem',
								letterSpacing: '-2.5px',
							}}>
							{fullTeamNames(team.team)}
						</Typography>
					</Box>
				</Box>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
					}}>
					<Typography variant='h6'>At A Glance</Typography>
					<Grid
						container
						columns={6}
						columnSpacing={4}
						rowSpacing={2}
						sx={{ width: '100%', marginTop: '1rem' }}>
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
			</Box>
		</Container>
	)
}

export default FavoriteTeamOverview
