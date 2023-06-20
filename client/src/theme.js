import { createTheme } from '@mui/material/styles'

const theme = createTheme({
	typography: {
		fontFamily: ['Open Sans', 'sans-serif'].join(','),
		// fontStretch: 'condensed',
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
		button: {
			nbaWhite: '#FFFFFF',
		},
		teams: {
			atl: {
				primary: '#C8102E',
				secondary: '#FDB927',
				tertiary: '#FFFFFF',
			},
			bos: {
				primary: '#007A33',
				secondary: '#000000',
				tertiary: '#FFFFFF',
			},
			bkn: {
				primary: '#000000',
				// vintage gray
				secondary: '#C6CFD4',
				tertiary: '#FFFFFF',
			},
			cha: {
				primary: '#1D1160',
				secondary: '#00788C',
				// lighter gray
				tertiary: '#d7d9db',
			},
			chi: {
				primary: '#CD1F43',
				secondary: '#000000',
				tertiary: '#FFFFFF',
			},
			cle: {
				primary: '#860038',
				secondary: '#041E42',
				tertiary: '#FDBB30',
			},
			dal: {
				primary: '#00538C',
				// might need to lighten
				secondary: '#002B5E',
				// might need to lighten
				tertiary: '#B8C4CA',
			},
			den: {
				primary: '#0E2240',
				secondary: '#FEC524',
				tertiary: '#8B2131',
			},
			det: {
				primary: '#C8102E',
				secondary: '#1D42BA',
				tertiary: '#BEC0C2',
			},
			gsw: {
				primary: '#1D428A',
				secondary: '#FFC72C',
				tertiary: '#FFFFFF',
			},
			// logo blends in to background
			hou: {
				primary: '#CE1141',
				secondary: '#000000',
				tertiary: '#C4CED4',
			},
			ind: {
				primary: '#002D62',
				secondary: '#FDBB30',
				tertiary: '#BEC0C2',
			},
			lac: {
				primary: '#C8102E',
				secondary: '#1D428A',
				// lighter gray
				tertiary: '#d7d9db',
			},
			lak: {
				primary: '#552583',
				secondary: '#f9a01b',
				tertiary: '#000000',
			},
			mem: {
				primary: '#5D76A9',
				secondary: '#12173F',
				tertiary: '#F5B112',
			},
			mia: {
				primary: '#98002E',
				secondary: '#F9A01B',
				// technically, tertiary is black,
				// but white provides good contrast
				tertiary: '#FFFFFF',
			},
			mil: {
				primary: '#00471B',
				secondary: '#EEE1C6',
				// real tertiary is 0077C0
				tertiary: '#FFFFFF',
			},
			min: {
				primary: '#0C2340',
				secondary: '#236192',
				// might need to lighten
				tertiary: '#9EA2A2',
			},
			nop: {
				primary: '#0C2340',
				secondary: '#C8102E',
				tertiary: '#85714D',
			},
			nyk: {
				primary: '#006BB6',
				secondary: '#F58426',
				tertiary: '#BEC0C2',
			},
			okc: {
				primary: '#007AC1',
				secondary: '#EF3B24',
				tertiary: '#002D62',
			},
			orl: {
				primary: '#0077C0',
				secondary: '#C4CED4',
				tertiary: '#000000',
			},
			phi: {
				primary: '#006BB6',
				secondary: '#ED174C',
				// real tertiary is 002B5C
				tertiary: '#FFFFFF',
			},
			phx: {
				primary: '#1D1160',
				secondary: '#E56020',
				// real tertiary is black
				tertiary: '#F9AD1B',
			},
			por: {
				primary: '#E03A3E',
				secondary: '#000000',
				tertiary: '#FFFFFF',
			},
			sac: {
				primary: '#5A2D81',
				secondary: '#63727A',
				// real tertiary is black
				tertiary: '#FFFFFF',
			},
			sas: {
				primary: '#C4CED4',
				secondary: '#000000',
				tertiary: '#000000',
			},
			tor: {
				/* real primary is probably red,
				but flipping it around makes the page
				look much better, and provides 
				better contrast */
				primary: '#000000',
				secondary: '#CE1141',
				// lightened the silver a little bit
				// original silver: A1A1A4
				tertiary: '#c5c5c9',
			},
			uta: {
				primary: '#002B5C',
				// technically is tertiary
				secondary: '#F9A01B',
				// original green: 00471B
				tertiary: '#FFFFFF',
			},
			wsh: {
				primary: '#002B5C',
				// technically is tertiary
				secondary: '#E31837',
				// original green: 00471B
				tertiary: '#C4CED4',
			},
		},
	},
	MuiTableSortLabel: {
		root: {
			// NBA red
			color: '#B52532',

			// if you want to have icons visible permanently
			// '& $icon': {
			//   opacity: 1,
			//   color: primaryMain
			// },

			'&:hover': {
				color: '#FFFFFF',

				/* '&& $icon': {
					opacity: 1,
					color: '#FFFFFF',
				}, */
			},
			'&$active': {
				color: '#FFFFFF',

				// && instead of & is a workaround for https://github.com/cssinjs/jss/issues/1045
				'&& $icon': {
					opacity: 1,
					color: '#FFFFFF',
				},
			},
		},
	},
})

export default theme
