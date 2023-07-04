import { useRef, useState } from 'react'
import {
	Container,
	Box,
	Typography,
	MenuItem,
	Menu,
	Grow,
	Paper,
	MenuList,
	ClickAwayListener,
	Popper,
	Button,
	IconButton,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { Link } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../slices/authentication/authSlice'
import { useLogoutMutation } from '../slices/authentication/usersApiSlice'
// Images
import nbaLogoSrc from '../../public/images/svgs/logo-nba.svg'
import nbaLogoPng from '../../public/images/svgs/nba-logo.png'
import UserAvatar from './UserAvatar'

const Navbar = () => {
	// theme
	const theme = useTheme()
	const { league } = theme.palette
	// user info
	const { userInfo } = useSelector(state => state.auth)
	// util
	const dispatch = useDispatch()
	const navigate = useNavigate()
	// component state
	// const [menuOpen, setMenuOpen] = useState(false)
	const [open, setOpen] = useState(false)
	const [mobileOpen, setMobileOpen] = useState(false)
	const [subMenuOpen, setSubMenuOpen] = useState(false)
	// refs
	const anchorRef = useRef(null)
	const mobileAnchorRef = useRef(null)
	const subMenuRef = useRef(null)

	function handleListKeyDown(event) {
		if (event.key === 'Tab') {
			event.preventDefault()
			setOpen(false)
		} else if (event.key === 'Escape') {
			setOpen(false)
		}
	}
	const handleToggle = () => {
		setOpen(prevOpen => !prevOpen)
	}
	const handleMobileToggle = () => {
		if (subMenuOpen === false) {
			setMobileOpen(prevOpen => !prevOpen)
		} else {
			setSubMenuOpen(false)
		}
	}
	const handleSubMenu = () => {
		setSubMenuOpen(prevOpen => !prevOpen)
		setMobileOpen(false)
	}

	const handleOpen = () => {
		setOpen(true)
	}
	const handleMobileOpen = () => {
		setMobileOpen(true)
	}
	const handleMobileClose = () => {
		setMobileOpen(false)
	}
	const handleClose = () => {
		setOpen(false)
	}
	const handleCloseSubMenu = () => {
		setSubMenuOpen(false)
	}

	// Logout mutation
	const [logoutApiCall] = useLogoutMutation()

	const logoutHandler = async () => {
		try {
			await logoutApiCall().unwrap()
			dispatch(logout())
			navigate('/')
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<>
			{/* MOBILE MENU */}
			<Container
				sx={{
					display: { xs: 'flex', md: 'none' },
					justifyContent: 'center',
					backgroundColor: league.nbaBlue,
					color: league.nbaWhite,
					height: '100px',
				}}
				maxWidth='100%'>
				<Box
					sx={{
						width: '95%',
						backgroundColor: league.nbaBlue,
						height: '100px',
						display: 'flex',
						justifyContent: 'space-between',
					}}>
					<Box
						sx={{
							height: '100%',
							display: 'flex',
							alignItems: 'center',
							gap: '12px',
						}}>
						<Link to='/'>
							<img
								src={nbaLogoPng}
								width={140}
								alt='NBA Logo'
							/>
						</Link>
					</Box>
					<Box
						ref={mobileAnchorRef}
						sx={{
							height: '100%',
							display: 'flex',
							alignItems: 'center',
							gap: '1rem',
						}}>
						<IconButton
							size='medium'
							edge='start'
							color='inherit'
							onClick={handleMobileToggle}>
							<MenuIcon />
						</IconButton>
						{/* MAIN MENU - MOBILE */}
						<Popper
							open={mobileOpen}
							anchorEl={mobileAnchorRef.current}
							// onMouseLeave={handleToggle}
							role={undefined}
							placement='top'
							transition>
							{({ TransitionProps, placement }) => (
								<Grow
									{...TransitionProps}
									style={{
										transformOrigin:
											placement === 'bottom-start' ? 'left top' : 'left bottom',
									}}>
									<Paper
										sx={{
											// border: `1px solid ${league.nbaWhite}`,
											width: '80vw',
											boxShadow: '0px 2px 8px black',
											backgroundColor: league.nbaBlue,
											color: league.nbaWhite,
										}}>
										<ClickAwayListener onClickAway={handleMobileClose}>
											<MenuList
												autoFocusItem={open}
												id='composition-menu'
												aria-labelledby='composition-button'
												onKeyDown={handleListKeyDown}>
												{userInfo ? (
													<MenuItem divider>
														<Box
															onClick={handleSubMenu}
															ref={subMenuRef}
															sx={{
																position: 'relative',
																display: 'flex',
																alignItems: 'center',
																gap: '12px',
																p: '1rem',
															}}>
															<UserAvatar
																avatar={userInfo?.avatar}
																dimensions={70}
															/>
															<Box
																sx={{
																	p: '4px 8px',
																	borderRadius: '6px',
																	'&:hover': {
																		cursor: 'pointer',
																	},
																}}>
																<Typography sx={{ fontSize: '1.7rem' }}>
																	{userInfo.name}
																</Typography>
															</Box>
														</Box>
													</MenuItem>
												) : (
													<>
														<MenuItem
															divider
															sx={{ p: '1rem', fontSize: '2rem' }}
															onClick={handleMobileClose}>
															<Link to={'/login'}>Login</Link>
														</MenuItem>
														<MenuItem
															divider
															sx={{ p: '1rem', fontSize: '2rem' }}
															onClick={handleMobileClose}>
															<Link to={'/register'}>Register</Link>
														</MenuItem>
													</>
												)}
												<MenuItem
													divider
													sx={{ p: '1rem', fontSize: '2rem' }}
													onClick={handleMobileClose}>
													<Link to={'/standings'}>Standings</Link>
												</MenuItem>
												<MenuItem
													divider
													sx={{ p: '1rem', fontSize: '2rem' }}
													onClick={handleMobileClose}>
													<Link to={'/stats/teams'}>Teams</Link>
												</MenuItem>
												<MenuItem
													sx={{ p: '1rem', fontSize: '2rem' }}
													onClick={handleMobileClose}>
													<Link to={'/stats/players'}>Players</Link>
												</MenuItem>
											</MenuList>
										</ClickAwayListener>
									</Paper>
								</Grow>
							)}
						</Popper>
						{/* SUB MENU */}
						<Popper
							open={subMenuOpen}
							anchorEl={subMenuRef.current}
							// onMouseLeave={handleToggle}
							role={undefined}
							placement='right-start'
							modifiers={[
								{
									name: 'offset',
									options: {
										offset: [0, -300],
									},
								},
							]}
							transition>
							{({ TransitionProps, placement }) => (
								<Grow
									{...TransitionProps}
									style={{
										transformOrigin:
											placement === 'bottom-start' ? 'left top' : 'left bottom',
									}}>
									<Paper
										sx={{
											// border: `1px solid ${league.nbaWhite}`,
											width: '300px',
											boxShadow: '0px 2px 8px black',
											backgroundColor: league.nbaBlue,
											color: league.nbaWhite,
										}}>
										<ClickAwayListener onClickAway={handleCloseSubMenu}>
											<MenuList
												autoFocusItem={open}
												id='composition-menu'
												aria-labelledby='composition-button'
												onKeyDown={handleListKeyDown}>
												<MenuItem
													onClick={handleCloseSubMenu}
													sx={{ p: '1rem', fontSize: '2rem' }}>
													<Link to={'/profile'}>Profile</Link>
												</MenuItem>
												<MenuItem
													onClick={handleCloseSubMenu}
													sx={{ p: '1rem', fontSize: '2rem' }}>
													<Link to={'/stats/teams/favorite-teams'}>
														Favorite Teams
													</Link>
												</MenuItem>
												<MenuItem
													onClick={() => {
														handleClose()
														handleCloseSubMenu()
														logoutHandler()
													}}
													sx={{ p: '1rem', fontSize: '2rem' }}>
													Logout
												</MenuItem>
											</MenuList>
										</ClickAwayListener>
									</Paper>
								</Grow>
							)}
						</Popper>
						{/* {userInfo ? (
							<Box
								sx={{
									position: 'relative',
									display: 'flex',
									alignItems: 'center',
									gap: '20px',
								}}>
								<UserAvatar
									avatar={userInfo.avatar}
									dimensions={50}
								/>
								<Box
									ref={anchorRef}
									sx={{
										p: '4px 8px',
										borderRadius: '6px',
										'&:hover': {
											cursor: 'pointer',
										},
									}}>
									<Typography onClick={handleToggle}>
										{userInfo.name}
									</Typography>
								</Box>
								<Popper
									open={open}
									anchorEl={anchorRef.current}
									// onMouseLeave={handleToggle}
									role={undefined}
									placement='bottom-start'
									transition>
									{({ TransitionProps, placement }) => (
										<Grow
											{...TransitionProps}
											style={{
												transformOrigin:
													placement === 'bottom-start'
														? 'left top'
														: 'left bottom',
											}}>
											<Paper
												sx={{
													// border: `1px solid ${league.nbaWhite}`,
													width: '140px',
													boxShadow: '0px 2px 8px black',
													backgroundColor: league.nbaBlue,
													color: league.nbaWhite,
												}}>
												<ClickAwayListener onClickAway={handleClose}>
													<MenuList
														autoFocusItem={open}
														id='composition-menu'
														aria-labelledby='composition-button'
														onKeyDown={handleListKeyDown}
														sx={{ zIndex: 20 }}>
														<MenuItem onClick={handleClose}>
															<Link to={'/profile'}>Profile</Link>
														</MenuItem>
														<MenuItem onClick={handleClose}>
															<Link to={'/stats/teams/favorite-teams'}>
																Favorite Teams
															</Link>
														</MenuItem>
														<MenuItem
															onClick={() => {
																handleClose()
																logoutHandler()
															}}>
															Logout
														</MenuItem>
													</MenuList>
												</ClickAwayListener>
											</Paper>
										</Grow>
									)}
								</Popper>
							</Box>
						) : (
							<>
								<Link to='/login'>
									<Typography>Login</Typography>
								</Link>
								<Link to='/register'>
									<Typography>Register</Typography>
								</Link>
							</>
						)} */}
					</Box>
				</Box>
			</Container>
			<Container
				sx={{
					display: { xs: 'none', md: 'flex' },
					justifyContent: 'center',
					backgroundColor: league.nbaBlue,
					color: league.nbaWhite,
					height: '100px',
				}}
				maxWidth='100%'>
				<Box
					sx={{
						width: '85%',
						backgroundColor: league.nbaBlue,
						height: '100px',
						display: 'flex',
						justifyContent: 'space-between',
					}}>
					<Box
						sx={{
							height: '100%',
							display: 'flex',
							alignItems: 'center',
							gap: '72px',
						}}>
						<Link to='/'>
							<img
								src={nbaLogoPng}
								width={200}
								alt='NBA Logo'
							/>
						</Link>
						<Box sx={{ display: 'flex', gap: '36px' }}>
							<Link to='/standings'>
								<Typography variant='h6'>Standings</Typography>
							</Link>
							<Link to='/stats/teams'>
								<Typography variant='h6'>Teams</Typography>
							</Link>
							<Link to='/stats/players'>
								<Typography variant='h6'>Players</Typography>
							</Link>
						</Box>
					</Box>
					<Box
						sx={{
							height: '100%',
							display: 'flex',
							alignItems: 'center',
							gap: '1rem',
						}}>
						{userInfo ? (
							<Box
								sx={{
									position: 'relative',
									display: 'flex',
									alignItems: 'center',
									gap: '20px',
								}}>
								<UserAvatar
									avatar={userInfo.avatar}
									dimensions={50}
								/>
								<Box
									ref={anchorRef}
									sx={{
										p: '4px 8px',
										borderRadius: '6px',
										'&:hover': {
											cursor: 'pointer',
										},
									}}>
									<Typography onClick={handleToggle}>
										{userInfo.name}
									</Typography>
								</Box>
								<Popper
									sx={{ display: { xs: 'none', md: 'flex' } }}
									open={open}
									anchorEl={anchorRef.current}
									// onMouseLeave={handleToggle}
									role={undefined}
									placement='bottom-start'
									transition>
									{({ TransitionProps, placement }) => (
										<Grow
											{...TransitionProps}
											style={{
												transformOrigin:
													placement === 'bottom-start'
														? 'left top'
														: 'left bottom',
											}}>
											<Paper
												sx={{
													// border: `1px solid ${league.nbaWhite}`,
													width: '140px',
													boxShadow: '0px 2px 8px black',
													backgroundColor: league.nbaBlue,
													color: league.nbaWhite,
												}}>
												<ClickAwayListener onClickAway={handleClose}>
													<MenuList
														autoFocusItem={open}
														id='composition-menu'
														aria-labelledby='composition-button'
														onKeyDown={handleListKeyDown}
														sx={{ zIndex: 20 }}>
														<MenuItem onClick={handleClose}>
															<Link to={'/profile'}>Profile</Link>
														</MenuItem>
														<MenuItem onClick={handleClose}>
															<Link to={'/stats/teams/favorite-teams'}>
																Favorite Teams
															</Link>
														</MenuItem>
														<MenuItem
															onClick={() => {
																handleClose()
																logoutHandler()
															}}>
															Logout
														</MenuItem>
													</MenuList>
												</ClickAwayListener>
											</Paper>
										</Grow>
									)}
								</Popper>
								{/* <Link
								to='/logout'
								onClick={logoutHandler}>
								<Typography>Logout</Typography>
							</Link> */}
							</Box>
						) : (
							<>
								<Link to='/login'>
									<Typography>Login</Typography>
								</Link>
								<Link to='/register'>
									<Typography>Register</Typography>
								</Link>
							</>
						)}
					</Box>
				</Box>
			</Container>
		</>
	)
}

export default Navbar
