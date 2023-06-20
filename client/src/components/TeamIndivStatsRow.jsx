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
import {
	teamsPerGameHeadCells,
	teamsAdvancedHeadCells,
} from '../data/headCells/teamsHeadCellsIndivRow'
import HeadCellsTeams from './tables/HeadCellsTeams'
import HeadCellsTeamsIndivRow from './tables/HeadCellsTeamsIndivRow'

const TeamIndivStatsRow = ({
	team,
	primaryColor,
	secondaryColor,
	tertiaryColor,
	statsType,
	loading,
	statistics,
}) => {
	return (
		<Box
			sx={{
				width: '100%',
				backgroundColor: primaryColor,
			}}>
			<Paper
				sx={{
					width: '100%',
					mb: 2,
					border: '1px solid white',
					backgroundColor: primaryColor,
				}}>
				{/* <Typography sx={{ color: tertiaryColor }}>
					{statsType === 'perGame'
						? 'Per-Game'
						: statsType === 'total'
						? 'Totals'
						: statsType === 'advanced'
						? 'Advanced'
						: null}
				</Typography> */}
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
						<HeadCellsTeamsIndivRow
							statsType={statsType}
							headCells={
								statsType === 'advanced'
									? teamsAdvancedHeadCells
									: teamsPerGameHeadCells
							}
							backgroundColor={primaryColor}
							fontColor={secondaryColor}
						/>
						<TableBody>
							{statsType === 'advanced'
								? statistics.map(row => {
										return (
											<TableRow key={row.team}>
												{loading ? (
													<Skeleton variant='rectangular' />
												) : (
													<>
														{/* <TableCell sx={{ padding: '4px' }}>
															<img
																src={`../../public/images/svgs/team-logos/${team}.svg`}
																alt={`${row.team} logo`}
																width={30}
															/>
														</TableCell>

														<TableCell
															sx={{
																color: tertiaryColor,
																padding: '2px',
																fontSize: '16px',
															}}
															component='th'
															scope='row'
															padding='none'>
															{fullTeamNames(row.team)}
														</TableCell> */}
														<TableCell
															sx={{ color: tertiaryColor, padding: '2px' }}
															align='right'>
															{row.age}
														</TableCell>
														<TableCell
															sx={{ color: tertiaryColor, padding: '2px' }}
															align='right'>
															{row.w}
														</TableCell>
														<TableCell
															sx={{ color: tertiaryColor, padding: '2px' }}
															align='right'>
															{row.l}
														</TableCell>
														<TableCell
															sx={{ color: tertiaryColor, padding: '2px' }}
															align='right'>
															{row.pw}
														</TableCell>
														<TableCell
															sx={{ color: tertiaryColor, padding: '2px' }}
															align='right'>
															{row.pl}
														</TableCell>
														<TableCell
															sx={{ color: tertiaryColor, padding: '2px' }}
															align='right'>
															{row.mov}
														</TableCell>
														<TableCell
															sx={{ color: tertiaryColor, padding: '2px' }}
															align='right'>
															{row.sos}
														</TableCell>
														<TableCell
															sx={{ color: tertiaryColor, padding: '2px' }}
															align='right'>
															{row.srs}
														</TableCell>
														<TableCell
															sx={{ color: tertiaryColor, padding: '2px' }}
															align='right'>
															{row.ortg}
														</TableCell>
														<TableCell
															sx={{ color: tertiaryColor, padding: '2px' }}
															align='right'>
															{row.drtg}
														</TableCell>
														<TableCell
															sx={{ color: tertiaryColor, padding: '2px' }}
															align='right'>
															{row.nrtg}
														</TableCell>
														<TableCell
															sx={{ color: tertiaryColor, padding: '2px' }}
															align='right'>
															{row.pace}
														</TableCell>
														<TableCell
															sx={{ color: tertiaryColor, padding: '2px' }}
															align='right'>
															{row.ftr}
														</TableCell>
														<TableCell
															sx={{ color: tertiaryColor, padding: '2px' }}
															align='right'>
															{row.$3par}
														</TableCell>
														<TableCell
															sx={{
																color: tertiaryColor,
																padding: '2px',
															}}
															align='right'>
															{row.tsPer}
														</TableCell>
														<TableCell
															sx={{ color: tertiaryColor, padding: '2px' }}
															align='right'>
															{row.offeFGPer}
														</TableCell>
														<TableCell
															sx={{ color: tertiaryColor, padding: '2px' }}
															align='right'>
															{row.offtovPer}
														</TableCell>
														<TableCell
															sx={{ color: tertiaryColor, padding: '2px' }}
															align='right'>
															{row.offorbPer}
														</TableCell>
														<TableCell
															sx={{ color: tertiaryColor, padding: '2px' }}
															align='right'>
															{row.offftFGA}
														</TableCell>
														<TableCell
															sx={{ color: tertiaryColor, padding: '2px' }}
															align='right'>
															{row.dffeFGPer}
														</TableCell>
														<TableCell
															sx={{ color: tertiaryColor, padding: '2px' }}
															align='right'>
															{row.dfftovPer}
														</TableCell>
														<TableCell
															sx={{ color: tertiaryColor, padding: '2px' }}
															align='right'>
															{row.dffdrbPer}
														</TableCell>
														<TableCell
															sx={{
																color: tertiaryColor,
																padding: '2px 4px 2px 2px',
															}}
															align='right'>
															{row.dffftFGA}
														</TableCell>
													</>
												)}
											</TableRow>
										)
								  })
								: statistics.map(row => {
										return (
											<TableRow key={row.team}>
												{loading ? (
													<Skeleton variant='rectangular' />
												) : (
													<>
														{/* <TableCell sx={{ padding: '4px' }}>
															<img
																src={`../../public/images/svgs/team-logos/${team}.svg`}
																alt={`${row.team} logo`}
																width={30}
															/>
														</TableCell>
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
														</TableCell> */}
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
													</>
												)}
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
