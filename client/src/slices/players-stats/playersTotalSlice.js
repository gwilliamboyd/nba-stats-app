import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	playersTotalStats: [],
}

const playersTotalSlice = createSlice({
	name: 'playersTotal',
	initialState,
	reducers: {
		setPlayersTotalStats: (state, action) => {
			state.playersTotalStats = action.payload.playersTotalStats
		},
	},
})

export const { setPlayersTotalStats } = playersTotalSlice.actions
export default playersTotalSlice.reducer
