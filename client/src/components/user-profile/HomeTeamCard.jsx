/* eslint-disable react/prop-types */
import { useTheme } from '@emotion/react'
import { Typography, Box } from '@mui/material'
import fullTeamNames from '../../hooks/fullTeamNames'
const HomeTeamCard = ({ team, width }) => {
	const theme = useTheme()
	const { league } = theme.palette
	return (
		<Box
			// referenced in css file to enable zoom effect
			className='homeTeamCardImg'
			sx={{
				margin: '0',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				gap: '4px',
				textAlign: 'center',
				transition: 'all 0.3s ease-out',
				'&:hover': {
					transform: 'scale(1.1)',
				},
			}}>
			<img
				src={`/images/svgs/team-logos/${team}.svg`}
				alt={`${team} logo`}
				width={width}
			/>
			<Typography
				variant='overline'
				fontWeight={500}
				lineHeight={1.5}
				color={league.nbaWhite}>
				{fullTeamNames(team)}
			</Typography>
		</Box>
	)
}

export default HomeTeamCard
