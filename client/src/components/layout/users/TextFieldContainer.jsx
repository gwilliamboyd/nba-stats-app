import { Box } from '@mui/material'

// eslint-disable-next-line react/prop-types
const TextFieldContainer = ({ children }) => {
	return (
		<Box
			width='60%'
			sx={{
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'baseline',
				textAlign: 'right',
			}}>
			{children}
		</Box>
	)
}

export default TextFieldContainer
