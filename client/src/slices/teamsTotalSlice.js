import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	teamsTotalStats: [],
}

const teamsTotalSlice = createSlice({
	name: 'teamsTotal',
	initialState,
	reducers: {
		setTeamsTotalStats: (state, action) => {
			state.teamsTotalStats = action.payload.teamsTotalStats
		},
	},
})

export const { setTeamsTotalStats } = teamsTotalSlice.actions
export default teamsTotalSlice.reducer
