/* eslint-disable react/prop-types */
import { Box } from '@mui/material'

const UserAvatar = ({ avatar, dimensions }) => {
	return (
		<Box>
			<img
				style={{ objectFit: 'cover', borderRadius: '50%' }}
				width={dimensions}
				height={dimensions}
				alt='Avatar'
				src={`/public/assets/${avatar}`}
			/>
		</Box>
	)
}

export default UserAvatar
