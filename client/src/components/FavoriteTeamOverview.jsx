import { useTheme } from '@mui/material/styles'
import { Box, Container, Grid, Typography } from '@mui/material'
import fullTeamNames from '../hooks/fullTeamNames'
import TeamIndivStatsRow from './stats-pages/TeamIndivStatsRow'
import QuickStat from './stats-pages/quick-stats/QuickStat'
import { useEffect } from 'react'
import allTeams from '../data/teams-perGame.json'
import SlashIcon from '../../public/images/svgs/SlashIcon'
import PlayerCard from './PlayerCard'
import { Link } from 'react-router-dom'

/* eslint-disable react/prop-types */
const FavoriteTeamOverview = ({
	team,
	allTeams,
	leagueStandings,
	ptsLeaders,
	threePLeaders,
}) => {
	// extract array of team objects from passed-in standings object
	leagueStandings = Object.values(leagueStandings)[0]
	console.log(ptsLeaders)
	console.log(threePLeaders)
	console.log(team)
	// theme
	const theme = useTheme()

	// Quick stats overview
	const statsPts = team.pts
	const statsTrb = team.trb
	const statsAst = team.ast
	const statsFg = team.fg
	const statsFgPer = team.fgPer
	const stats3pPer = team.$3pPer

	const primaryColor = eval(`theme.palette.teams.${team?.team}.primary`)
	console.log(primaryColor)
	const secondaryColor = eval(`theme.palette.teams.${team?.team}.secondary`)
	const tertiaryColor = eval(`theme.palette.teams.${team?.team}.tertiary`)

	// STAT RANKINGS LEAGUE-WIDE
	const sortByPoints = t => {
		const ptsSorted = t?.sort((a, b) => b.pts - a.pts)
		return ptsSorted
	}
	const sortBy3Pts = t => {
		const $3pSorted = t.sort((a, b) => b.$3p - a.$3p)
		return $3pSorted
	}
	const sortByWins = t => {
		const winsSorted = t.sort((a, b) => b.w - a.w)
		return winsSorted
	}

	const findRanking = (team, sortingFunction) => {
		// get proper suffix when printing final result
		const getNumericalSuffix = a => {
			let b = a % 10
			let c = a % 100

			if (b == 1 && c != 11) {
				return a + 'st'
			}
			if (b == 2 && c != 12) {
				return a + 'nd'
			}
			if (b == 3 && c != 13) {
				return a + 'rd'
			}
			return a + 'th'
		}
		// finds passed-in team name in sorting function of choice
		const rankingMatch = sortingFunction => sortingFunction.team === team
		// get ranking (index)
		const ranking = sortingFunction.findIndex(rankingMatch)
		// add 1 to index to get true ranking
		let finalRanking = ranking + 1

		return getNumericalSuffix(finalRanking)
	}

	// search for team in standings to get wins and losses
	const foundTeam = leagueStandings.find(tm => tm.team === team.team)

	// get conference ranking
	const rankByWinsConference = () => {
		const result = leagueStandings.filter(
			s => s.conference === foundTeam.conference
		)
		return findRanking(team.team, sortByWins(result))
	}
	// get league-wide ranking
	const rankByWinsLeague = () => {
		// waits for get leagueStandings before executing sortByWins()
		const league = [...leagueStandings]
		const leagueRank = findRanking(team.team, sortByWins(league))
		return leagueRank
	}

	const topScorer = sortByPoints(ptsLeaders)[0]
	console.log(topScorer)
	const topThreePts = sortBy3Pts(threePLeaders)[0]

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
					p: { xs: '0 1rem', md: '0' },
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					gap: '2rem',
				}}>
				<Box
					sx={{
						width: { xs: '100%', md: '85%' },
						display: 'flex',
						flexDirection: { xs: 'column', md: 'row' },
						justifyContent: 'center',
					}}>
					<Box
						sx={{
							display: 'flex',
							flexDirection: { xs: 'column', md: 'row' },
							alignItems: 'center',
							gap: { xs: '0', md: '2rem' },
							minWidth: { xs: '0', md: '680px' },
							// flex: '1 0 0',
						}}>
						<Box sx={{ width: { xs: '200px', md: '320px' } }}>
							<img
								src={`/images/svgs/team-logos/${team.team}.svg`}
								width={'100%'}
								alt={`${team.team} logo`}
							/>
						</Box>
						<Box
							sx={{
								width: '100%',
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								gap: '24px',
							}}>
							<Typography
								color={tertiaryColor}
								fontWeight={800}
								variant='h2'
								sx={{
									marginTop: { xs: '0', md: '6rem' },
									letterSpacing: '-2.5px',
									fontSize: { xs: '50px', md: '64px' },
									textAlign: { xs: 'center', md: 'left' },
								}}>
								{fullTeamNames(team.team)}
							</Typography>
							<Box
								sx={{
									width: { xs: '90%', md: 'auto' },
									display: 'flex',
									gap: '12px',
									alignItems: 'flex-start',
								}}>
								{/* WINS */}
								<Box
									sx={{
										display: 'flex',
										flexDirection: 'column',
										justifyContent: 'baseline',
										alignItems: 'center',
									}}>
									<Typography
										color={secondaryColor}
										variant='body2'
										fontWeight={900}
										// sx={{ fontSize: { xs: '12px', md: '15px' } }}
									>
										WINS
									</Typography>
									<Typography
										variant='h4'
										sx={{ fontSize: { xs: '28px', md: '36px' } }}>
										{foundTeam?.w}
									</Typography>
								</Box>
								<SlashIcon
									height={72}
									fill={secondaryColor}
								/>
								{/* LOSSES */}
								<Box
									sx={{
										display: 'flex',
										flexDirection: 'column',
										justifyContent: 'baseline',
										alignItems: 'center',
									}}>
									<Typography
										color={secondaryColor}
										variant='body2'
										fontWeight={900}
										// sx={{ fontSize: { xs: '12px', md: '15px' } }}
									>
										LOSSES
									</Typography>
									<Typography
										variant='h4'
										sx={{ fontSize: { xs: '28px', md: '36px' } }}>
										{foundTeam?.l}
									</Typography>
								</Box>
								<SlashIcon
									height={72}
									fill={secondaryColor}
								/>
								<Box
									sx={{
										display: 'flex',
										flexDirection: 'column',
										justifyContent: 'baseline',
										alignItems: 'center',
									}}>
									<Typography
										color={secondaryColor}
										variant='body2'
										fontWeight={900}
										// sx={{ fontSize: { xs: '12px', md: '15px' } }}
									>
										CONFERENCE
									</Typography>
									<Typography
										variant='h4'
										sx={{ fontSize: { xs: '28px', md: '36px' } }}>
										{rankByWinsConference()}
									</Typography>
								</Box>
								<SlashIcon
									height={72}
									fill={secondaryColor}
								/>
								<Box
									sx={{
										display: 'flex',
										flexDirection: 'column',
										justifyContent: 'baseline',
										alignItems: 'center',
									}}>
									<Typography
										color={secondaryColor}
										variant='body2'
										fontWeight={900}
										// sx={{ fontSize: { xs: '12px', md: '15px' } }}
									>
										LEAGUE
									</Typography>
									<Typography
										variant='h4'
										sx={{ fontSize: { xs: '28px', md: '36px' } }}>
										{rankByWinsLeague()}
									</Typography>
								</Box>
							</Box>
						</Box>
					</Box>
				</Box>
				<Box
					width='100%'
					sx={{
						display: 'flex',
						flexDirection: { xs: 'column', md: 'row' },
						justifyContent: { xs: 'flex-start', md: 'center' },
						alignItems: { xs: 'center', md: 'flex-start' },
						gap: { xs: '2rem', md: '5rem' },
					}}>
					{/* STATS LEADERS */}
					<Box
						sx={{
							// width: { xs: '100%', md: 'auto' },
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							gap: '20px',
						}}>
						<Typography
							color={secondaryColor}
							variant='h2'
							fontWeight={900}
							sx={{ fontSize: { xs: '50px', md: '64px' } }}>
							Leaders
						</Typography>
						<Box
							sx={{
								display: 'flex',
								flexDirection: { xs: 'column', md: 'row' },
								justifyContent: 'center',
								alignItems: 'center',
								gap: { xs: '2rem', md: '5rem' },
							}}>
							<Box
								sx={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									gap: '8px',
								}}>
								<Typography
									variant='h5'
									fontWeight={700}>
									Top Scorer
								</Typography>
								<Link to={`/stats/players/${topScorer?.id}`}>
									<PlayerCard
										player={topScorer?.player}
										width={150}
									/>
								</Link>
								<Box
									alignSelf='center'
									sx={{ display: 'flex', gap: '8px', alignItems: 'baseline' }}>
									<Typography
										variant='h4'
										fontWeight={900}
										color={secondaryColor}>
										{topScorer?.pts}
									</Typography>
									<Typography
										variant='h5'
										fontWeight={500}
										color={tertiaryColor}>
										/ Game
									</Typography>
								</Box>
							</Box>
							<Box
								sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
								<Typography
									variant='h5'
									fontWeight={700}>
									Leader From 3
								</Typography>
								<Link to={`/stats/players/${topThreePts?.id}`}>
									<PlayerCard
										player={topThreePts?.player}
										width={150}
									/>
								</Link>
								<Box
									alignSelf='center'
									sx={{ display: 'flex', gap: '8px', alignItems: 'baseline' }}>
									<Typography
										variant='h4'
										fontWeight={900}
										color={secondaryColor}>
										{topThreePts?.$3p}
									</Typography>
									<Typography
										variant='h5'
										fontWeight={500}
										color={tertiaryColor}>
										/ Game
									</Typography>
								</Box>
							</Box>
						</Box>
					</Box>
					{/* TEAM BREAKDOWN */}
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							gap: '20px',
						}}>
						<Typography
							color={secondaryColor}
							variant='h2'
							fontWeight={900}
							sx={{
								fontSize: { xs: '50px', md: '64px' },
								textAlign: { xs: 'center', md: 'left' },
							}}>
							Team Breakdown
						</Typography>
						<Grid
							container
							columns={2}>
							<Grid
								item
								xs={1}>
								<Box
									sx={{
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'center',
									}}>
									<Typography
										variant='h2'
										fontWeight={800}
										sx={{ fontSize: { xs: '50px', md: '64px' } }}>
										{statsPts}
									</Typography>
									<Typography
										color={secondaryColor}
										variant='h5'
										fontWeight={500}
										sx={{ fontSize: { xs: '20px', md: '26px' } }}>
										Pts/Game
									</Typography>
								</Box>
							</Grid>
							<Grid
								item
								xs={1}>
								<Box
									sx={{
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'center',
									}}>
									<Typography
										variant='h2'
										fontWeight={800}
										sx={{ fontSize: { xs: '50px', md: '64px' } }}>
										{stats3pPer}
									</Typography>
									<Typography
										color={secondaryColor}
										variant='h5'
										fontWeight={500}
										sx={{ fontSize: { xs: '20px', md: '26px' } }}>
										3P%
									</Typography>
								</Box>
							</Grid>
							<Grid
								item
								xs={1}>
								<Box
									sx={{
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'center',
									}}>
									<Typography
										variant='h2'
										fontWeight={800}
										sx={{ fontSize: { xs: '50px', md: '64px' } }}>
										{statsTrb}
									</Typography>
									<Typography
										color={secondaryColor}
										variant='h5'
										fontWeight={500}
										sx={{ fontSize: { xs: '20px', md: '26px' } }}>
										Rebounds/Game
									</Typography>
								</Box>
							</Grid>
							<Grid
								item
								xs={1}>
								<Box
									sx={{
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'center',
									}}>
									<Typography
										variant='h2'
										fontWeight={800}
										sx={{ fontSize: { xs: '50px', md: '64px' } }}>
										{statsFgPer}
									</Typography>
									<Typography
										color={secondaryColor}
										variant='h5'
										fontWeight={500}
										sx={{ fontSize: { xs: '20px', md: '26px' } }}>
										FG%
									</Typography>
								</Box>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Box>
		</Container>
	)
}

export default FavoriteTeamOverview
