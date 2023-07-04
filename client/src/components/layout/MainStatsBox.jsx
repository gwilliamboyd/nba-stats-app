/* eslint-disable react/prop-types */
import { Box } from '@mui/material'

const MainStatsBox = ({ children }) => {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: { xs: 'column', lg: 'row' },
				justifyContent: { xs: 'center', lg: 'space-between' },
				alignItems: { xs: 'center', lg: 'baseline' },
				margin: '2rem 0',
				width: '82%',
				// height: '100%',
				gap: '2rem',
			}}>
			{children}
		</Box>
	)
}

export default MainStatsBox
