/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Box, Grid, Typography } from '@mui/material'
import { useTheme } from '@emotion/react'
import PlayerCard from '../PlayerCard'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
// import LoadingScreen from '../../screens/utility/LoadingScreen'

const HomePlayersLeaders = ({ /* loading,  */ stat, statArray }) => {
	const theme = useTheme()
	const { league } = theme.palette

	// const [graphicOn, setGraphicOn] = useState(false)
	const [oldUI, setOldUI] = useState(false)
	const [zoomIn, setZoomIn] = useState(false)

	/* const evaluateGraphic = state => {
		switch (state) {
			case state:
				return 'block'
			case !state:
				return 'none'
		}
	}
	useEffect(() => {
		console.log(`Graphic On: ${graphicOn}`)
	}, [graphicOn]) */

	const sortOperation = `b.${stat} - a.${stat}`

	const topFivePlayers = () => {
		const ptsSorted = statArray
			?.sort((a, b) => eval(sortOperation))
			.slice(0, 10)
		const result = ptsSorted
			?.map(v => ({ v, sort: Math.random() }))
			.sort((a, b) => a.sort - b.sort)
			.map(({ v }) => v)
		/* .slice(0, 5) */
		return result
	}

	useEffect(() => {
		statArray = topFivePlayers()
	}, [topFivePlayers()])

	return (
		<>
			{oldUI && (
				<Grid
					container
					width='100%'
					justifyContent='center'
					justifySelf={'center'}
					columns={10}
					columnSpacing={{ xs: 8, md: 10, lg: 16 }}>
					{statArray?.slice(0, 5)?.map(p => {
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
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
									}}>
									<Box
										sx={{
											boxSizing: 'border-box',
											position: 'relative',
											width: 'fit-content',
											height: '100%',
											display: 'flex',
											flexDirection: 'column',
											justifyContent: 'space-between',
											alignItems: 'center',
											zIndex: '2',
											// padding: '1rem',
										}}>
										{/* <Box
								sx={{
									position: 'absolute',
									zIndex: '1',
									top: '0',
									left: '0',
									display: graphicOn ? 'block' : 'none',
									width: '220px',
									height: '332px',
									// backgroundImage: 'url(/images/player-home-graphic.png)',
								}}>
								<img
									width={220}
									height={332}
									src='/images/player-home-graphic.png'
								/>
							</Box> */}
										<Link
											// sx={{ zIndex: '2' }}
											/* onMouseEnter={() => setGraphicOn(true)}
								onMouseLeave={() => setGraphicOn(false)} */
											to={`/stats/players/${p?.id}`}>
											<PlayerCard
												width={220}
												player={p?.player}
											/>
										</Link>
										<Box
											display={'flex'}
											alignItems={'baseline'}
											gap={'4px'}
											zIndex={'3'}>
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
								</Box>
							</Grid>
						)
					})}
				</Grid>
			)}
			<Box
				sx={{
					width: '100%',
					display: 'grid',
					justifySelf: 'center',
					justifyItems: 'space-between',
					gridTemplateColumns: 'repeat(5, 1fr)',
					gridTemplateRows: '1fr',
					columnGap: '4rem',
				}}>
				{statArray?.slice(0, 5)?.map(p => {
					const statValue = `p?.${stat}`
					return (
						<Box
							key={p?.player}
							color={league.nbaWhite}
							sx={{
								boxSizing: 'border-box',
								position: 'relative',
								// width: 'fit-content',
								width: '252px',
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'space-between',
								alignItems: 'center',
								zIndex: '2',
								padding: '1rem',
								/* transform: 'scale(1)',
								transition: 'ease-out all 0.35s',
								'&:hover': {
									transform: 'scale(1.05)',
								}, */
							}}>
							<Link to={`/stats/players/${p?.id}`}>
								<PlayerCard
									// graphicOn={graphicOn}
									// setGraphicOn={setGraphicOn}
									// showPerGame={true}
									// p={p}
									// stat={stat}
									width={220}
									player={p?.player}
								/>
							</Link>
							<Box
								display={'flex'}
								alignItems={'baseline'}
								gap={'4px'}
								zIndex={'3'}>
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
					)
				})}
			</Box>
		</>
	)
}

export default HomePlayersLeaders
