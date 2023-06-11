import { useTheme } from '@emotion/react'
import { useSelector, useDispatch } from 'react-redux'
import { setTeamIndivStats } from '../slices/teamIndivSlice'
import { Box, Container, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import TeamIndivStatsRow from '../components/TeamIndivStatsRow'
import LoadingScreenBlank from './LoadingScreenBlank'

const TeamIndivPage = () => {
	const theme = useTheme()
	const dispatch = useDispatch()
	const teamIndivStats = useSelector(state => state.teamIndivStats)
	const { teams } = theme.palette

	const [loading, setLoading] = useState(true)

	const getTeamIndivStats = async () => {
		const response = await fetch(`http://localhost:5000/stats/teams/chi`, {
			method: 'GET',
		})
		const data = await response.json()
		dispatch(setTeamIndivStats({ teamIndivStats: data }))
		setLoading(false)
	}
	const teamIndivStatistics = Object.values(teamIndivStats)[0]
	console.log(teamIndivStatistics[0])

	useEffect(() => {
		getTeamIndivStats()
	}, [])

	return (
		<Container
			disableGutters
			maxWidth='100%'
			sx={{
				height: 'calc(100vh - 100px)',
				backgroundColor: teams.chi.primary,
			}}>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					gap: '3rem',
				}}>
				<img
					src='../../public/images/svgs/team-logos/chi.svg'
					width={200}
					alt='Chicago Bulls logo'
				/>
				<Typography>Chicago Bulls</Typography>
				{loading ? (
					<LoadingScreenBlank />
				) : (
					<>
						<TeamIndivStatsRow
							statsType={'perGame'}
							loading={loading}
							statistics={teamIndivStatistics[0]}
						/>
						<TeamIndivStatsRow
							statsType={'total'}
							loading={loading}
							statistics={teamIndivStatistics[1]}
						/>
						<TeamIndivStatsRow
							statsType={'advanced'}
							loading={loading}
							statistics={teamIndivStatistics[2]}
						/>
					</>
				)}
			</Box>
		</Container>
	)
}

export default TeamIndivPage
