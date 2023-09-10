/* eslint-disable react/prop-types */
import { Alert, Button, IconButton, Snackbar } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useDispatch /* , useSelector */ } from 'react-redux'
import { setSnackbar } from '../../slices/authentication/authSlice'
import CloseIcon from '@mui/icons-material/Close'

const SuccessSnackbar = ({ open, message }) => {
	const theme = useTheme()
	const { league } = theme.palette

	const dispatch = useDispatch()
	// const { snackbarIsOpen } = useSelector(state => state.auth)

	const snackbarAction = (
		<>
			<Button
				color='primary'
				size='small'
				onClick={() => dispatch(setSnackbar(false))}>
				UNDO
			</Button>
			<IconButton
				size='small'
				aria-label='close'
				color='inherit'
				onClick={() => dispatch(setSnackbar(false))}>
				<CloseIcon fontSize='small' />
			</IconButton>
		</>
	)

	return (
		<Snackbar
			open={open}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			autoHideDuration={3000}
			onClose={() => dispatch(setSnackbar(false))}
			action={snackbarAction}
			sx={{ backgroundColor: league.nbaBackground, margin: '84px 7% 0 0' }}>
			<Alert
				variant='filled'
				onClose={() => dispatch(setSnackbar(false))}
				severity='success'
				sx={{ width: '100%' }}>
				{message}
			</Alert>
		</Snackbar>
	)
}

export default SuccessSnackbar
