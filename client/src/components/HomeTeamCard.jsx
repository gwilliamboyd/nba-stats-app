/* eslint-disable react/prop-types */
import { useTheme } from '@emotion/react'
import { Typography, Box } from '@mui/material'
import fullTeamNames from '../hooks/fullTeamNames'
const HomeTeamCard = ({ team, width }) => {
	const theme = useTheme()
	const { league } = theme.palette
	return (
		<Box
			sx={{
				margin: '0',
				padding: '1rem 0.75rem',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				gap: '4px',
				textAlign: 'center',
				borderRadius: '4px',
				outline: '0',
				outlineOffset: '-2px',
				'&:hover': {
					// backgroundColor: 'rgba(34, 34, 34, 0.3)',
					outline: '2px solid white',
					boxShadow: '0px 0px 20px black',
				},
			}}>
			<img
				src={`../../public/images/svgs/team-logos/${team}.svg`}
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
