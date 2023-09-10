/* eslint-disable no-unused-vars */
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
import { Link, useNavigate } from 'react-router-dom'
import teams from '../../data/teams-perGame.json'
import { useUpdateUserMutation } from '../../slices/authentication/usersApiSlice'
import {
	setCredentials,
	setSnackbar,
} from '../../slices/authentication/authSlice'
import Dropzone from 'react-dropzone'
import SuccessSnackbar from '../../components/snackbars/SuccessSnackbar'

const UserProfilePage = () => {
	// theme
	const theme = useTheme()
	const { league } = theme.palette

	const dispatch = useDispatch()

	// sort teams alphabetically
	const sortedTeams = teams.sort((a, b) => a.team.localeCompare(b.team))

	// redux state
	const { userInfo } = useSelector(state => state.auth)
	const { snackbarIsOpen } = useSelector(state => state.auth)

	const navigate = useNavigate()

	// component state
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [avatar, setAvatar] = useState('')
	const [favTeams, setFavTeams] = useState([])
	const [activeFavTeams, setActiveFavTeams] = useState(false)
	const [textFieldChanged, setTextFieldChanged] = useState(false)

	// open and close modal
	const [modalOpen, setModalOpen] = useState(false)
	const handleOpen = () => setModalOpen(true)
	const handleClose = () => setModalOpen(false)

	// update user info
	const [updateUser, { isLoading }] = useUpdateUserMutation()

	// favorite teams
	const favoriteTeams = userInfo?.favoriteTeams

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

	// set text fields to updated data when changed
	useEffect(() => {
		setName(userInfo.name)
		setEmail(userInfo.email)
		setAvatar(userInfo.avatar)
		setFavTeams(userInfo.favoriteTeams)
		setTextFieldChanged(false)
	}, [userInfo.name, userInfo.email, userInfo.avatar, userInfo.favoriteTeams])

	// reset password on page
	useEffect(() => {
		setPassword('')
		setConfirmPassword('')
	}, [])

	// submit profile update
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
			dispatch(setSnackbar({ profileUpdateSnackbar: true }))
			navigate('/profile')
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

	useEffect(() => {
		console.log(textFieldChanged)
	}, [textFieldChanged])

	return (
		<Container
			disableGutters
			maxWidth='100%'
			sx={{ height: { xs: '100%', md: 'calc(100vh - 100px)' } }}>
			<Grid
				container
				columns={3}
				sx={{ height: { xs: '100%', md: 'calc(100vh - 100px)' } }}>
				<SuccessSnackbar
					open={snackbarIsOpen.profileUpdateSnackbar}
					message={'Profile updated!'}
				/>
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
						{textFieldChanged && (
							<Button
								sx={buttonStyles}
								onClick={saveProfileUpdate}>
								Save Profile Info
							</Button>
						)}
					</Box>
				</Grid>
				<Grid
					item
					xs={3}
					md={2}>
					<Box
						sx={{
							minHeight: '100%',
							height: 'fit-content',
							color: league.nbaWhite,
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
							alignItems: 'center',
							gap: '3rem',
							p: { xs: '2rem 3rem', md: '0 3rem' },
							overflowY: 'scroll',
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
													onChange={e => {
														setTextFieldChanged(true)
														setName(e.target.value)

														if (e.target.value === userInfo.name) {
															setTextFieldChanged(false)
														}
													}}
													placeholder='Name'
													sx={textFieldStyles}
													value={name}
												/>
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
													onChange={e => {
														setTextFieldChanged(true)
														setEmail(e.target.value)
														if (e.target.value === userInfo.email) {
															setTextFieldChanged(false)
														}
													}}
													placeholder='Email'
													sx={textFieldStyles}
													value={email}
												/>
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
													onChange={e => {
														setTextFieldChanged(true)
														setPassword(e.target.value)
														if (e.target.value === '') {
															setTextFieldChanged(false)
														}
													}}
													placeholder='Password'
													sx={textFieldStyles}
													value={password}
												/>
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
													onChange={e => {
														setTextFieldChanged(true)
														setConfirmPassword(e.target.value)
														if (e.target.value === '') {
															setTextFieldChanged(false)
														}
													}}
													placeholder='Confirm Password'
													sx={textFieldStyles}
													value={confirmPassword}
												/>
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
						<Box sx={{ width: '100%', height: 'fit-content' }}>
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
									maxHeight={'92vh'}
									height='fit-content'
									sx={{
										p: { xs: '0.5rem', md: '2rem' },
										width: { xs: '90%', md: '64%' },
										color: `${league.nbaWhite}`,
										position: 'absolute',
										top: '50%',
										left: '50%',
										transform: 'translate(-50%, -50%)',
										backgroundColor: 'rgba(13, 22, 44, 0.95)',
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'center',
										gap: '2rem',
										border: `3px solid ${league.nbaWhite}`,
										borderRadius: '12px',
										overflow: { xs: 'scroll', lg: 'hidden' },
									}}>
									<div
										style={{
											width: '100%',
											display: 'grid',
											gridTemplateRows: '1fr',
											gridTemplateColumns: '1fr 1fr 1fr',
											justifyItems: 'space-between',
											gap: '20px',
										}}>
										<Box></Box>
										<Typography
											variant='h4'
											fontWeight={900}
											justifySelf={'center'}
											// marginTop={'-2rem'}
										>
											Add Teams
										</Typography>
										<Button
											sx={{
												width: 'fit-content',
												justifySelf: 'flex-end',
												// margin: { xs: '0 0 -3rem', md: '-1rem 0 -2rem' },
											}}
											onClick={handleClose}>
											Close
										</Button>

										{/* <Typography>
											Click a team to add it to your{' '}
											<span style={{ fontWeight: 700 }}>Favorite Teams</span>
										</Typography> */}
									</div>
									<Box
										sx={{
											display: 'flex',
											flexDirection: 'column',
											alignItems: 'center',
											gap: '2rem',
										}}>
										<Grid
											container
											width={'90%'}
											columns={6}
											columnSpacing={0}
											rowSpacing={2}
											marginTop={'0.5rem'}>
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
															padding: '1.5rem 0.5rem',
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
															maxWidth: '120px',
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
											}}>
											Save
										</Button>
									</Box>
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
