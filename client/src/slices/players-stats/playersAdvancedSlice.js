import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	playersAdvancedStats: [],
}

const playersAdvancedSlice = createSlice({
	name: 'playersAdvanced',
	initialState,
	reducers: {
		setPlayersAdvancedStats: (state, action) => {
			state.playersAdvancedStats = action.payload.playersAdvancedStats
		},
	},
})

export const { setPlayersAdvancedStats } = playersAdvancedSlice.actions
export default playersAdvancedSlice.reducer
