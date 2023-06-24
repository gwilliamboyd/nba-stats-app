import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	teamsPerGameStats: [],
}

const teamsPerGameSlice = createSlice({
	name: 'teamsPerGame',
	initialState,
	reducers: {
		setTeamsPerGameStats: (state, action) => {
			state.teamsPerGameStats = action.payload.teamsPerGameStats
		},
	},
})

export const { setTeamsPerGameStats } = teamsPerGameSlice.actions
export default teamsPerGameSlice.reducer
