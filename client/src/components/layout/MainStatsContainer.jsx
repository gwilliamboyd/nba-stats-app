/* eslint-disable react/prop-types */
import { Container } from '@mui/material'

const MainStatsContainer = ({ children, league }) => {
	return (
		<Container
			disableGutters
			maxWidth='100%'
			sx={{
				height: { xs: '100%', lg: 'calc(100vh - 100px)' },
				backgroundColor: league.nbaBackground,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				// justifyContent: 'flex-end',
				color: league.nbaWhite,
			}}>
			{children}
		</Container>
	)
}

export default MainStatsContainer
