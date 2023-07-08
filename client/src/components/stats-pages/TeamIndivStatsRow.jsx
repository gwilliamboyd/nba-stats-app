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
	teamsPerGameHeadCells,
	teamsAdvancedHeadCells,
} from '../../data/headCells/teamsHeadCellsIndivRow'
import HeadCellsTeamsIndivRow from '../tables/HeadCellsTeamsIndivRow'

const TeamIndivStatsRow = ({
	primaryColor,
	secondaryColor,
	tertiaryColor,
	statsType,
	loading,
	statistics,
}) => {
	const tableCellStyles = {
		color: tertiaryColor,
		padding: '2px 6px',
		border: '0',
		fontSize: '18px',
	}

	const tableCellStylesAdv = {
		color: tertiaryColor,
		padding: '2px',
		border: '0',
	}

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
								? statistics?.map(row => {
										return (
											<TableRow key={row.team}>
												{loading ? (
													<Skeleton variant='rectangular' />
												) : (
													<>
														<TableCell
															sx={tableCellStylesAdv}
															align='right'>
															{row.age}
														</TableCell>
														<TableCell
															sx={tableCellStylesAdv}
															align='right'>
															{row.w}
														</TableCell>
														<TableCell
															sx={tableCellStylesAdv}
															align='right'>
															{row.l}
														</TableCell>
														<TableCell
															sx={tableCellStylesAdv}
															align='right'>
															{row.pw}
														</TableCell>
														<TableCell
															sx={tableCellStylesAdv}
															align='right'>
															{row.pl}
														</TableCell>
														<TableCell
															sx={tableCellStylesAdv}
															align='right'>
															{row.mov}
														</TableCell>
														<TableCell
															sx={tableCellStylesAdv}
															align='right'>
															{row.sos}
														</TableCell>
														<TableCell
															sx={tableCellStylesAdv}
															align='right'>
															{row.srs}
														</TableCell>
														<TableCell
															sx={tableCellStylesAdv}
															align='right'>
															{row.ortg}
														</TableCell>
														<TableCell
															sx={tableCellStylesAdv}
															align='right'>
															{row.drtg}
														</TableCell>
														<TableCell
															sx={tableCellStylesAdv}
															align='right'>
															{row.nrtg}
														</TableCell>
														<TableCell
															sx={tableCellStylesAdv}
															align='right'>
															{row.pace}
														</TableCell>
														<TableCell
															sx={tableCellStylesAdv}
															align='right'>
															{row.ftr}
														</TableCell>
														<TableCell
															sx={tableCellStylesAdv}
															align='right'>
															{row.$3par}
														</TableCell>
														<TableCell
															sx={tableCellStylesAdv}
															align='right'>
															{row.tsPer}
														</TableCell>
														<TableCell
															sx={tableCellStylesAdv}
															align='right'>
															{row.offeFGPer}
														</TableCell>
														<TableCell
															sx={tableCellStylesAdv}
															align='right'>
															{row.offtovPer}
														</TableCell>
														<TableCell
															sx={tableCellStylesAdv}
															align='right'>
															{row.offorbPer}
														</TableCell>
														<TableCell
															sx={tableCellStylesAdv}
															align='right'>
															{row.offftFGA}
														</TableCell>
														<TableCell
															sx={tableCellStylesAdv}
															align='right'>
															{row.dffeFGPer}
														</TableCell>
														<TableCell
															sx={tableCellStylesAdv}
															align='right'>
															{row.dfftovPer}
														</TableCell>
														<TableCell
															sx={tableCellStylesAdv}
															align='right'>
															{row.dffdrbPer}
														</TableCell>
														<TableCell
															sx={{
																color: tertiaryColor,
																padding: '2px 4px 2px 2px',
																border: '0',
															}}
															align='right'>
															{row.dffftFGA}
														</TableCell>
													</>
												)}
											</TableRow>
										)
								  })
								: statistics?.map(row => {
										return (
											<TableRow key={row.team}>
												{loading ? (
													<Skeleton variant='rectangular' />
												) : (
													<>
														<TableCell
															sx={tableCellStyles}
															align='right'>
															{row.mp}
														</TableCell>
														<TableCell
															sx={tableCellStyles}
															align='right'>
															{row.fg}
														</TableCell>
														<TableCell
															sx={tableCellStyles}
															align='right'>
															{row.fga}
														</TableCell>
														<TableCell
															sx={tableCellStyles}
															align='right'>
															{row.fgPer}
														</TableCell>
														<TableCell
															sx={tableCellStyles}
															align='right'>
															{row.$3p}
														</TableCell>
														<TableCell
															sx={tableCellStyles}
															align='right'>
															{row.$3pA}
														</TableCell>
														<TableCell
															sx={tableCellStyles}
															align='right'>
															{row.$3pPer}
														</TableCell>
														<TableCell
															sx={tableCellStyles}
															align='right'>
															{row.$2p}
														</TableCell>
														<TableCell
															sx={tableCellStyles}
															align='right'>
															{row.$2pA}
														</TableCell>
														<TableCell
															sx={tableCellStyles}
															align='right'>
															{row.$2pPer}
														</TableCell>
														<TableCell
															sx={tableCellStyles}
															align='right'>
															{row.ft}
														</TableCell>
														<TableCell
															sx={tableCellStyles}
															align='right'>
															{row.fta}
														</TableCell>
														<TableCell
															sx={tableCellStyles}
															align='right'>
															{row.ftPer}
														</TableCell>
														<TableCell
															sx={tableCellStyles}
															align='right'>
															{row.orb}
														</TableCell>
														<TableCell
															sx={tableCellStyles}
															align='right'>
															{row.drb}
														</TableCell>
														<TableCell
															sx={tableCellStyles}
															align='right'>
															{row.trb}
														</TableCell>
														<TableCell
															sx={tableCellStyles}
															align='right'>
															{row.ast}
														</TableCell>
														<TableCell
															sx={tableCellStyles}
															align='right'>
															{row.stl}
														</TableCell>
														<TableCell
															sx={tableCellStyles}
															align='right'>
															{row.blk}
														</TableCell>
														<TableCell
															sx={tableCellStyles}
															align='right'>
															{row.tov}
														</TableCell>
														<TableCell
															sx={tableCellStyles}
															align='right'>
															{row.pf}
														</TableCell>
														<TableCell
															sx={tableCellStyles}
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
