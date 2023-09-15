/* eslint-disable react/prop-types */
import { useTheme } from '@emotion/react'
import { Typography, Box } from '@mui/material'

// p not used is not an error - used in an eval()
const PlayerCardFavorites = ({ width, player }) => {
	// console.log(showPerGame)
	const theme = useTheme()
	const { league } = theme.palette
	// dynamically get player image
	const playerImgSrc = `"/images/players/${player}.png"`

	return (
		<Box
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
	)
}

export default PlayerCardFavorites
