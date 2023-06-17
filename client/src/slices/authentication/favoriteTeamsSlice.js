import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	favoriteTeams: [],
}

const favoriteTeamsSlice = createSlice({
	name: 'favoriteTeams',
	initialState,
	reducers: {
		setFavoriteTeams: (state, action) => {
			state.favoriteTeams = action.payload.favoriteTeams
		},
	},
})

export const { setFavoriteTeams } = favoriteTeamsSlice.actions
export default favoriteTeamsSlice.reducer
