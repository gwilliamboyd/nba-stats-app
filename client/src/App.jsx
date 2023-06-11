import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import { CssBaseline } from '@mui/material'
import Navbar from './components/Navbar'
import HomePage from './screens/HomePage'
import { Suspense, lazy } from 'react'
import LoadingScreen from './screens/LoadingScreen'
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
							path='/stats/teams'
							element={<TeamsPage />}
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
