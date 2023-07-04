/* eslint-disable react/prop-types */
import { Box, Grid, Typography } from '@mui/material'
import { useTheme } from '@emotion/react'
import PlayerCard from '../PlayerCard'
import { Link } from 'react-router-dom'

const HomePlayersLeaders = ({ stat, statArray }) => {
	const theme = useTheme()
	const { league } = theme.palette

	// console.log(statArray)

	const sortOperation = `b.${stat} - a.${stat}`

	// PTS PER GAME
	const sortByPoints = t => {
		// not actually an error
		// a and b are reflected in sort operation
		// which is being evaluated
		const ptsSorted = t?.sort((a, b) => eval(sortOperation))
		return ptsSorted
	}
	const sortedStats = sortByPoints(statArray)
	// console.log(sortedStats)

	// Don't delete yet
	const createTopTen = array => {
		let topTen = []
		for (let i = 0; i < 10; i++) {
			topTen?.push(array[i])
		}
		return topTen
	}
	const topTen = createTopTen(sortedStats)
	// console.log(topTen)

	let randomTopPlayers = topTen
		?.map(v => ({ v, sort: Math.random() }))
		.sort((a, b) => a.sort - b.sort)
		.map(({ v }) => v)
	// console.log(randomTopPlayers)
	const topFourPlayers = randomTopPlayers?.slice(0, 5)

	return (
		<Grid
			container
			width='100%'
			justifyContent='center'
			justifySelf={'center'}
			columns={10}
			columnSpacing={{ xs: 8, md: 10, lg: 18 }}>
			{topFourPlayers?.map(p => {
				const statValue = `p?.${stat}`
				return (
					<Grid
						key={p?.player}
						item
						color={league.nbaWhite}
						// xs={10}
						md={5}
						lg={2}>
						<Box
							sx={{
								width: 'fit-content',
								height: '100%',
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'space-between',
								alignItems: 'center',
							}}>
							<Link to={`/stats/players/${p?.id}`}>
								<PlayerCard
									width={220}
									player={p?.player}
								/>
							</Link>
							<Box
								display={'flex'}
								alignItems={'baseline'}
								gap={'4px'}>
								<Typography
									variant='h6'
									fontSize={32}
									fontWeight={800}>
									{eval(statValue)}
								</Typography>
								<Typography
									variant='h6'
									color={league.nbaRed}>
									/Game
								</Typography>
							</Box>
						</Box>
					</Grid>
				)
			})}
		</Grid>
	)
}

export default HomePlayersLeaders
