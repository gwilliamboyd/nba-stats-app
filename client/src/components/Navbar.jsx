import { useRef, useState } from 'react'
import {
	Container,
	Box,
	Typography,
	MenuItem,
	Grow,
	Paper,
	MenuList,
	ClickAwayListener,
	Popper,
	IconButton,
} from '@mui/material'
import { desktopLinksStyles } from '../hooks/desktopLinksStyles'
import MenuIcon from '@mui/icons-material/Menu'
import { Link } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../slices/authentication/authSlice'
import { useLogoutMutation } from '../slices/authentication/usersApiSlice'
// Images
// import nbaLogoSrc from '../../public/images/svgs/logo-nba.svg'
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

	/* const handleOpen = () => {
		setOpen(true)
	}
	const handleMobileOpen = () => {
		setMobileOpen(true)
	} */
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
							transition
							sx={{ zIndex: 20 }}>
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
														<Link to={'/login'}>
															<MenuItem
																divider
																sx={{ p: '1rem', fontSize: '2rem' }}
																onClick={handleMobileClose}>
																Login
															</MenuItem>
														</Link>
														<Link to={'/register'}>
															<MenuItem
																divider
																sx={{ p: '1rem', fontSize: '2rem' }}
																onClick={handleMobileClose}>
																Register
															</MenuItem>
														</Link>
													</>
												)}
												<Link to={'/standings'}>
													<MenuItem
														divider
														sx={{ p: '1rem', fontSize: '2rem' }}
														onClick={handleMobileClose}>
														Standings
													</MenuItem>
												</Link>
												<Link to={'/stats/teams'}>
													<MenuItem
														divider
														sx={{ p: '1rem', fontSize: '2rem' }}
														onClick={handleMobileClose}>
														Teams
													</MenuItem>
												</Link>
												<Link to={'/stats/players'}>
													<MenuItem
														sx={{ p: '1rem', fontSize: '2rem' }}
														onClick={handleMobileClose}>
														Players
													</MenuItem>
												</Link>
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
							transition
							sx={{ zIndex: 20 }}>
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
												onKeyDown={handleListKeyDown}
												sx={{ zIndex: 20 }}>
												<Link to={'/profile'}>
													<MenuItem
														onClick={handleCloseSubMenu}
														sx={{ p: '1rem', fontSize: '2rem' }}>
														Profile
													</MenuItem>
												</Link>
												<Link to={'/stats/teams/favorite-teams'}>
													<MenuItem
														onClick={handleCloseSubMenu}
														sx={{ p: '1rem', fontSize: '2rem' }}>
														Favorite Teams
													</MenuItem>
												</Link>
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
					</Box>
				</Box>
			</Container>
			<Container
				sx={{
					display: { xs: 'none', md: 'flex' },
					justifyContent: 'center',
					// background: `linear-gradient(to top, ${league.nbaBlue} 60%,  ${league.nbaBackground})`,
					backgroundColor: league.nbaBlue,
					color: league.nbaWhite,
					height: '100px',
				}}
				maxWidth='100%'>
				<Box
					sx={{
						width: '85%',
						// backgroundColor: league.nbaBlue,
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
								<Typography
									variant='h6'
									sx={desktopLinksStyles}>
									Standings
								</Typography>
							</Link>
							<Link to='/stats/teams'>
								<Typography
									variant='h6'
									sx={desktopLinksStyles}>
									Teams
								</Typography>
							</Link>
							<Link to='/stats/players'>
								<Typography
									variant='h6'
									sx={desktopLinksStyles}>
									Players
								</Typography>
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
									sx={{ display: { xs: 'none', md: 'flex' }, zIndex: 20 }}
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
														<Link to={'/profile'}>
															<MenuItem onClick={handleClose}>Profile</MenuItem>
														</Link>
														<Link to={'/stats/teams/favorite-teams'}>
															<MenuItem onClick={handleClose}>
																Favorite Teams
															</MenuItem>
														</Link>
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
									<Typography sx={desktopLinksStyles}>Login</Typography>
								</Link>
								<Link to='/register'>
									<Typography sx={desktopLinksStyles}>Register</Typography>
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
