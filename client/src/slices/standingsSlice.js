import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	leagueStandings: [],
}

const leagueStandingsSlice = createSlice({
	name: 'leagueStandings',
	initialState,
	reducers: {
		setLeagueStandings: (state, action) => {
			state.leagueStandings = action.payload.leagueStandings
		},
	},
})

export const { setLeagueStandings } = leagueStandingsSlice.actions
export default leagueStandingsSlice.reducer
