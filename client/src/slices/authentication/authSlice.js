import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	userInfo: localStorage.getItem('userInfo')
		? JSON.parse(localStorage.getItem('userInfo'))
		: null,
	snackbarIsOpen: 'false',
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setCredentials: (state, action) => {
			state.userInfo = action.payload
			localStorage.setItem('userInfo', JSON.stringify(action.payload))
			state.snackbarIsOpen = 'true'
		},
		logout: (state, action) => {
			// Clears credentials
			state.userInfo = null
			localStorage.removeItem('userInfo')
			state.snackbarIsOpen = 'logged out'
			// state.snackbarIsOpen = 'false'
		},
	},
})

export const { setCredentials, logout } = authSlice.actions
export default authSlice.reducer
