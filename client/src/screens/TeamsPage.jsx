import { useTheme } from '@mui/material/styles'

const TeamsPage = () => {
	const theme = useTheme()
	const { league } = theme.palette

	return <h1 style={{ color: league.nbaBlue }}>TeamsPage</h1>
}

export default TeamsPage
