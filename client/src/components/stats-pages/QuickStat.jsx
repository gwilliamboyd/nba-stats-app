/* eslint-disable react/prop-types */
import { Box, Grid, Typography } from '@mui/material'

const QuickStat = ({
	heading,
	featuredStat,
	secondaryColor,
	tertiaryColor,
}) => {
	// const stats = statistics[0]
	console.log(featuredStat)

	return (
		<Grid
			item
			sm={3}>
			<Box
				sx={{
					borderBottom: `3px solid ${secondaryColor}`,
					display: 'flex',
					justifyContent: 'space-between',
				}}>
				<Typography
					variant='h6'
					fontWeight={700}
					color={secondaryColor}>
					{heading}
				</Typography>
				<Typography
					variant='h5'
					fontWeight={700}
					color={tertiaryColor}>
					{featuredStat}
				</Typography>
			</Box>
		</Grid>
	)
}

export default QuickStat
