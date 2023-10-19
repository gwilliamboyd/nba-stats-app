/* eslint-disable react/prop-types */
import { Box, Grid, Typography } from '@mui/material'

const QuickStat = ({
	heading,
	featuredStat,
	secondaryColor,
	tertiaryColor,
}) => {
	return (
		<Grid
			item
			xs={3}>
			<Box
				sx={{
					// borderBottom: `3px solid ${secondaryColor}`,
					display: 'flex',
					justifyContent: 'space-between',
					letterSpacing: '0px',
				}}>
				<Typography
					variant='overline'
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
