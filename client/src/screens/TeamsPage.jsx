import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setTeamsPerGameStats } from '../slices/teamsPerGameSlice'
import { useTheme } from '@mui/material/styles'
import TeamsStatsTable from '../components/TeamsStatsTable'

const TeamsPage = () => {
	// theme
	const theme = useTheme()
	const { league } = theme.palette
	// state
	const dispatch = useDispatch()
	const teamsPerGameStats = useSelector(state => state.teamsPerGameStats)

	const getTeamsPerGame = async () => {
		const response = await fetch(`http://localhost:5000/stats/teams`, {
			method: 'GET',
		})
		const data = await response.json()
		dispatch(setTeamsPerGameStats({ teamsPerGameStats: data }))
	}

	useEffect(() => {
		getTeamsPerGame()
	}, [])

	const teamsPerGameStatistics = Object.values(teamsPerGameStats)[0]
	console.log(teamsPerGameStatistics)

	return (
		<main>
			<TeamsStatsTable teamsPerGameStatistics={teamsPerGameStatistics} />
			{/* {teamsPerGameStatistics.map(({_id,id,team,g,mp,fg,fga,fgPer,$3p,
		$3pA,$3pPer,$2p,$2pA,$2pPer,ft,fta,
		ftPer,orb,drb,trb,ast,stl,blk,tov,pf}) => (<TeamStatsDisplay />))} */}
		</main>
	)
}

export default TeamsPage
