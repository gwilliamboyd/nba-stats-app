import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Box, CssBaseline } from '@mui/material'
import Navbar from './components/Navbar'
import LoadingScreen from './screens/utility/LoadingScreen'
import ErrorPage from './screens/ErrorPage'
// import HomePage from './screens/HomePage'
const [
	HomePage,
	TeamsPage,
	PlayersPage,
	StandingsPage,
	TeamIndivPage,
	PlayerIndivPage,
	LoginPage,
	RegisterPage,
	UserProfilePage,
	FavoriteTeamsStats,
] = [
	lazy(() => import('./screens/HomePage')),
	lazy(() => import('./screens/teams/TeamsPage')),
	lazy(() => import('./screens/players/PlayersPage')),
	lazy(() => import('./screens/StandingsPage')),
	lazy(() => import('./screens/teams/TeamIndivPage')),
	lazy(() => import('./screens/players/PlayerIndivPage')),
	lazy(() => import('./screens/users/LoginPage')),
	lazy(() => import('./screens/users/RegisterPage')),
	lazy(() => import('./screens/users/UserProfilePage')),
	lazy(() => import('./screens/FavoriteTeamsStats')),
]
// Logout imports
import { useDispatch } from 'react-redux'
import { logout } from './slices/authentication/authSlice'
import { useLogoutMutation } from './slices/authentication/usersApiSlice'

function App() {
	/* handle logout when user closes browser
		JWT is already destroyed anyhow
	*/
	// util
	const dispatch = useDispatch()

	// Logout mutation
	const [logoutApiCall] = useLogoutMutation()

	const logoutHandler = async () => {
		try {
			await logoutApiCall().unwrap()
			dispatch(logout())
		} catch (err) {
			console.log(err)
		}
	}

	// call logout on window close
	window.addEventListener('beforeunload', logoutHandler)
	return (
		<Box
			sx={{
				backgroundColor: '#0D162C',
				width: { xs: '100vw', md: 'calc(100vw - 8px)' },
			}}>
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
						<Route
							path={`/*`}
							element={<ErrorPage />}
						/>
					</Routes>
				</Suspense>
			</BrowserRouter>
		</Box>
	)
}

/* const testDelay = async promise => {
	await new Promise(resolve => {
		setTimeout(resolve, 3000)
	})
	return promise
} */

export default App
