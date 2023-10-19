/* eslint-disable react/prop-types */
import { Box } from '@mui/material'
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
		<Box
			sx={{
				width: { xs: '90%', sm: '75%', md: '60%', lg: '35%' },
				marginTop: '1rem',
				padding: '1rem',
				backgroundColor: '#11182E',
				borderRadius: '6px',
				border: `1px solid ${secondaryColor}`,
				boxShadow: '0px 10px 10px black',
				display: 'grid',
				gridTemplateColumns: '1fr 1fr',
				gridTemplateRows: 'repeat(3, 1fr)',
				columnGap: '2rem',
				rowGap: '1rem',
			}}>
			<QuickStat
				heading='Pts/Game'
				featuredStat={statsPts}
				secondaryColor={secondaryColor}
				tertiaryColor={'#FFFFFF'}
			/>
			<QuickStat
				heading='Rebounds/Game'
				featuredStat={statsTrb}
				secondaryColor={secondaryColor}
				tertiaryColor={'#FFFFFF'}
			/>
			<QuickStat
				heading='Assists/Game'
				featuredStat={statsAst}
				secondaryColor={secondaryColor}
				tertiaryColor={'#FFFFFF'}
			/>
			<QuickStat
				heading='Field Goals/Game'
				featuredStat={statsFg}
				secondaryColor={secondaryColor}
				tertiaryColor={'#FFFFFF'}
			/>
			<QuickStat
				heading='Field Goal %'
				featuredStat={statsFgPer}
				secondaryColor={secondaryColor}
				tertiaryColor={'#FFFFFF'}
			/>
			<QuickStat
				heading='3 Pt %'
				featuredStat={stats3pPer}
				secondaryColor={secondaryColor}
				tertiaryColor={'#FFFFFF'}
			/>
		</Box>
	)
}

export default QuickStatsContainer
