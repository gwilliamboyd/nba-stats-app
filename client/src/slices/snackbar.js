import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	snackbarState: {
		snackbarOpen: false,
		snackbarType: 'success',
		snackbarMessage: '',
	},
}

const snackbarStateSlice = createSlice({
	name: 'snackbarState',
	initialState,
	reducers: {
		setSnackbarState: (state, action) => {
			const { snackbarOpen, snackbarType, snackbarMessage } =
				initialState.snackbarState
			state.snackbarState = action.payload.snackbarState
		},
	},
})

export const { setSnackbarState } = snackbarStateSlice.actions
export default snackbarStateSlice.reducer
