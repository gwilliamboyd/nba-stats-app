/* eslint-disable react/prop-types */
import { Box, TextField, Typography } from '@mui/material'

// eslint-disable-next-line react/prop-types
const TextFieldContainer = ({ heading, onChange, value, textFieldStyles }) => {
	return (
		<Box
			width='60%'
			sx={{
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'baseline',
				textAlign: 'right',
			}}>
			<Box
				sx={{
					width: '40%',
					display: 'flex',
					justifyContent: 'flex-end',
				}}>
				<Typography
					textAlign='right'
					tableCellStyles
					variant='h6'>
					{heading}
				</Typography>
			</Box>
			<TextField
				required
				id='outlined-required'
				label='Required'
				type='name'
				onChange={onChange}
				placeholder={heading}
				sx={textFieldStyles}
				value={value}
			/>
		</Box>
	)
}

export default TextFieldContainer
