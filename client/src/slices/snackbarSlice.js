import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	snackbarState: {
		snackbarOpen: false,
		snackbarType: '',
		alertType: 'success',
		snackbarMessage: '',
	},
}

const snackbarStateSlice = createSlice({
	name: 'snackbarState',
	initialState,
	reducers: {
		setSnackbarState: (state, action) => {
			state.snackbarState = { ...state.snackbarState, ...action.payload }
		},
	},
})

export const { setSnackbarState } = snackbarStateSlice.actions
export default snackbarStateSlice.reducer
