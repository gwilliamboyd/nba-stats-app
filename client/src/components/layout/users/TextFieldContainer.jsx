/* eslint-disable react/prop-types */
import { Box, TextField, Typography } from '@mui/material'

// eslint-disable-next-line react/prop-types
const TextFieldContainer = ({
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
				gridTemplateColumns: '1fr 3fr',
				gridTemplateRows: '1fr',
				justifyContent: 'space-between',
				alignItems: 'baseline',
				textAlign: 'right',
				width: { xs: '90%', md: '80%' },
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
						justifyContent: 'flex-end',
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
				fullWidth
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
