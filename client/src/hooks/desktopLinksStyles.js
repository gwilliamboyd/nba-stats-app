// Desktop links styling - on :hover
export const desktopLinksStyles = {
	display: 'inline-block',
	position: 'relative',
	transition: 'all 0.2s ease-out',
	paddingBottom: '0.2rem',
	'&::before': {
		content: '""',
		position: 'absolute',
		left: '0',
		bottom: '0',
		width: '0',
		height: '2px',
		// can't call MUI theme here
		// this is league.nbaRed typed manually
		backgroundColor: '#B52532',
		transition: 'width 0.25s ease-out',
	},
	'&:hover::before': {
		width: '100%',
	},
}
