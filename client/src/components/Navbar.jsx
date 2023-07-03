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
} from '@mui/material'
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
	// refs
	const anchorRef = useRef(null)

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

	const handleOpen = () => {
		setOpen(true)
	}
	const handleClose = () => {
		setOpen(false)
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
		<Container
			sx={{
				display: 'flex',
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
								<Typography onClick={handleToggle}>{userInfo.name}</Typography>
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
	)
}

export default Navbar
