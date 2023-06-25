import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	playerIndivStats: [],
}

const playerIndivSlice = createSlice({
	name: 'playerIndiv',
	initialState,
	reducers: {
		setPlayerIndivStats: (state, action) => {
			state.playerIndivStats = action.payload.playerIndivStats
		},
	},
})

export const { setPlayerIndivStats } = playerIndivSlice.actions
export default playerIndivSlice.reducer
