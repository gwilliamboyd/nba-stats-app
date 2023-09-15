/* eslint-disable react/prop-types */
import { Box, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { desktopLinksStyles } from '../../hooks/desktopLinksStyles'

const HomePageBox = ({
	league,
	homeHeading,
	linkText,
	// backgroundImage,
	children,
}) => {
	return (
		<Box
			width='100%'
			height='100%'
			color={league.nbaWhite}
			sx={{
				zIndex: '2',
				padding: '2rem 0 4rem',
				backgroundColor: league.nbaBackground,
				// backgroundImage: { xs: 'none', md: backgroundImage },
				backgroundPosition: 'center',
				backgroundSize: 'cover',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				overflowY: 'hidden',
			}}>
			<Box
				width='80%'
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					gap: { xs: '1.5rem', md: '3.5rem' },
				}}>
				<Box
					alignItems='baseline'
					sx={{
						display: 'flex',
						flexDirection: { xs: 'column', md: 'row' },
						gap: { xs: '1.5rem', md: '3rem' },
						alignSelf: 'flex-start',
					}}>
					<Typography
						fontWeight={900}
						variant={'h3'}>
						{homeHeading}
					</Typography>
					<Link to='/stats/players'>
						<Typography
							variant='h6'
							fontWeight={400}
							sx={desktopLinksStyles}>
							{linkText}
						</Typography>
					</Link>
				</Box>
				{children}
			</Box>
		</Box>
	)
}

export default HomePageBox
