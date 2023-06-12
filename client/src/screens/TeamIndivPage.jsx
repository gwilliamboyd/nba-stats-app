import { useTheme } from '@emotion/react'
import { useSelector, useDispatch } from 'react-redux'
import { setTeamIndivStats } from '../slices/teamIndivSlice'
import { Box, Container, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import TeamIndivStatsRow from '../components/TeamIndivStatsRow'
import LoadingScreenBlank from './LoadingScreenBlank'
import fullTeamNames from '../hooks/fullTeamNames'

const TeamIndivPage = () => {
	const theme = useTheme()
	const dispatch = useDispatch()
	const teamIndivStats = useSelector(state => state.teamIndivStats)
	const team = window.location.href.slice(-3)
	console.log(team)
	// const { teams } = theme.palette
	const primaryColor = eval(`theme.palette.teams.${team}.primary`)
	const secondaryColor = eval(`theme.palette.teams.${team}.secondary`)
	const tertiaryColor = eval(`theme.palette.teams.${team}.tertiary`)

	const [loading, setLoading] = useState(true)

	const getTeamIndivStats = async () => {
		const response = await fetch(`http://localhost:5000/stats/teams/${team}`, {
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
				backgroundColor: primaryColor,
			}}>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					gap: '3rem',
				}}>
				<img
					src={`../../public/images/svgs/team-logos/${team}.svg`}
					width={200}
					alt='Chicago Bulls logo'
				/>
				<Typography
					variant='h3'
					sx={{ color: tertiaryColor }}>
					{fullTeamNames(team)}
				</Typography>
				{loading ? (
					<LoadingScreenBlank />
				) : (
					<>
						<TeamIndivStatsRow
							team={team}
							primaryColor={primaryColor}
							secondaryColor={secondaryColor}
							tertiaryColor={tertiaryColor}
							statsType={'perGame'}
							loading={loading}
							statistics={teamIndivStatistics[0]}
						/>
						<TeamIndivStatsRow
							team={team}
							primaryColor={primaryColor}
							secondaryColor={secondaryColor}
							tertiaryColor={tertiaryColor}
							statsType={'total'}
							loading={loading}
							statistics={teamIndivStatistics[1]}
						/>
						<TeamIndivStatsRow
							team={team}
							primaryColor={primaryColor}
							secondaryColor={secondaryColor}
							tertiaryColor={tertiaryColor}
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
