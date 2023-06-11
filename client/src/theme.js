import { createTheme } from '@mui/material/styles'

const theme = createTheme({
	typography: {
		fontFamily: ['Open Sans', 'sans-serif'].join(','),
		fontSize: 15,
		fontWeightLight: 300,
		fontWeightRegular: 400,
		fontWeightMedium: 500,
		fontWeightBold: 700,
	},
	palette: {
		league: {
			nbaBlue: '#253B73',
			nbaRed: '#B52532',
			nbaBackground: '#0D162C',
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
