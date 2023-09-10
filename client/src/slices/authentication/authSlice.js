import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	userInfo: localStorage.getItem('userInfo')
		? JSON.parse(localStorage.getItem('userInfo'))
		: null,
	snackbarIsOpen: {
		// success
		loginSnackbar: false,
		registerSnackbar: false,
		logoutSnackbar: false,
		profileUpdateSnackbar: false,
		// error
		incorrectPasswordSnackbar: false,
		passwordMismatchSnackbar: false,
	},
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setCredentials: (state, action) => {
			state.userInfo = action.payload
			localStorage.setItem('userInfo', JSON.stringify(action.payload))
		},
		setSnackbar: (state, action) => {
			state.snackbarIsOpen = action.payload
		},
		logout: (state, action) => {
			// Clears credentials
			state.userInfo = null
			localStorage.removeItem('userInfo')
		},
	},
})

export const { setCredentials, setSnackbar, logout } = authSlice.actions
export default authSlice.reducer
