import { useState } from 'react'
import { Container, Box, Typography, MenuItem, Menu } from '@mui/material'
import { Link } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../slices/authentication/authSlice'
import { useLogoutMutation } from '../slices/authentication/usersApiSlice'
// Images
import nbaLogoSrc from '../../public/images/svgs/logo-nba.svg'
import UserAvatar from './UserAvatar'

const Navbar = () => {
	const theme = useTheme()
	const { league } = theme.palette

	const { userInfo } = useSelector(state => state.auth)

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const [menuOpen, setMenuOpen] = useState(false)

	const handleOpen = () => {
		setMenuOpen(true)
	}
	const handleClose = () => {
		setMenuOpen(false)
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
						gap: '12px',
					}}>
					<Link to='/'>
						<img
							src={nbaLogoSrc}
							width={120}
							alt='NBA Logo'
						/>
					</Link>
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
				<Box
					onMouseOver={handleOpen}
					onMouseLeave={handleClose}
					sx={{
						height: '100%',
						display: 'flex',
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
							<Link to='/profile'>
								<Typography>{userInfo.name}</Typography>
							</Link>
							<Link
								to='/logout'
								onClick={logoutHandler}>
								<Typography>Logout</Typography>
							</Link>
							{/* {menuOpen && (
								<Menu
									id='basic-menu'
									anchorEl={true}
									open={menuOpen}
									onClose={handleClose}
									MenuListProps={{
										'aria-labelledby': 'basic-button',
									}}
									sx={{ position: 'absolute' }}>
									<MenuItem>Profile</MenuItem>
									<MenuItem>My account</MenuItem>
									<MenuItem>Logout</MenuItem>
								</Menu>
							)} */}
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
