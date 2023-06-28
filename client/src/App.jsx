import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CssBaseline } from '@mui/material'
import Navbar from './components/Navbar'
import LoadingScreen from './screens/utility/LoadingScreen'
import HomePage from './screens/HomePage'
const [
	TeamsPage,
	PlayersPage,
	StandingsPage,
	TeamIndivPage,
	PlayerIndivPage,
	LoginPage,
	RegisterPage,
	UserProfilePage,
] = [
	lazy(() => import('./screens/teams/TeamsPage')),
	lazy(() => import('./screens/players/PlayersPage')),
	lazy(() => import('./screens/StandingsPage')),
	lazy(() => import('./screens/teams/TeamIndivPage')),
	lazy(() => import('./screens/players/PlayerIndivPage')),
	lazy(() => import('./screens/users/LoginPage')),
	lazy(() => import('./screens/users/RegisterPage')),
	lazy(() => import('./screens/users/UserProfilePage')),
]
// import TeamIndivPage from './screens/teams/TeamIndivPage'
// import LoginPage from './screens/users/LoginPage'
// import RegisterPage from './screens/users/RegisterPage'
// import UserProfilePage from './screens/users/UserProfilePage'
import FavoriteTeamsStats from './screens/FavoriteTeamsStats'

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
							path='standings'
							element={<StandingsPage />}
						/>
						<Route
							path='stats/teams'
							element={<TeamsPage />}
						/>
						<Route
							path='stats/players'
							element={<PlayersPage />}
						/>
						<Route
							path={`stats/players/:id`}
							element={<PlayerIndivPage />}
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
