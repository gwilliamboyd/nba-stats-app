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
} from '@mui/material'
import {
	playersPerGameHeadCells,
	playersAdvancedHeadCells,
} from '../../data/headCells/playersHeadCellsIndivRow'
// import HeadCellsPlayers from '../tables/HeadCellsPlayers'
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
	// not an error, used in eval()
	// eslint-disable-next-line no-unused-vars
	const perGameStatistics = statistics[0]
	// eslint-disable-next-line no-unused-vars
	const totalStatistics = statistics[1]
	const advancedStatistics = statistics[2]

	const tableCellStyle = { color: tertiaryColor, padding: '2px', border: '0' }

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
									<TableCell sx={tableCellStyle}>
										{advancedStatistics.pos}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{advancedStatistics.age}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{advancedStatistics.g}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{advancedStatistics.mp}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{advancedStatistics.per}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{advancedStatistics.tsPer}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{advancedStatistics.$3pAr}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{advancedStatistics.ftr}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{advancedStatistics.orbPer}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{advancedStatistics.drbPer}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{advancedStatistics.trbPer}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{advancedStatistics.astPer}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{advancedStatistics.stlPer}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{advancedStatistics.blkPer}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{advancedStatistics.tovPer}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{advancedStatistics.usgPer}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{advancedStatistics.ows}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{advancedStatistics.dws}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{advancedStatistics.ws}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{advancedStatistics.ws48}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{advancedStatistics.obpm}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{advancedStatistics.dbpm}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{advancedStatistics.bpm}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{advancedStatistics.worp}
									</TableCell>
								</TableRow>
							) : (
								<TableRow>
									<TableCell sx={tableCellStyle}>
										{eval(`${statsType}Statistics.pos`)}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{eval(`${statsType}Statistics.age`)}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{eval(`${statsType}Statistics.g`)}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{eval(`${statsType}Statistics.gs`)}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{eval(`${statsType}Statistics.mp`)}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{eval(`${statsType}Statistics.fg`)}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{eval(`${statsType}Statistics.fga`)}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{eval(`${statsType}Statistics.fgPer`)}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{eval(`${statsType}Statistics.$3p`)}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{eval(`${statsType}Statistics.$3pA`)}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{eval(`${statsType}Statistics.$3pPer`)}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{eval(`${statsType}Statistics.$2p`)}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{eval(`${statsType}Statistics.$2pA`)}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{eval(`${statsType}Statistics.$2pPer`)}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{eval(`${statsType}Statistics.eFgPer`)}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{eval(`${statsType}Statistics.ft`)}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{eval(`${statsType}Statistics.fta`)}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{eval(`${statsType}Statistics.ftPer`)}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{eval(`${statsType}Statistics.orb`)}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{eval(`${statsType}Statistics.drb`)}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{eval(`${statsType}Statistics.trb`)}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{eval(`${statsType}Statistics.ast`)}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{eval(`${statsType}Statistics.stl`)}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{eval(`${statsType}Statistics.blk`)}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{eval(`${statsType}Statistics.tov`)}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{eval(`${statsType}Statistics.pf`)}
									</TableCell>
									<TableCell sx={tableCellStyle}>
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
