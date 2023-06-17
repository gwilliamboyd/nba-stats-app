/* eslint-disable react/prop-types */
import { Typography, Box } from '@mui/material'
import fullTeamNames from '../hooks/fullTeamNames'
const HomeTeamCard = ({ team }) => {
	return (
		<Box
			sx={{
				margin: '0',
				padding: '0',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				gap: '12px',
			}}>
			<img
				src={`../../public/images/svgs/team-logos/${team}.svg`}
				alt={`${team} logo`}
				width={120}
			/>
			<Typography
				variant='overline'
				fontWeight={500}>
				{fullTeamNames(team)}
			</Typography>
		</Box>
	)
}

export default HomeTeamCard
