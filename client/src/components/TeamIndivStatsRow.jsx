/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/prop-types */
import {
	Box,
	Paper,
	Skeleton,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
	Typography,
} from '@mui/material'
import fullTeamNames from '../hooks/fullTeamNames'
import { useTheme } from '@emotion/react'
import {
	teamsPerGameHeadCells,
	teamsAdvancedHeadCells,
} from '../data/headCells/teamsHeadCells'
import HeadCellsTeams from './tables/HeadCellsTeams'

const TeamIndivStatsRow = ({
	team,
	primaryColor,
	secondaryColor,
	tertiaryColor,
	statsType,
	loading,
	statistics,
}) => {
	const theme = useTheme()
	const { teams } = theme.palette
	return (
		<Box
			sx={{
				width: '82%',
				backgroundColor: primaryColor,
			}}>
			<Paper
				sx={{
					width: '100%',
					mb: 2,
					border: '1px solid white',
					backgroundColor: primaryColor,
				}}>
				<Typography sx={{ color: tertiaryColor }}>
					{statsType === 'perGame'
						? 'Per-Game'
						: statsType === 'total'
						? 'Totals'
						: statsType === 'advanced'
						? 'Advanced'
						: null}
				</Typography>
				<TableContainer
					sx={{
						backgroundColor: primaryColor,
						p: '0 8px',
						border: '1px solid white',
					}}>
					<Table
						sx={{ minWidth: 750 }}
						aria-labelledby='tableTitle'
						size='small'>
						<HeadCellsTeams
							headCells={teamsPerGameHeadCells}
							fontColor={secondaryColor}
						/>
						<TableBody>
							{statistics.map(row => {
								return (
									<TableRow
										hover
										tabIndex={-1}
										key={row.team}
										sx={{ cursor: 'pointer' }}>
										{loading ? (
											<Skeleton variant='rectangular' />
										) : (
											<TableCell sx={{ padding: '4px' }}>
												<img
													src={`../../public/images/svgs/team-logos/${team}.svg`}
													alt={`${row.team} logo`}
													width={30}
												/>
											</TableCell>
										)}
										<TableCell
											sx={{
												color: tertiaryColor,
												padding: '2px',
												fontSize: '16px',
											}}
											component='th'
											// id={labelId}
											scope='row'
											padding='none'>
											{fullTeamNames(team)}
										</TableCell>
										<TableCell
											sx={{ color: tertiaryColor, padding: '2px' }}
											align='right'>
											{row.g}
										</TableCell>
										<TableCell
											sx={{ color: tertiaryColor, padding: '2px' }}
											align='right'>
											{row.mp}
										</TableCell>
										<TableCell
											sx={{ color: tertiaryColor, padding: '2px' }}
											align='right'>
											{row.fg}
										</TableCell>
										<TableCell
											sx={{ color: tertiaryColor, padding: '2px' }}
											align='right'>
											{row.fga}
										</TableCell>
										<TableCell
											sx={{ color: tertiaryColor, padding: '2px' }}
											align='right'>
											{row.fgPer}
										</TableCell>
										<TableCell
											sx={{ color: tertiaryColor, padding: '2px' }}
											align='right'>
											{row.$3p}
										</TableCell>
										<TableCell
											sx={{ color: tertiaryColor, padding: '2px' }}
											align='right'>
											{row.$3pA}
										</TableCell>
										<TableCell
											sx={{ color: tertiaryColor, padding: '2px' }}
											align='right'>
											{row.$3pPer}
										</TableCell>
										<TableCell
											sx={{ color: tertiaryColor, padding: '2px' }}
											align='right'>
											{row.$2p}
										</TableCell>
										<TableCell
											sx={{ color: tertiaryColor, padding: '2px' }}
											align='right'>
											{row.$2pA}
										</TableCell>
										<TableCell
											sx={{ color: tertiaryColor, padding: '2px' }}
											align='right'>
											{row.$2pPer}
										</TableCell>
										<TableCell
											sx={{ color: tertiaryColor, padding: '2px' }}
											align='right'>
											{row.ft}
										</TableCell>
										<TableCell
											sx={{ color: tertiaryColor, padding: '2px' }}
											align='right'>
											{row.fta}
										</TableCell>
										<TableCell
											sx={{ color: tertiaryColor, padding: '2px' }}
											align='right'>
											{row.ftPer}
										</TableCell>
										<TableCell
											sx={{
												color: tertiaryColor,
												padding: '2px',
											}}
											align='right'>
											{row.orb}
										</TableCell>
										<TableCell
											sx={{ color: tertiaryColor, padding: '2px' }}
											align='right'>
											{row.drb}
										</TableCell>
										<TableCell
											sx={{ color: tertiaryColor, padding: '2px' }}
											align='right'>
											{row.trb}
										</TableCell>
										<TableCell
											sx={{ color: tertiaryColor, padding: '2px' }}
											align='right'>
											{row.ast}
										</TableCell>
										<TableCell
											sx={{ color: tertiaryColor, padding: '2px' }}
											align='right'>
											{row.stl}
										</TableCell>
										<TableCell
											sx={{ color: tertiaryColor, padding: '2px' }}
											align='right'>
											{row.blk}
										</TableCell>
										<TableCell
											sx={{ color: tertiaryColor, padding: '2px' }}
											align='right'>
											{row.tov}
										</TableCell>
										<TableCell
											sx={{ color: tertiaryColor, padding: '2px' }}
											align='right'>
											{row.pf}
										</TableCell>
										<TableCell
											sx={{
												color: tertiaryColor,
												padding: '2px',
											}}
											align='right'>
											{row.pts}
										</TableCell>
									</TableRow>
								)
							})}
						</TableBody>
					</Table>
				</TableContainer>
			</Paper>
		</Box>
	)
}

export default TeamIndivStatsRow
