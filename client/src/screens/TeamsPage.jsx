import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Container, Box, Typography, ButtonGroup, Button } from '@mui/material'
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
		<Container
			disableGutters
			maxWidth='100%'
			style={{
				backgroundColor: league.nbaBackground,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				color: league.nbaWhite,
			}}>
			<Box
				sx={{
					display: 'flex',
					alignSelf: 'flex-start',
					justifyContent: 'space-between',
					margin: '3rem 0 1rem',
					width: '100%',
				}}>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'baseline',
						gap: '3rem',
						marginLeft: '5rem',
					}}>
					<Typography variant='h3'>Team Stats</Typography>
					<Typography
						variant='h5'
						sx={{ fontWeight: '600', opacity: '90%' }}>
						2022-23 Season
					</Typography>
				</Box>
				<ButtonGroup
					variant='text'
					aria-label='text button group'
					size='large'
					sx={{ marginRight: '5rem' }}>
					<Button>Per-Game</Button>
					<Button>Totals</Button>
					<Button>Advanced</Button>
				</ButtonGroup>
			</Box>

			<TeamsStatsTable teamsPerGameStatistics={teamsPerGameStatistics} />
			{/* {teamsPerGameStatistics.map(({_id,id,team,g,mp,fg,fga,fgPer,$3p,
		$3pA,$3pPer,$2p,$2pA,$2pPer,ft,fta,
		ftPer,orb,drb,trb,ast,stl,blk,tov,pf}) => (<TeamStatsDisplay />))} */}
		</Container>
	)
}

export default TeamsPage
