import { configureStore } from '@reduxjs/toolkit'
import teamsPerGameReducer from './slices/teamsPerGameSlice'

const store = configureStore({
	reducer: {
		teamsPerGameStats: teamsPerGameReducer,
	},
	middleware: getDefaultMiddleware => getDefaultMiddleware(),
	devTools: true,
})

export default store
