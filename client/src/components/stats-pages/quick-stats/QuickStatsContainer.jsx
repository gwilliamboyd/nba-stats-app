/* eslint-disable react/prop-types */
import { Grid } from '@mui/material'
import QuickStat from './QuickStat'

const QuickStatsContainer = ({
	statsPts,
	statsTrb,
	statsAst,
	statsFg,
	statsFgPer,
	stats3pPer,
	secondaryColor,
	tertiaryColor,
}) => {
	return (
		<Grid
			container
			columns={6}
			columnSpacing={4}
			rowSpacing={2}
			sx={{ width: '28%', marginTop: '1rem' }}>
			<QuickStat
				heading='PTS'
				featuredStat={statsPts}
				secondaryColor={secondaryColor}
				tertiaryColor={tertiaryColor}
			/>
			<QuickStat
				heading='TRB'
				featuredStat={statsTrb}
				secondaryColor={secondaryColor}
				tertiaryColor={tertiaryColor}
			/>
			<QuickStat
				heading='AST'
				featuredStat={statsAst}
				secondaryColor={secondaryColor}
				tertiaryColor={tertiaryColor}
			/>
			<QuickStat
				heading='FG'
				featuredStat={statsFg}
				secondaryColor={secondaryColor}
				tertiaryColor={tertiaryColor}
			/>
			<QuickStat
				heading='FG%'
				featuredStat={statsFgPer}
				secondaryColor={secondaryColor}
				tertiaryColor={tertiaryColor}
			/>
			<QuickStat
				heading='3P%'
				featuredStat={stats3pPer}
				secondaryColor={secondaryColor}
				tertiaryColor={tertiaryColor}
			/>
		</Grid>
	)
}

export default QuickStatsContainer
