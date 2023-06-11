import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	teamIndivStats: [],
}

const teamIndivSlice = createSlice({
	name: 'teamIndiv',
	initialState,
	reducers: {
		setTeamIndivStats: (state, action) => {
			state.teamIndivStats = action.payload.teamIndivStats
		},
	},
})

export const { setTeamIndivStats } = teamIndivSlice.actions
export default teamIndivSlice.reducer
