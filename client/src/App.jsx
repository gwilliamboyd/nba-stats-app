import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import { CssBaseline } from '@mui/material'
import Navbar from './components/Navbar'
import HomePage from './screens/HomePage'
import { Suspense, lazy } from 'react'
import LoadingScreen from './screens/LoadingScreen'
import TeamIndivPage from './screens/TeamIndivPage'
import LoginPage from './screens/LoginPage'
import RegisterPage from './screens/RegisterPage'
import UserProfilePage from './screens/UserProfilePage'
import FavoriteTeamsStats from './screens/FavoriteTeamsStats'
const TeamsPage = lazy(() => import('./screens/TeamsPage'))

function App() {
	return (
		<main style={{ backgroundColor: '#0D162C' }}>
			<BrowserRouter>
				<CssBaseline />
				<Navbar />
				<Suspense fallback={<LoadingScreen />}>
					<Routes>
						<Route
							path='/'
							element={<HomePage />}
						/>
						<Route
							path='stats/teams'
							element={<TeamsPage />}
						/>
						<Route
							path={`stats/teams/:team`}
							element={<TeamIndivPage />}
						/>
						<Route
							path={`stats/teams/favorite-teams`}
							element={<FavoriteTeamsStats />}
						/>
						<Route
							path={`register`}
							element={<RegisterPage />}
						/>
						<Route
							path={`login`}
							element={<LoginPage />}
						/>
						<Route
							path={`/profile`}
							element={<UserProfilePage />}
						/>
					</Routes>
				</Suspense>
			</BrowserRouter>
		</main>
	)
}

/* const testDelay = async promise => {
	await new Promise(resolve => {
		setTimeout(resolve, 3000)
	})
	return promise
} */

export default App
