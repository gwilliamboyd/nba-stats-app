/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Box, Grid, Typography } from '@mui/material'
import { useTheme } from '@emotion/react'
import PlayerCard from '../PlayerCard'
import { Link } from 'react-router-dom'
import { useEffect, useMemo } from 'react'

const HomePlayersLeaders = ({ stat, statArray }) => {
	const theme = useTheme()
	const { league } = theme.palette

	const sortOperation = `b.${stat} - a.${stat}`

	// PTS PER GAME
	const sortByPoints = useMemo(() => {
		// not actually an error
		// a and b are reflected in sort operation
		// which is being evaluated
		const ptsSorted = statArray
			?.sort((a, b) => eval(sortOperation))
			.slice(0, 10)
		console.log(ptsSorted)
		return ptsSorted
	}, [statArray])

	let topFivePlayers = sortByPoints
		?.map(v => ({ v, sort: Math.random() }))
		.sort((a, b) => a.sort - b.sort)
		.map(({ v }) => v)
		.slice(0, 5)
	/* let topFivePlayers = sortByPoints => {
		for (let i = sortByPoints.length - 1; i > 0; i--) {
			const j = (Math.floor(Math.random() * (i + 1))[
				(sortByPoints[i], sortByPoints[j])
			] = [sortByPoints[j], sortByPoints[i]])
		}
	}
	console.log(topFivePlayers) */
	/* const numArray = [0, 1, 2, 3, 4]
	function shuffleArray(array) {
		for (let i = array.length - 1; i > 0; i--) {
			let j = Math.floor(Math.random() * (i + 1))
			let temp = array[i]
			array[i] = array[j]
			array[j] = temp
		}
		return array.slice(0, 5)
	}
	useEffect(() => {
		console.log(shuffleArray(sortByPoints))
	}, [sortByPoints]) */
	/* const topFivePlayers = useMemo(() => {
		for (let i = sortByPoints.length - 1; i > 0; i--) {
			let j = Math.floor(Math.random() * (i + 1))
			let temp = sortByPoints[i]
			sortByPoints[i] = sortByPoints[j]
			sortByPoints[j] = temp
		}
		return sortByPoints.slice(0, 5)
	}, [sortByPoints])
	console.log(topFivePlayers) */

	return (
		<Grid
			container
			width='100%'
			justifyContent='center'
			justifySelf={'center'}
			columns={10}
			columnSpacing={{ xs: 8, md: 10, lg: 18 }}>
			{topFivePlayers?.map(p => {
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
