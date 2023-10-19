/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/prop-types */
import {
	Box,
	Paper,
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
import { useTheme } from '@emotion/react'

const PlayerIndivStatsRow = ({
	primaryColor,
	secondaryColor,
	tertiaryColor,
	statsType,
	statistics,
}) => {
	const theme = useTheme()
	const { league } = theme.palette
	// not an error, used in eval()
	// eslint-disable-next-line no-unused-vars
	const perGameStatistics = statistics[0]
	// eslint-disable-next-line no-unused-vars
	const totalStatistics = statistics[1]
	const advancedStatistics = statistics[2]

	const tableCellStyle = {
		color: '#FFFFFF',
		fontWeight: '300',
		padding: '2px',
		// padding: '2px 4px 2px 2px',
		border: '0',
		textAlign: 'center',
		// flex: 1,
		// minWidth: '40px',
		// maxWidth: '50px',
		width: 'fit-content',
	}

	return (
		<Box
			sx={{
				width: {
					xs: '300px',
					sm: '540px',
					md: '984px',
					lg: '1434px',
					xl: '1434px',
				},
				backgroundColor: league.nbaBackground,
				display: 'flex',
				justifyContent: 'center',
			}}>
			<Paper
				sx={{
					padding: '0.35rem 0.5rem',
					width: '100%',
					mb: 2,
					border: `2px solid ${secondaryColor}`,
					backgroundColor: league.nbaTeamIndivTableBackground,
					boxShadow: '0px 10px 10px black',
				}}>
				<TableContainer
					sx={{
						backgroundColor: league.nbaTeamIndivTableBackground,
						p: '0 8px',
						// border: '1px solid white',
					}}>
					<Table
						// sx={{ minWidth: 750 }}
						aria-labelledby='tableTitle'
						size='small'>
						<HeadCellsPlayersIndivRow
							statsType={statsType}
							headCells={
								statsType === 'advanced'
									? playersAdvancedHeadCells
									: playersPerGameHeadCells
							}
							backgroundColor={league.nbaTeamIndivTableBackground}
							fontColor={tertiaryColor}
						/>
						<TableBody>
							{statsType === 'advanced' ? (
								<TableRow>
									<TableCell
										sx={{
											color: '#FFFFFF',
											padding: '2px',
											border: '0',
											textAlign: 'left',
										}}>
										{advancedStatistics?.pos}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{advancedStatistics?.age}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{advancedStatistics?.g}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{advancedStatistics?.mp}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{advancedStatistics?.per}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{advancedStatistics?.tsPer}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{advancedStatistics?.$3pAr}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{advancedStatistics?.ftr}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{advancedStatistics?.orbPer}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{advancedStatistics?.drbPer}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{advancedStatistics?.trbPer}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{advancedStatistics?.astPer}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{advancedStatistics?.stlPer}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{advancedStatistics?.blkPer}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{advancedStatistics?.tovPer}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{advancedStatistics?.usgPer}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{advancedStatistics?.ows}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{advancedStatistics?.dws}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{advancedStatistics?.ws}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{advancedStatistics?.ws48}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{advancedStatistics?.obpm}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{advancedStatistics?.dbpm}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{advancedStatistics?.bpm}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{advancedStatistics?.worp}
									</TableCell>
								</TableRow>
							) : statsType === 'perGame' ? (
								<TableRow>
									<TableCell
										sx={{
											color: '#FFFFFF',
											padding: '2px',
											border: '0',
											textAlign: 'left',
										}}>
										{perGameStatistics.pos}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{perGameStatistics.age}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{perGameStatistics.g}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{perGameStatistics.gs}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{perGameStatistics.mp}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{perGameStatistics.fg}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{perGameStatistics.fga}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{perGameStatistics.fgPer}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{perGameStatistics.$3p}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{perGameStatistics.$3pA}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{perGameStatistics.$3pPer}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{perGameStatistics.$2p}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{perGameStatistics.$2pA}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{perGameStatistics.$2pPer}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{perGameStatistics.eFgPer}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{perGameStatistics.ft}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{perGameStatistics.fta}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{perGameStatistics.ftPer}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{perGameStatistics.orb}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{perGameStatistics.drb}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{perGameStatistics.trb}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{perGameStatistics.ast}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{perGameStatistics.stl}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{perGameStatistics.blk}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{perGameStatistics.tov}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{perGameStatistics.pf}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{perGameStatistics.pts}
									</TableCell>
								</TableRow>
							) : (
								<TableRow>
									<TableCell
										sx={{
											color: '#FFFFFF',
											padding: '2px',
											border: '0',
											textAlign: 'left',
										}}>
										{totalStatistics.pos}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{totalStatistics.age}
									</TableCell>
									<TableCell sx={tableCellStyle}>{totalStatistics.g}</TableCell>
									<TableCell sx={tableCellStyle}>
										{totalStatistics.gs}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{totalStatistics.mp}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{totalStatistics.fg}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{totalStatistics.fga}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{totalStatistics.fgPer}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{totalStatistics.$3p}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{totalStatistics.$3pA}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{totalStatistics.$3pPer}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{totalStatistics.$2p}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{totalStatistics.$2pA}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{totalStatistics.$2pPer}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{totalStatistics.eFgPer}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{totalStatistics.ft}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{totalStatistics.fta}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{totalStatistics.ftPer}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{totalStatistics.orb}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{totalStatistics.drb}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{totalStatistics.trb}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{totalStatistics.ast}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{totalStatistics.stl}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{totalStatistics.blk}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{totalStatistics.tov}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{totalStatistics.pf}
									</TableCell>
									<TableCell sx={tableCellStyle}>
										{totalStatistics.pts}
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
