/* eslint-disable react/prop-types */
import { Box, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const HomePageBox = ({
	league,
	homeHeading,
	linkText,
	backgroundImage,
	children,
}) => {
	return (
		<Box
			width='100%'
			color={league.nbaWhite}
			sx={{
				padding: '2rem 0 4rem',
				backgroundImage: backgroundImage,
				backgroundPosition: 'center',
				backgroundSize: 'cover',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}>
			<Box
				width='85%'
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					gap: '3.5rem',
				}}>
				<Box
					// alignSelf='flex-start'
					alignItems='baseline'
					sx={{
						display: 'flex',
						gap: '3rem',
						alignSelf: { xs: 'center', md: 'flex-start' },
					}}>
					<Typography
						fontWeight={900}
						variant={'h3'}>
						{homeHeading}
					</Typography>
					<Link to='/stats/players'>
						<Typography
							variant='h6'
							fontWeight={400}>
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
