import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Container, Typography, Modal, Button, Grid } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import UserAvatar from '../components/UserAvatar'
import AddFavoriteTeams from '../components/user-profile/AddFavoriteTeams'
import HomeTeamCard from '../components/HomeTeamCard'
import { Link } from 'react-router-dom'
import teams from '../data/teams-perGame.json'

const UserProfilePage = () => {
	const theme = useTheme()
	const { league } = theme.palette

	const sortedTeams = teams.sort((a, b) => a.team.localeCompare(b.team))

	const { userInfo } = useSelector(state => state.auth)
	const [modalOpen, setModalOpen] = useState(false)

	const handleOpen = () => setModalOpen(true)
	const handleClose = () => setModalOpen(false)

	return (
		<Container
			disableGutters
			maxWidth='100%'>
			<Box
				sx={{
					height: 'calc(100vh - 100px)',
					color: league.nbaWhite,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					gap: '3rem',
				}}>
				<Typography variant='h3'>{userInfo.name}</Typography>
				<UserAvatar
					avatar={userInfo.avatar}
					dimensions={140}
				/>
				<Button
					sx={{ color: '#FFF', borderColor: '#FFF' }}
					onClick={() => {
						console.log('Modal open')
						handleOpen()
					}}
					variant='outlined'>
					Add Favorite Teams
				</Button>
				<Modal
					open={modalOpen}
					onClose={handleClose}
					component='section'>
					<Box
						width='70%'
						height='auto'
						padding='2rem'
						sx={{
							color: `${league.nbaWhite}`,
							position: 'absolute',
							top: '50%',
							left: '50%',
							transform: 'translate(-50%, -50%)',
							backgroundColor: 'rgba(13, 22, 44, 0.85)',
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							gap: '4rem',
							border: `3px solid ${league.nbaWhite}`,
							borderRadius: '12px',
						}}>
						<Button
							sx={{ alignSelf: 'flex-end', margin: '-1rem 0 -2rem' }}
							onClick={handleClose}>
							Close
						</Button>
						<Box
							sx={{
								width: '80%',
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								gap: '20px',
							}}>
							<Typography
								variant='h4'
								fontWeight={900}>
								Add Teams
							</Typography>
							<Typography>
								Click a team to add it to your{' '}
								<span style={{ fontWeight: 700 }}>Favorite Teams</span>
							</Typography>
						</Box>
						<Grid
							container
							columns={6}
							columnSpacing={0}
							rowSpacing={0}>
							{sortedTeams.map(team => {
								return (
									<Grid
										key={team.id}
										item
										xs={1}
										sx={{
											padding: '1rem 0.75rem',
											borderRadius: '4px',
											outline: '0',
											outlineOffset: '-2px',
											'&:hover': {
												// backgroundColor: 'rgba(34, 34, 34, 0.3)',
												outline: '2px solid white',
												boxShadow: '0px 0px 20px black',
											},
										}}>
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
				</Modal>
			</Box>
		</Container>
	)
}

export default UserProfilePage
