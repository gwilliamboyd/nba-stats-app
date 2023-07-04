/* eslint-disable react/prop-types */
import { useTheme } from '@emotion/react'
import { Typography, Box } from '@mui/material'

const PlayerCard = ({ player, width }) => {
	// console.log(player)
	const theme = useTheme()
	const { league } = theme.palette

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
				color={league.nbaWhite}>
				{player}
			</Typography>
		</Box>
	)
}

export default PlayerCard
