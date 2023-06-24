import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	teamsAdvancedStats: [],
}

const teamsAdvancedSlice = createSlice({
	name: 'teamsAdvanced',
	initialState,
	reducers: {
		setTeamsAdvancedStats: (state, action) => {
			state.teamsAdvancedStats = action.payload.teamsAdvancedStats
		},
	},
})

export const { setTeamsAdvancedStats } = teamsAdvancedSlice.actions
export default teamsAdvancedSlice.reducer
