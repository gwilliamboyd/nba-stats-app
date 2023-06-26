/* eslint-disable react/prop-types */
import { Box, Grid, Typography } from '@mui/material'
import { useTheme } from '@emotion/react'
import PlayerCard from '../PlayerCard'

const HomePlayersLeaders = ({ stat, statArray }) => {
	const theme = useTheme()
	const { league } = theme.palette

	console.log(statArray)

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
	console.log(sortedStats)

	// Don't delete yet
	const createTopTen = array => {
		let topTen = []
		for (let i = 0; i < 10; i++) {
			topTen?.push(array[i])
		}
		return topTen
	}
	const topTen = createTopTen(sortedStats)
	console.log(topTen)

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
			columns={10}
			columnSpacing={18}>
			{topFourPlayers?.map(p => {
				const statValue = `p?.${stat}`
				return (
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
								width={220}
								player={p?.player}
							/>
							<Box
								display={'flex'}
								alignItems={'baseline'}
								gap={'12px'}>
								<Typography
									variant='h6'
									fontSize={32}
									fontWeight={800}>
									{eval(statValue)}
								</Typography>
								<Typography
									color={
										league.nbaRed
									}>{`${stat.toUpperCase()}/Game`}</Typography>
							</Box>
						</Box>
					</Grid>
				)
			})}
		</Grid>
	)
}

export default HomePlayersLeaders
