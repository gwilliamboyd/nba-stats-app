import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	Box,
	Container,
	Typography,
	Modal,
	Button,
	Grid,
	TextField,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import UserAvatar from '../components/UserAvatar'
import HomeTeamCard from '../components/user-profile/HomeTeamCard'
import { Link } from 'react-router-dom'
import teams from '../data/teams-perGame.json'
import { useUpdateUserMutation } from '../slices/authentication/usersApiSlice'
import { setCredentials } from '../slices/authentication/authSlice'
import fullTeamNames from '../hooks/fullTeamNames'

const UserProfilePage = () => {
	// theme
	const theme = useTheme()
	const { league } = theme.palette

	const dispatch = useDispatch()

	// sort teams alphabetically
	const sortedTeams = teams.sort((a, b) => a.team.localeCompare(b.team))
	console.log(sortedTeams)
	const sortByPoints = t => {
		const ptsSorted = t.sort((a, b) => b.pts - a.pts)
		console.log(ptsSorted)
		return ptsSorted
	}
	const sortByTotalRebounds = t => {
		const trbSorted = t.sort((a, b) => b.trb - a.trb)
		console.log(trbSorted)
		return trbSorted
	}
	const sortByFieldGoalPer = t => {
		const astSorted = t.sort((a, b) => b.fgPer - a.fgPer)
		console.log(astSorted)
		return astSorted
	}
	const sortBy3PtPer = t => {
		const $3pSorted = t.sort((a, b) => b.$3pPer - a.$3pPer)
		console.log($3pSorted)
		return $3pSorted
	}

	const findRanking = (team, sortingFunction) => {
		// get proper suffix when printing final result
		const getNumericalSuffix = a => {
			let b = a % 10
			let c = a % 100

			if (b == 1 && c != 11) {
				return a + 'st'
			}
			if (b == 2 && c != 12) {
				return a + 'nd'
			}
			if (b == 3 && c != 13) {
				return a + 'rd'
			}
			return a + 'th'
		}
		// finds passed-in team name in sorting function of choice
		const rankingMatch = sortingFunction => sortingFunction.team === team
		// get ranking (index)
		const ranking = sortingFunction.findIndex(rankingMatch)
		console.log(ranking)
		// add 1 to index to get true ranking
		let finalRanking = ranking + 1
		// test log
		console.log(
			`The ${fullTeamNames(team)} are ${getNumericalSuffix(
				finalRanking
			)} in the NBA in this stat.`
		)
		return finalRanking
	}
	useEffect(() => {
		findRanking('mem', sortByTotalRebounds(sortedTeams))
	}, [sortedTeams])

	// redux state
	const { userInfo } = useSelector(state => state.auth)
	// component state
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [avatar, setAvatar] = useState('')
	const [favTeams, setFavTeams] = useState([])
	const [activeFavTeams, setActiveFavTeams] = useState(false)

	// open and close modal
	const [modalOpen, setModalOpen] = useState(false)
	const handleOpen = () => setModalOpen(true)
	const handleClose = () => setModalOpen(false)

	// update user info
	const [updateUser, { isLoading }] = useUpdateUserMutation()

	// favorite teams
	const favoriteTeams = userInfo.favoriteTeams

	const addFavoriteTeam = e => {
		setFavTeams([...favTeams, e.team])
		setActiveFavTeams(true)
	}
	const removeFavoriteTeam = e => {
		setFavTeams(favTeams.filter(tm => tm !== e.team))
	}

	const handleTeamSelectOutline = e => {
		userInfo.favoriteTeams.includes(e)
	}

	useEffect(() => {
		setName(userInfo.name)
		setEmail(userInfo.email)
		setAvatar(userInfo.avatar)
		setFavTeams(userInfo.favoriteTeams)
	}, [userInfo.name, userInfo.email, userInfo.avatar, userInfo.favoriteTeams])

	const saveProfileUpdate = async () => {
		try {
			const res = await updateUser({
				_id: userInfo._id,
				name: name,
				email: email,
				password: password,
				avatar: avatar || userInfo.avatar,
				favoriteTeams: favTeams,
			}).unwrap()
			dispatch(setCredentials({ ...res }))
		} catch (err) {
			console.log(err?.data?.message || err.error)
		}
	}

	let isOutlined = false

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
				<Box sx={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
					<Typography>Name</Typography>
					<TextField
						id='outlined'
						type='name'
						onChange={e => setName(e.target.value)}
						placeholder='Name'
						sx={{ input: { color: '#FFF' }, label: { color: '#FFF' } }}
						value={name}
					/>
					<Button onClick={saveProfileUpdate}>Change Name</Button>
				</Box>
				<Button
					sx={{ color: '#FFF', borderColor: '#FFF' }}
					onClick={() => {
						handleOpen()
					}}
					variant='outlined'>
					Edit <span style={{ fontWeight: 700 }}>Favorite Teams</span>
				</Button>
				<Typography>Favorite Teams:</Typography>
				<Box sx={{ display: 'flex', gap: '12px' }}>
					{favoriteTeams.map(tm => {
						return (
							<Link
								to={`http://localhost:3000/stats/teams/${tm}`}
								key={tm}>
								<HomeTeamCard
									width={60}
									team={tm}
								/>
							</Link>
						)
					})}
				</Box>
				<Link to={'http://localhost:3000/stats/teams/favorite-teams'}>
					<Typography>Favorite Teams Stats</Typography>
				</Link>
				<Modal
					open={modalOpen}
					onClose={() => {
						handleClose()
						saveProfileUpdate()
					}}
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
							backgroundColor: 'rgba(13, 22, 44, 0.95)',
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
								if (favTeams.includes(team.team)) {
									isOutlined = true
								} else isOutlined = false
								return (
									<Grid
										key={team.id}
										item
										xs={1}
										sx={{
											padding: '1rem 0.75rem',
											borderRadius: '4px',
											outline: isOutlined
												? `2px solid ${league.nbaRed}`
												: 'none',

											outlineOffset: '-2px',
											'&:hover': {
												outline: '2px solid white',
												boxShadow: '0px 0px 20px black',
												cursor: 'pointer',
											},
										}}>
										<Box
											onClick={() => {
												if (favTeams.includes(team.team)) {
													removeFavoriteTeam(team)
												} else {
													addFavoriteTeam(team)
												}
												handleTeamSelectOutline(team)
											}}>
											<HomeTeamCard
												width={60}
												team={team.team}
											/>
										</Box>
									</Grid>
								)
							})}
						</Grid>
						<Button
							onClick={() => {
								saveProfileUpdate()
								handleClose()
							}}
							sx={{ margin: '-3rem 0 0' }}>
							Save Favorite Teams
						</Button>
					</Box>
				</Modal>
			</Box>
		</Container>
	)
}

export default UserProfilePage
