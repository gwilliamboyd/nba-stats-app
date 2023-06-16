import { useDispatch, useSelector } from 'react-redux'
import { Box, Container, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'

const UserProfilePage = () => {
	const theme = useTheme()
	const { league } = theme.palette

	const { userInfo } = useSelector(state => state.auth)

	return (
		<Container
			disableGutters
			maxWidth='100%'>
			<Box
				sx={{
					color: league.nbaWhite,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					height: 'calc(100vh - 100px)',
				}}>
				<Typography variant='h3'>{userInfo.name}</Typography>
			</Box>
		</Container>
	)
}

export default UserProfilePage
