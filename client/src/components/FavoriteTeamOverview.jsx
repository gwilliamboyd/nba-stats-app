import { useTheme } from '@emotion/react'
import { Box, Container, Grid, Typography } from '@mui/material'
import fullTeamNames from '../hooks/fullTeamNames'
import TeamIndivStatsRow from './TeamIndivStatsRow'

/* eslint-disable react/prop-types */
const FavoriteTeamOverview = ({ team }) => {
	const theme = useTheme()

	const primaryColor = eval(`theme.palette.teams.${team.team}.primary`)
	const secondaryColor = eval(`theme.palette.teams.${team.team}.secondary`)
	const tertiaryColor = eval(`theme.palette.teams.${team.team}.tertiary`)

	return (
		<Container
			disableGutters
			maxWidth='100%'
			sx={{
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
								{fullTeamNames(team.team)}
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
										{team.home}
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
										{team.arena}
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
						sx={{ width: '28%', marginTop: '1rem' }}></Grid>
				</Box>
			</Box>
		</Container>
	)
}

export default FavoriteTeamOverview
