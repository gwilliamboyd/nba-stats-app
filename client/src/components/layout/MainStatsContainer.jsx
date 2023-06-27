/* eslint-disable react/prop-types */
import { Container } from '@mui/material'

const MainStatsContainer = ({ children, league }) => {
	return (
		<Container
			disableGutters
			maxWidth='100%'
			style={{
				height: 'calc(100vh - 100px)',
				backgroundColor: league.nbaBackground,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				color: league.nbaWhite,
			}}>
			{children}
		</Container>
	)
}

export default MainStatsContainer
