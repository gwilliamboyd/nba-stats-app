/* eslint-disable react/prop-types */
import { Box, TextField, Typography } from '@mui/material'

// eslint-disable-next-line react/prop-types
const TextFieldContainer = ({
	width,
	icon,
	heading,
	fontSize,
	onChange,
	type,
	value,
	textFieldStyles,
}) => {
	return (
		<Box
			// width='70%'
			sx={{
				display: 'grid',
				flexDirection: { xs: 'column', md: 'row' },
				gridTemplateColumns: {
					xs: '100%',
					sm: '150px 350px',
					md: '280px 520px',
					lg: '200px 440px',
					xl: '150px 350px',
				},
				gridTemplateRows: { xs: '1fr 2fr', sm: '1fr' },
				justifyContent: 'space-between',
				alignItems: 'baseline',
				textAlign: 'right',
				width: { sm: '520px', md: '820px', lg: '640px', xl: '500px' },
				gap: '1rem',
			}}>
			<Box
				sx={{
					width: { xs: '100%', md: '100%' },
					justifySelf: { xs: 'flex-start', md: 'flex-end' },
				}}>
				<Box
					sx={{
						display: 'flex',
						justifyContent: { xs: 'flex-start', sm: 'flex-end' },
						alignItems: 'center',
						gap: '12px',
					}}>
					<Box marginTop={'4px'}>{icon}</Box>
					<Typography
						sx={{ fontSize: fontSize }}
						variant='h6'>
						{heading}
					</Typography>
				</Box>
			</Box>
			<TextField
				width={width}
				required
				id='outlined-required'
				label='Required'
				type={type || 'name'}
				onChange={onChange}
				placeholder={heading}
				sx={textFieldStyles}
				value={value}
			/>
		</Box>
	)
}

export default TextFieldContainer
