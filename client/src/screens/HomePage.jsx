/* eslint-disable react-hooks/exhaustive-deps */
import { Grid, Box, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { Link } from 'react-router-dom'
// import backgroundKawhi from '../../public/images/kawhi-leonard.jpg'
// Getting data from data folder seems easier since I'm only
// trying to map over them to get the logo images, not any stats
import teams from '../data/teams-perGame.json'
import HomeTeamCard from '../components/user-profile/HomeTeamCard'
import PlayerCard from '../components/PlayerCard'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPlayersPerGameStats } from '../slices/players-stats/playersPerGameSlice'
import { topScorers } from '../data/home-page-stats/topScorers'
import HomePlayersLeaders from '../components/home-page/HomePlayersLeaders'

const HomePage = () => {
	const theme = useTheme()
	const { league } = theme.palette

	const dispatch = useDispatch()

	const playersPerGameStats = useSelector(state => state.playersPerGameStats)

	const sortedTeams = teams.sort((a, b) => a.team.localeCompare(b.team))

	const getPlayersPerGame = async () => {
		const response = await fetch(
			`http://localhost:5000/stats/players/per-game`,
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
	const sortableStatsThree = [...playersPerGameStatistics]
	const sortableStatsTrb = [...playersPerGameStatistics]

	/* // PTS PER GAME
	const sortByPoints = t => {
		const ptsSorted = t?.sort((a, b) => b.pts - a.pts)
		return ptsSorted
	}
	const pointsSorted = sortByPoints(sortableStatsPts)
	console.log(pointsSorted)
	// 3 POINTERS PER GAME
	const sortBy3Pt = t => {
		const $3pSorted = t.sort((a, b) => b.$3p - a.$3p)
		return $3pSorted
	}
	const threePSorted = sortBy3Pt(sortableStatsThree)
	console.log(threePSorted)
	// TOTAL REBOUNDS
	const sortByTotalRebounds = t => {
		const trbSorted = t.sort((a, b) => b.trb - a.trb)
		return trbSorted
	}
	const trbSorted = sortByTotalRebounds(sortableStatsTrb)
	console.log(trbSorted) */

	/* // Don't delete yet
	const createTopTen = array => {
		let topTen = []
		for (let i = 0; i < 10; i++) {
			topTen.push(array[i])
		}
		return topTen
	}
	const topTenScorers = createTopTen(pointsSorted)
	console.log(topTenScorers)
	const topTenThree = createTopTen(threePSorted)
	console.log(topTenThree)
	const topTenTrb = createTopTen(trbSorted)
	console.log(topTenTrb) */

	return (
		<main
			style={{
				backgroundColor: league.nbaBackground,
				// height: 'calc(100vh - 100px)',
				width: 'calc(100vw - 17px)',
				padding: '0',
			}}>
			<Grid
				container
				columns={6}
				height='100%'>
				<Box
					sx={{
						padding: '2rem 0 4rem',
						width: '100vw',
						height: 'fit-content',
						backgroundImage: 'url(../../public/images/kawhi-leonard.jpg)',
						backgroundPosition: 'center',
						backgroundSize: 'cover',
						color: league.nbaWhite,
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
					backgroundColor={league.nbaRed}>
					<Box
						width='85%'
						sx={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
						<Box sx={{ display: 'flex', alignItems: 'baseline', gap: '3rem' }}>
							<Typography variant='h3'>Team Stats</Typography>
							<Link to='/stats/teams'>
								<Typography variant='body1'>See All Teams</Typography>
							</Link>
						</Box>
						<Grid
							container
							columns={10}
							columnSpacing={6}
							rowSpacing={4}
							justify='center'
							// alignItems='center'
						>
							{sortedTeams.map(team => {
								return (
									<Grid
										p={0}
										key={team.id}
										item
										alignSelf='center'
										xs={1}
										sx={{
											justifySelf: 'center',
										}}>
										<Link to={`http://localhost:3000/stats/teams/${team.team}`}>
											<HomeTeamCard
												width={120}
												team={team.team}
											/>
										</Link>
									</Grid>
								)
							})}
						</Grid>
					</Box>
				</Box>
				<Box
					sx={{
						width: '100%',
						padding: '2rem 0 4rem',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'flex-start',
						gap: '3rem',
					}}>
					<Box
						width='85%'
						color={league.nbaWhite}
						sx={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							gap: '3.5rem',
						}}>
						<Box
							alignSelf='flex-start'
							alignItems='baseline'
							sx={{ display: 'flex', gap: '3rem' }}>
							<Typography
								fontWeight={900}
								variant='h3'>
								Player Stats
							</Typography>
							<Link to='/stats/players'>
								<Typography variant='body1'>See All Players</Typography>
							</Link>
						</Box>
						<Typography
							variant='h4'
							fontWeight={700}
							alignSelf={'flex-start'}>
							Top Scorers
						</Typography>
						<HomePlayersLeaders
							stat={'pts'}
							statArray={sortableStatsPts}
						/>
						<Typography
							variant='h4'
							fontWeight={700}
							alignSelf={'flex-start'}>
							Top 3Pt Shooters
						</Typography>
						<HomePlayersLeaders
							stat={'$3p'}
							statArray={sortableStatsThree}
						/>
						<Typography
							variant='h4'
							fontWeight={700}
							alignSelf={'flex-start'}>
							Most Boards
						</Typography>
						<HomePlayersLeaders
							stat={'trb'}
							statArray={sortableStatsTrb}
						/>
						{/* <Typography
							variant='h4'
							fontWeight={700}
							alignSelf={'flex-start'}>
							Top Scorers
						</Typography>
						<Grid
							container
							width='100%'
							justifyContent='center'
							columns={10}
							columnSpacing={18}>
							{topFourPlayers?.map(p => (
								<Grid
									key={p?.id}
									item
									color={league.nbaWhite}
									xs={2}>
									<Box
										sx={{
											width: 'fit-content',
											height: '100%',
											display: 'flex',
											flexDirection: 'column',
											justifyContent: 'space-between',
											alignItems: 'center',
										}}>
										<PlayerCard
											width={180}
											player={p?.player}
										/>
										<Box
											display={'flex'}
											alignItems={'baseline'}
											gap={'12px'}>
											<Typography
												variant='h6'
												fontWeight={800}>
												{p?.pts}
											</Typography>
											<Typography>Pts/Game</Typography>
										</Box>
									</Box>
								</Grid>
							))}							
						</Grid> */}
					</Box>
				</Box>
			</Grid>
		</main>
	)
}

export default HomePage
