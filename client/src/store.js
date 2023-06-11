import { configureStore } from '@reduxjs/toolkit'
import teamsPerGameReducer from './slices/teamsPerGameSlice'
import teamsTotalReducer from './slices/teamsTotalSlice'
import teamsAdvancedReducer from './slices/teamsAdvancedSlice'
import teamIndivReducer from './slices/teamIndivSlice'

const store = configureStore({
	reducer: {
		teamsPerGameStats: teamsPerGameReducer,
		teamsTotalStats: teamsTotalReducer,
		teamsAdvancedStats: teamsAdvancedReducer,
		teamIndivStats: teamIndivReducer,
	},
	middleware: getDefaultMiddleware => getDefaultMiddleware(),
	devTools: true,
})

export default store
