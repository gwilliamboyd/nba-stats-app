import { configureStore } from '@reduxjs/toolkit'
import teamsPerGameReducer from './slices/teamsPerGameSlice'
import teamsTotalReducer from './slices/teamsTotalSlice'
import teamsAdvancedReducer from './slices/teamsAdvancedSlice'
import teamIndivReducer from './slices/teamIndivSlice'
import leagueStandingsReducer from './slices/standingsSlice'
// import favoriteTeamsReducer from './slices/authentication/favoriteTeamsSlice'
import authReducer from './slices/authentication/authSlice'
import { apiSlice } from './slices/authentication/apiSlice'

const store = configureStore({
	reducer: {
		teamsPerGameStats: teamsPerGameReducer,
		teamsTotalStats: teamsTotalReducer,
		teamsAdvancedStats: teamsAdvancedReducer,
		teamIndivStats: teamIndivReducer,
		leagueStandings: leagueStandingsReducer,
		// favoriteTeams: favoriteTeamsReducer,
		auth: authReducer,
		[apiSlice.reducerPath]: apiSlice.reducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(apiSlice.middleware),
	devTools: true,
})

export default store
