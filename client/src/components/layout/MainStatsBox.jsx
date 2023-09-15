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
				width: {
					xs: '360px',
					sm: '540px',
					md: '750px',
					lg: '1200px',
					xl: '1300px',
				},
				// height: '100%',
				gap: '2rem',
			}}>
			{children}
		</Box>
	)
}

export default MainStatsBox
