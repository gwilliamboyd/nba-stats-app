/* eslint-disable react/prop-types */
import { useTheme } from '@emotion/react'
import { Typography, Box } from '@mui/material'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const PlayerCard = ({ player, width }) => {
	const theme = useTheme()
	const { league } = theme.palette
	// state
	const [graphicOn, setGraphicOn] = useState(false)

	useEffect(() => {
		console.log(`Graphic On: ${graphicOn}`)
	}, [graphicOn])
	// dynamically get player image
	const playerImgSrc = `"/images/players/${player}.png"`

	return (
		<>
			{graphicOn && (
				<Box
					// transition={{ ease: 'easeOut', duration: 0.61 }}
					sx={{
						position: 'absolute',
						zIndex: '3',
						top: '0',
						left: '0',
						display: graphicOn ? 'flex' : 'flex',
						width: '252px',
						height: '365px',
						overflow: 'hidden',
						// backgroundImage: 'url(/images/player-home-graphic.png)',
					}}>
					<motion.img
						initial={{ opacity: 0, x: -220 }}
						animate={{ opacity: 1, x: 0 }}
						width={220}
						height={332}
						src='/images/player-home-graphic-2.png'
						style={{
							position: 'absolute',
							zIndex: '3',
							top: '0',
							left: '0',
							display: graphicOn ? 'flex' : 'flex',
							width: '252px',
							height: '365px',
							transform: 'translateX(-50px)',
						}}
					/>

					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						style={{
							position: 'absolute',
							zIndex: '2',
							top: '0',
							left: '0',
							width: '252px',
							height: '365px',
							backgroundColor: league.nbaBlue,
							display: graphicOn ? 'block' : 'none',
						}}
					/>
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
			</Box>
		</>
	)
}

export default PlayerCard
