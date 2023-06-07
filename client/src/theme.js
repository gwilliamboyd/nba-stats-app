import { createTheme } from '@mui/material/styles'

const theme = createTheme({
	palette: {
		league: {
			nbaBlue: '#253B73',
			nbaRed: '#B52532',
			nbaWhite: '#FFFFFF',
			nbaBlack: '#000000',
		},
		teams: {
			chi: {
				primary: '#CD1F43',
				secondary: '#000000',
				tertiary: '#FFFFFF',
			},
		},
	},
})

export default theme
