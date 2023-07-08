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
import UserAvatar from '../../components/UserAvatar'
import HomeTeamCard from '../../components/user-profile/HomeTeamCard'
import { Link } from 'react-router-dom'
import teams from '../../data/teams-perGame.json'
import { useUpdateUserMutation } from '../../slices/authentication/usersApiSlice'
import { setCredentials } from '../../slices/authentication/authSlice'
import fullTeamNames from '../../hooks/fullTeamNames'
import Dropzone from 'react-dropzone'

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

	const buttonStyles = { width: '60%', alignSelf: 'center' }
	const textFieldStyles = {
		input: { color: '#FFF' },
		label: { color: '#FFF' },
		fieldset: { borderColor: 'lightgray' },
	}

	return (
		<Container
			disableGutters
			maxWidth='100%'
			sx={{ height: { xs: '100%', md: 'calc(100vh - 100px)' } }}>
			<Grid
				container
				columns={3}>
				<Grid
					item
					xs={3}
					md={1}
					sx={{
						backgroundColor: '#070C17',
						flexDirection: { xs: 'column', md: 'row' },
					}}>
					<Box
						sx={{
							height: '100%',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'flex-start',
							alignItems: 'center',
							color: league.nbaWhite,
							p: { xs: '2rem 0 0', md: '8rem 0 0' },
						}}>
						<UserAvatar
							avatar={userInfo.avatar}
							dimensions={220}
						/>
						<Typography
							variant={'h3'}
							fontWeight={800}
							marginBottom={'2rem'}
							sx={{ fontSize: { xs: '36px', md: '52px' } }}>
							{userInfo.name}
						</Typography>
					</Box>
				</Grid>
				<Grid
					item
					xs={3}
					md={2}>
					<Box
						sx={{
							height: '100%',
							color: league.nbaWhite,
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
							alignItems: 'center',
							gap: '3rem',
							p: { xs: '2rem 3rem', md: '0 3rem' },
						}}>
						<Box width={'100%'}>
							<Typography
								variant='h4'
								fontWeight={900}
								alignSelf={'flex-start'}
								marginBottom={'1rem'}
								sx={{ flexDirection: { xs: 'column', md: 'row' } }}>
								Account Info
							</Typography>
							<Grid
								container
								columns={3}
								columnSpacing={6}>
								<Grid
									item
									xs={3}
									md={2}>
									<Grid
										container
										columns={4}
										columnSpacing={6}
										rowSpacing={2}>
										<Grid
											item
											xs={4}
											md={2}>
											<Box
												sx={{
													display: 'flex',
													flexDirection: 'column',
													gap: '6px',
												}}>
												<Typography>Name</Typography>
												<TextField
													id='outlined'
													type='name'
													onChange={e => setName(e.target.value)}
													placeholder='Name'
													sx={textFieldStyles}
													value={name}
												/>
												<Button
													sx={buttonStyles}
													onClick={saveProfileUpdate}>
													Save
												</Button>
											</Box>
										</Grid>
										<Grid
											item
											xs={4}
											md={2}>
											<Box
												sx={{
													display: 'flex',
													flexDirection: 'column',
													gap: '6px',
												}}>
												<Typography>Email</Typography>
												<TextField
													id='outlined'
													type='email'
													onChange={e => setEmail(e.target.value)}
													placeholder='Email'
													sx={textFieldStyles}
													value={email}
												/>
												<Button
													sx={buttonStyles}
													onClick={saveProfileUpdate}>
													Save
												</Button>
											</Box>
										</Grid>
										<Grid
											item
											xs={4}
											md={2}>
											<Box
												sx={{
													display: 'flex',
													flexDirection: 'column',
													gap: '6px',
												}}>
												<Typography>Password</Typography>
												<TextField
													id='outlined'
													type='password'
													onChange={e => setPassword(e.target.value)}
													placeholder='Password'
													sx={textFieldStyles}
													value={password}
												/>
												<Button
													sx={buttonStyles}
													onClick={saveProfileUpdate}>
													Save
												</Button>
											</Box>
										</Grid>
										<Grid
											item
											xs={4}
											md={2}>
											<Box
												sx={{
													display: 'flex',
													flexDirection: 'column',
													gap: '6px',
												}}>
												<Typography>Confirm Password</Typography>
												<TextField
													id='outlined'
													type='password'
													onChange={e => setConfirmPassword(e.target.value)}
													placeholder='Confirm Password'
													sx={textFieldStyles}
													value={confirmPassword}
												/>
												<Button
													sx={buttonStyles}
													onClick={saveProfileUpdate}>
													Save
												</Button>
											</Box>
										</Grid>
									</Grid>
								</Grid>
								<Grid
									item
									xs={3}
									md={1}>
									<Box
										sx={{
											height: '100%',
											display: 'flex',
											flexDirection: 'column',
											justifyContent: 'center',
											alignContent: { xs: 'center', md: 'flex-start' },
											gap: '8px',
										}}>
										<Typography justifySelf={'flex-start'}>Avatar</Typography>
										<Dropzone
											onDrop={acceptedFiles => {
												console.log(acceptedFiles[0].name)
												setAvatar(acceptedFiles[0].name)
											}}>
											{({ getRootProps, getInputProps }) => (
												<section
													style={{
														width: '80%',
														height: '100%',
														border: `2px solid ${league.nbaWhite}`,
														padding: '0 1rem',
													}}>
													<div {...getRootProps()}>
														<input {...getInputProps()} />
														<p>Drag image here, or click to select file</p>
													</div>
												</section>
											)}
										</Dropzone>
									</Box>
								</Grid>
							</Grid>
						</Box>
						<Box width={'100%'}>
							<Box
								sx={{
									width: '100%',
									display: 'flex',
									justifyContent: { xs: 'space-between', md: 'flex-start' },
									alignItems: 'baseline',
									gap: '3rem',
								}}>
								<Typography
									variant='h4'
									fontWeight={900}
									marginBottom={'1rem'}
									sx={{ fontSize: { xs: '28px', md: '36px' } }}>
									Favorite Teams
								</Typography>
								<Typography
									fontWeight={700}
									sx={{
										color: league.nbaRed,
										borderColor: '#FFF',
										'&:hover': { cursor: 'pointer', color: league.nbaWhite },
									}}
									onClick={() => {
										handleOpen()
									}}
									variant='outlined'>
									Edit
								</Typography>
							</Box>
							<Grid
								container
								columns={5}
								columnSpacing={2}
								rowSpacing={2}
								justifyContent={'center'}>
								{favoriteTeams.map(tm => {
									return (
										<Grid
											key={tm}
											item
											xs={5}
											md={1}>
											<Link to={`http://localhost:3000/stats/teams/${tm}`}>
												<HomeTeamCard
													width={100}
													team={tm}
												/>
											</Link>
										</Grid>
									)
								})}
							</Grid>
							<Modal
								open={modalOpen}
								onClose={() => {
									handleClose()
									saveProfileUpdate()
								}}
								component='section'>
								<Box
									height='100vh'
									sx={{
										p: { xs: '0.5rem', md: '2rem' },
										width: { xs: '90%', md: '70%' },
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
										overflow: { xs: 'scroll', md: 'hidden' },
									}}>
									<Button
										sx={{
											alignSelf: 'flex-end',
											margin: { xs: '0 0 -3rem', md: '-1rem 0 -2rem' },
										}}
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
													xs={2}
													md={1}
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
					</Box>
				</Grid>
			</Grid>
		</Container>
	)
}

export default UserProfilePage
