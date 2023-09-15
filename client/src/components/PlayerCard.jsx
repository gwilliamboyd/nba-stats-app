/* eslint-disable react/prop-types */
import { useTheme } from '@emotion/react'
import { Typography, Box } from '@mui/material'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

// p not used is not an error - used in an eval()
const PlayerCard = ({ p, stat, player }) => {
	const theme = useTheme()
	const { league } = theme.palette
	// state
	const [graphicOn, setGraphicOn] = useState(false)

	const statValue = `p?.${stat}`
	console.log(stat)

	useEffect(() => {
		console.log(`Graphic On: ${graphicOn}`)
	}, [graphicOn])
	// dynamically get player image
	const playerImgSrc = `"/images/players/${player}.png"`

	return (
		<>
			{graphicOn && (
				<Box
					sx={{
						position: 'absolute',
						zIndex: '3',
						top: '0',
						left: '0',
						display: graphicOn ? 'flex' : 'flex',
						width: '252px',
						height: '360px',
						overflow: 'hidden',
					}}>
					<motion.img
						initial={{ opacity: 0, x: -252 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ ease: 'easeOut', duration: 0.3 }}
						width={220}
						height={332}
						src='/images/player-home-graphic-red.png'
						style={{
							position: 'absolute',
							zIndex: '3',
							top: '0',
							left: '0',
							display: graphicOn ? 'flex' : 'flex',
							width: '252px',
							height: '360px',
							// transform: 'translateX(-50px)',
						}}
					/>
					<motion.img
						initial={{ opacity: 0, x: 252 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ ease: 'easeOut', duration: 0.3 }}
						width={220}
						height={332}
						src='/images/player-home-graphic-gray.png'
						style={{
							position: 'absolute',
							zIndex: '3',
							top: '0',
							left: '0',
							display: graphicOn ? 'flex' : 'flex',
							width: '252px',
							height: '360px',
							// transform: 'translateX(-50px)',
						}}
					/>

					{/* <motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						style={{
							position: 'absolute',
							zIndex: '2',
							top: '0',
							left: '0',
							width: '252px',
							height: '360px',
							backgroundColor: league.nbaBlue,
							display: graphicOn ? 'block' : 'none',
						}}
					/> */}
				</Box>
			)}
			<Box
				onMouseEnter={() => setGraphicOn(true)}
				onMouseLeave={() => setGraphicOn(false)}
				sx={{
					margin: '0',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					gap: '8px',
					textAlign: 'center',
					// '&:hover': () => setGraphicOn(true),
				}}>
				<Box
					// initial={{ scale: 1 }}
					// animate={{ scale: 1.03 }}
					// transition={{ ease: 'easeOut', duration: 0.3 }}
					sx={{
						zIndex: '4',
						width: '220px',
						height: '220px',
						// width: graphicOn ? '230px' : '220px',
						// height: graphicOn ? '230px' : '220px',
						border: `2px solid ${league.nbaWhite}`,
						borderRadius: '100%',
						backgroundImage: `url(${playerImgSrc})`,
						backgroundPosition: 'center',
						backgroundSize: 'cover',
					}}></Box>
				<Typography
					variant='h6'
					fontWeight={700}
					lineHeight={1.25}
					color={league.nbaWhite}
					zIndex={'3'}>
					{player}
				</Typography>
				{/* <motion.h6
					style={{
						fontSize: '1rem',
						fontWeight: '700',
						lineHeight: '1.25',
						color: league.nbaWhite,
						zIndex: '3',
					}}></motion.h6> */}
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
		</>
	)
}

export default PlayerCard
