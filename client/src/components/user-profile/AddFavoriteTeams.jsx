/* eslint-disable react/prop-types */
import { Box, Button, Grid, Typography } from '@mui/material'
import teams from '../../data/teams-perGame.json'
import { Link } from 'react-router-dom'
import HomeTeamCard from '../HomeTeamCard'

const AddFavoriteTeams = ({ modalOpen, setModalOpen }) => {
	const sortedTeams = teams.sort((a, b) => a.team.localeCompare(b.team))

	return (
		<Box
			width='70%'
			height='70%'
			sx={{ position: 'absolute' }}>
			<Typography>Modal</Typography>
			<Button onClick={setModalOpen(false)}>Close</Button>
			<Grid
				container
				columns={10}
				columnSpacing={6}
				rowSpacing={4}>
				{sortedTeams.map(team => {
					return (
						<Grid
							key={team.id}
							item
							xs={1}>
							<Link to={`http://localhost:3000/stats/teams/${team.team}`}>
								<HomeTeamCard
									width={60}
									team={team.team}
								/>
							</Link>
						</Grid>
					)
				})}
			</Grid>
		</Box>
	)
}

export default AddFavoriteTeams
