import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	playersPerGameStats: [],
}

const playersPerGameSlice = createSlice({
	name: 'playersPerGame',
	initialState,
	reducers: {
		setPlayersPerGameStats: (state, action) => {
			state.playersPerGameStats = action.payload.playersPerGameStats
		},
	},
})

export const { setPlayersPerGameStats } = playersPerGameSlice.actions
export default playersPerGameSlice.reducer
