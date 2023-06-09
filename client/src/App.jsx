import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import { CssBaseline } from '@mui/material'
import Navbar from './components/Navbar'
import HomePage from './screens/HomePage'
import TeamsPage from './screens/TeamsPage'

function App() {
	return (
		<>
			<BrowserRouter>
				<CssBaseline />
				<Navbar />
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
			</BrowserRouter>
		</>
	)
}

export default App
