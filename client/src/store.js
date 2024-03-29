import { configureStore } from '@reduxjs/toolkit'
// team stats
import teamsPerGameReducer from './slices/team-stats/teamsPerGameSlice'
import teamsTotalReducer from './slices/team-stats/teamsTotalSlice'
import teamsAdvancedReducer from './slices/team-stats/teamsAdvancedSlice'
import teamIndivReducer from './slices/team-stats/teamIndivSlice'
// players stats
import playersPerGameReducer from './slices/players-stats/playersPerGameSlice'
import playersTotalReducer from './slices/players-stats/playersTotalSlice'
import playersAdvancedReducer from './slices/players-stats/playersAdvancedSlice'
import playerIndivReducer from './slices/players-stats/playerIndivSlice'
// standings
import leagueStandingsReducer from './slices/standingsSlice'
import authReducer from './slices/authentication/authSlice'
import { apiSlice } from './slices/authentication/apiSlice'
// snackbar
import snackbarReducer from './slices/snackbarSlice'

const store = configureStore({
	reducer: {
		// teams
		teamsPerGameStats: teamsPerGameReducer,
		teamsTotalStats: teamsTotalReducer,
		teamsAdvancedStats: teamsAdvancedReducer,
		teamIndivStats: teamIndivReducer,
		// players
		playersPerGameStats: playersPerGameReducer,
		playersTotalStats: playersTotalReducer,
		playersAdvancedStats: playersAdvancedReducer,
		playerIndivStats: playerIndivReducer,
		// standings
		leagueStandings: leagueStandingsReducer,
		// users/authentication
		auth: authReducer,
		[apiSlice.reducerPath]: apiSlice.reducer,
		// snackbar feedback
		snackbarState: snackbarReducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(apiSlice.middleware),
	devTools: true,
})

export default store
