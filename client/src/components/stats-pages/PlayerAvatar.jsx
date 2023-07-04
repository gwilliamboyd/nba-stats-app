/* eslint-disable react/prop-types */
import { Box } from '@mui/material'

const PlayerAvatar = ({ secondaryColor, team, src, width }) => {
	console.log(width)
	console.log(secondaryColor)
	// console.log(player)
	return (
		<Box sx={{ width: { xs: '300px', sm: '400px', md: '220px', lg: '220px' } }}>
			<img
				src={src}
				alt={`${team} logo`}
				style={{
					border: `2px solid ${secondaryColor}`,
					borderRadius: '12px',
					width: '100%',
				}}
			/>
		</Box>
	)
}

export default PlayerAvatar
