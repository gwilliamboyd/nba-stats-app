import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import store from './store.js'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@mui/material/styles'
import theme from './theme.js'

ReactDOM.createRoot(document.getElementById('root')).render(
	<ThemeProvider theme={theme}>
		<React.StrictMode>
			<Provider store={store}>
				<App />
			</Provider>
		</React.StrictMode>
	</ThemeProvider>
)
