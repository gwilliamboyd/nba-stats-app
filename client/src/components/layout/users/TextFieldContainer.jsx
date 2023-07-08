/* eslint-disable react/prop-types */
import { Box, TextField, Typography } from '@mui/material'

// eslint-disable-next-line react/prop-types
const TextFieldContainer = ({
	heading,
	onChange,
	type,
	value,
	textFieldStyles,
}) => {
	return (
		<Box
			// width='70%'
			sx={{
				display: 'flex',
				flexDirection: { xs: 'column', md: 'row' },
				justifyContent: 'space-between',
				alignItems: 'baseline',
				textAlign: 'right',
				width: { xs: '90%', md: '70%' },
				gap: '1rem',
			}}>
			<Box
				sx={{
					width: { xs: '100%', md: '50%' },
					display: 'flex',
					justifyContent: { xs: 'flex-start', md: 'flex-end' },
				}}>
				<Typography
					tableCellStyles
					variant='h6'>
					{heading}
				</Typography>
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
