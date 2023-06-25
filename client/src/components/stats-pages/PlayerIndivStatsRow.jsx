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
import fullTeamNames from '../../hooks/fullTeamNames'
import {
	playersPerGameHeadCells,
	playersAdvancedHeadCells,
} from '../../data/headCells/playersHeadCellsIndivRow'
import HeadCellsPlayers from '../tables/HeadCellsPlayers'
import HeadCellsPlayersIndivRow from '../tables/HeadCellsTeamsIndivRow'

const PlayerIndivStatsRow = ({
	team,
	primaryColor,
	secondaryColor,
	tertiaryColor,
	statsType,
	loading,
	statistics,
}) => {
	console.log(statistics)
	const perGameStatistics = statistics[0]
	const totalStatistics = statistics[1]
	const advancedStatistics = statistics[2]
	console.log(advancedStatistics)
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
					border: `2px solid ${secondaryColor}`,
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
						// border: '1px solid white',
					}}>
					<Table
						sx={{ minWidth: 750 }}
						aria-labelledby='tableTitle'
						size='small'>
						<HeadCellsPlayersIndivRow
							statsType={statsType}
							headCells={
								statsType === 'advanced'
									? playersAdvancedHeadCells
									: playersPerGameHeadCells
							}
							backgroundColor={primaryColor}
							fontColor={secondaryColor}
						/>
						<TableBody>
							{statsType === 'advanced' ? (
								<TableRow>
									<TableCell
										sx={{ color: tertiaryColor, padding: '2px', border: '0' }}>
										{advancedStatistics.pos}
									</TableCell>
									<TableCell
										sx={{ color: tertiaryColor, padding: '2px', border: '0' }}>
										{advancedStatistics.age}
									</TableCell>
									<TableCell
										sx={{ color: tertiaryColor, padding: '2px', border: '0' }}>
										{advancedStatistics.g}
									</TableCell>
									<TableCell
										sx={{ color: tertiaryColor, padding: '2px', border: '0' }}>
										{advancedStatistics.mp}
									</TableCell>
									<TableCell
										sx={{ color: tertiaryColor, padding: '2px', border: '0' }}>
										{advancedStatistics.per}
									</TableCell>
									<TableCell
										sx={{ color: tertiaryColor, padding: '2px', border: '0' }}>
										{advancedStatistics.tsPer}
									</TableCell>
									<TableCell
										sx={{ color: tertiaryColor, padding: '2px', border: '0' }}>
										{advancedStatistics.$3pAr}
									</TableCell>
									<TableCell
										sx={{ color: tertiaryColor, padding: '2px', border: '0' }}>
										{advancedStatistics.ftr}
									</TableCell>
									<TableCell
										sx={{ color: tertiaryColor, padding: '2px', border: '0' }}>
										{advancedStatistics.orbPer}
									</TableCell>
									<TableCell
										sx={{ color: tertiaryColor, padding: '2px', border: '0' }}>
										{advancedStatistics.drbPer}
									</TableCell>
									<TableCell
										sx={{ color: tertiaryColor, padding: '2px', border: '0' }}>
										{advancedStatistics.trbPer}
									</TableCell>
									<TableCell
										sx={{ color: tertiaryColor, padding: '2px', border: '0' }}>
										{advancedStatistics.astPer}
									</TableCell>
									<TableCell
										sx={{ color: tertiaryColor, padding: '2px', border: '0' }}>
										{advancedStatistics.stlPer}
									</TableCell>
									<TableCell
										sx={{ color: tertiaryColor, padding: '2px', border: '0' }}>
										{advancedStatistics.blkPer}
									</TableCell>
									<TableCell
										sx={{ color: tertiaryColor, padding: '2px', border: '0' }}>
										{advancedStatistics.tovPer}
									</TableCell>
									<TableCell
										sx={{ color: tertiaryColor, padding: '2px', border: '0' }}>
										{advancedStatistics.usgPer}
									</TableCell>
									<TableCell
										sx={{ color: tertiaryColor, padding: '2px', border: '0' }}>
										{advancedStatistics.ows}
									</TableCell>
									<TableCell
										sx={{ color: tertiaryColor, padding: '2px', border: '0' }}>
										{advancedStatistics.dws}
									</TableCell>
									<TableCell
										sx={{ color: tertiaryColor, padding: '2px', border: '0' }}>
										{advancedStatistics.ws}
									</TableCell>
									<TableCell
										sx={{ color: tertiaryColor, padding: '2px', border: '0' }}>
										{advancedStatistics.ws48}
									</TableCell>
									<TableCell
										sx={{ color: tertiaryColor, padding: '2px', border: '0' }}>
										{advancedStatistics.obpm}
									</TableCell>
									<TableCell
										sx={{ color: tertiaryColor, padding: '2px', border: '0' }}>
										{advancedStatistics.dbpm}
									</TableCell>
									<TableCell
										sx={{ color: tertiaryColor, padding: '2px', border: '0' }}>
										{advancedStatistics.bpm}
									</TableCell>
									<TableCell
										sx={{ color: tertiaryColor, padding: '2px', border: '0' }}>
										{advancedStatistics.worp}
									</TableCell>
								</TableRow>
							) : (
								<TableRow>
									<TableCell
										sx={{ color: tertiaryColor, padding: '2px', border: '0' }}>
										{eval(`${statsType}Statistics.pos`)}
									</TableCell>
									<TableCell
										sx={{ color: tertiaryColor, padding: '2px', border: '0' }}>
										{eval(`${statsType}Statistics.age`)}
									</TableCell>
									<TableCell
										sx={{ color: tertiaryColor, padding: '2px', border: '0' }}>
										{eval(`${statsType}Statistics.g`)}
									</TableCell>
									<TableCell
										sx={{ color: tertiaryColor, padding: '2px', border: '0' }}>
										{eval(`${statsType}Statistics.gs`)}
									</TableCell>
									<TableCell
										sx={{ color: tertiaryColor, padding: '2px', border: '0' }}>
										{eval(`${statsType}Statistics.mp`)}
									</TableCell>
									<TableCell
										sx={{ color: tertiaryColor, padding: '2px', border: '0' }}>
										{eval(`${statsType}Statistics.fg`)}
									</TableCell>
									<TableCell
										sx={{ color: tertiaryColor, padding: '2px', border: '0' }}>
										{eval(`${statsType}Statistics.fga`)}
									</TableCell>
									<TableCell
										sx={{ color: tertiaryColor, padding: '2px', border: '0' }}>
										{eval(`${statsType}Statistics.fgPer`)}
									</TableCell>
									<TableCell
										sx={{ color: tertiaryColor, padding: '2px', border: '0' }}>
										{eval(`${statsType}Statistics.$3p`)}
									</TableCell>
									<TableCell
										sx={{ color: tertiaryColor, padding: '2px', border: '0' }}>
										{eval(`${statsType}Statistics.$3pA`)}
									</TableCell>
									<TableCell
										sx={{ color: tertiaryColor, padding: '2px', border: '0' }}>
										{eval(`${statsType}Statistics.$3pPer`)}
									</TableCell>
									<TableCell
										sx={{ color: tertiaryColor, padding: '2px', border: '0' }}>
										{eval(`${statsType}Statistics.$2p`)}
									</TableCell>
									<TableCell
										sx={{ color: tertiaryColor, padding: '2px', border: '0' }}>
										{eval(`${statsType}Statistics.$2pA`)}
									</TableCell>
									<TableCell
										sx={{ color: tertiaryColor, padding: '2px', border: '0' }}>
										{eval(`${statsType}Statistics.$2pPer`)}
									</TableCell>
									<TableCell
										sx={{ color: tertiaryColor, padding: '2px', border: '0' }}>
										{eval(`${statsType}Statistics.eFgPer`)}
									</TableCell>
									<TableCell
										sx={{ color: tertiaryColor, padding: '2px', border: '0' }}>
										{eval(`${statsType}Statistics.ft`)}
									</TableCell>
									<TableCell
										sx={{ color: tertiaryColor, padding: '2px', border: '0' }}>
										{eval(`${statsType}Statistics.fta`)}
									</TableCell>
									<TableCell
										sx={{ color: tertiaryColor, padding: '2px', border: '0' }}>
										{eval(`${statsType}Statistics.ftPer`)}
									</TableCell>
									<TableCell
										sx={{ color: tertiaryColor, padding: '2px', border: '0' }}>
										{eval(`${statsType}Statistics.orb`)}
									</TableCell>
									<TableCell
										sx={{ color: tertiaryColor, padding: '2px', border: '0' }}>
										{eval(`${statsType}Statistics.drb`)}
									</TableCell>
									<TableCell
										sx={{ color: tertiaryColor, padding: '2px', border: '0' }}>
										{eval(`${statsType}Statistics.trb`)}
									</TableCell>
									<TableCell
										sx={{ color: tertiaryColor, padding: '2px', border: '0' }}>
										{eval(`${statsType}Statistics.ast`)}
									</TableCell>
									<TableCell
										sx={{ color: tertiaryColor, padding: '2px', border: '0' }}>
										{eval(`${statsType}Statistics.stl`)}
									</TableCell>
									<TableCell
										sx={{ color: tertiaryColor, padding: '2px', border: '0' }}>
										{eval(`${statsType}Statistics.blk`)}
									</TableCell>
									<TableCell
										sx={{ color: tertiaryColor, padding: '2px', border: '0' }}>
										{eval(`${statsType}Statistics.tov`)}
									</TableCell>
									<TableCell
										sx={{ color: tertiaryColor, padding: '2px', border: '0' }}>
										{eval(`${statsType}Statistics.pf`)}
									</TableCell>
									<TableCell
										sx={{ color: tertiaryColor, padding: '2px', border: '0' }}>
										{eval(`${statsType}Statistics.pts`)}
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
			</Paper>
		</Box>
	)
}

export default PlayerIndivStatsRow
