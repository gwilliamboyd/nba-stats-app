import { Container, Box, Typography } from '@mui/material'
// import { ReactComponent as NbaLogo } from '../../public/images/logo-nba.svg'
import { useTheme } from '@mui/material/styles'
// Images
import NBALogo from '../../public/images/svgs/NBALogo'

const Navbar = () => {
	const theme = useTheme()
	const { league } = theme.palette

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
						gap: '8px',
					}}>
					<NBALogo
						width={80}
						height={'auto'}
					/>
					<Typography variant='h6'>Teams</Typography>
					<Typography variant='h6'>Players</Typography>
				</Box>
				<Box
					sx={{
						height: '100%',
						display: 'flex',
						gap: '8px',
					}}>
					<NBALogo
						width={80}
						height={'auto'}
					/>
					<Typography>Teams</Typography>
					<Typography>Players</Typography>
				</Box>
			</Box>
		</Container>
	)
}

export default Navbar
