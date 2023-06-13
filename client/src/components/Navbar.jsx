import { Container, Box, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
// import { ReactComponent as NbaLogo } from '../../public/images/logo-nba.svg'
import { useTheme } from '@mui/material/styles'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../slices/authentication/authSlice'
import { useLogoutMutation } from '../slices/authentication/usersApiSlice'
// Images
import NBALogo from '../../public/images/svgs/NBALogo'
import nbaLogoSrc from '../../public/images/svgs/logo-nba.svg'

const Navbar = () => {
	const theme = useTheme()
	const { league } = theme.palette

	const { userInfo } = useSelector(state => state.auth)

	const dispatch = useDispatch()
	const navigate = useNavigate()

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
				backgroundColor: league.nbaBlue,
				color: league.nbaWhite,
				height: '100px',
			}}
			maxWidth='100%'>
			<Box
				sx={{
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
					{/* <NBALogo
						width={80}
						height='auto'
					/> */}
					<Link to='/'>
						<img
							src={nbaLogoSrc}
							width={120}
							alt='NBA Logo'
						/>
					</Link>

					<Link to='/stats/teams'>
						<Typography variant='h6'>Teams</Typography>
					</Link>

					<Typography variant='h6'>Players</Typography>
				</Box>
				<Box
					sx={{
						height: '100%',
						display: 'flex',
						gap: '8px',
					}}>
					<Link to='/login'>
						<Typography>Login</Typography>
					</Link>

					<Link to='/register'>
						<Typography>Register</Typography>
					</Link>
					<Link
						to='/logout'
						onClick={logoutHandler}>
						<Typography>Logout</Typography>
					</Link>
				</Box>
			</Box>
		</Container>
	)
}

export default Navbar
