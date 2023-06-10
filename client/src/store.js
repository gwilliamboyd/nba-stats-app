import { configureStore } from '@reduxjs/toolkit'
import teamsPerGameReducer from './slices/teamsPerGameSlice'
import teamsTotalReducer from './slices/teamsTotalSlice'
import teamsAdvancedReducer from './slices/teamsAdvancedSlice'

const store = configureStore({
	reducer: {
		teamsPerGameStats: teamsPerGameReducer,
		teamsTotalStats: teamsTotalReducer,
		teamsAdvancedStats: teamsAdvancedReducer,
	},
	middleware: getDefaultMiddleware => getDefaultMiddleware(),
	devTools: true,
})

export default store
