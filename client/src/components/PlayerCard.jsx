/* eslint-disable react/prop-types */
import { useTheme } from '@emotion/react'
import { Typography, Box } from '@mui/material'
import { useState } from 'react'
import { motion } from 'framer-motion'

// p not used is not an error - used in an eval()
const PlayerCard = ({ width, player }) => {
	// console.log(showPerGame)
	const theme = useTheme()
	const { league } = theme.palette
	// state
	const [graphicOn, setGraphicOn] = useState(false)
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
				}}>
				<Box
					sx={{
						zIndex: '4',
						width: width,
						height: width,
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
				{/* {showPerGame && (
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
				)} */}
			</Box>
		</>
	)
}

export default PlayerCard
