/* eslint-disable react/prop-types */
import { Box } from '@mui/material'

const MainStatsBox = ({ children }) => {
	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'space-between',
				margin: '2rem 0 1rem',
				width: '82%',
			}}>
			{children}
		</Box>
	)
}

export default MainStatsBox
