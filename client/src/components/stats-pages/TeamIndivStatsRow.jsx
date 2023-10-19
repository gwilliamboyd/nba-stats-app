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
import { useTheme } from '@emotion/react'

const TeamIndivStatsRow = ({
	primaryColor,
	secondaryColor,
	tertiaryColor,
	statsType,
	loading,
	statistics,
}) => {
	const theme = useTheme()
	const { league } = theme.palette

	const tableCellStyles = {
		color: tertiaryColor,
		padding: '2px 6px',
		border: '0',
		fontSize: '14px',
	}

	const tableCellStylesAdv = {
		color: tertiaryColor,
		padding: '2px',
		border: '0',
		fontSize: '14px',
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
				backgroundColor: primaryColor,
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
															align='center'>
															{row.age}
														</TableCell>
														<TableCell
															sx={tableCellStylesAdv}
															align='center'>
															{row.w}
														</TableCell>
														<TableCell
															sx={tableCellStylesAdv}
															align='center'>
															{row.l}
														</TableCell>
														<TableCell
															sx={tableCellStylesAdv}
															align='center'>
															{row.pw}
														</TableCell>
														<TableCell
															sx={tableCellStylesAdv}
															align='center'>
															{row.pl}
														</TableCell>
														<TableCell
															sx={tableCellStylesAdv}
															align='center'>
															{row.mov}
														</TableCell>
														<TableCell
															sx={tableCellStylesAdv}
															align='center'>
															{row.sos}
														</TableCell>
														<TableCell
															sx={tableCellStylesAdv}
															align='center'>
															{row.srs}
														</TableCell>
														<TableCell
															sx={tableCellStylesAdv}
															align='center'>
															{row.ortg}
														</TableCell>
														<TableCell
															sx={tableCellStylesAdv}
															align='center'>
															{row.drtg}
														</TableCell>
														<TableCell
															sx={tableCellStylesAdv}
															align='center'>
															{row.nrtg}
														</TableCell>
														<TableCell
															sx={tableCellStylesAdv}
															align='center'>
															{row.pace}
														</TableCell>
														<TableCell
															sx={tableCellStylesAdv}
															align='center'>
															{row.ftr}
														</TableCell>
														<TableCell
															sx={tableCellStylesAdv}
															align='center'>
															{row.$3par}
														</TableCell>
														<TableCell
															sx={tableCellStylesAdv}
															align='center'>
															{row.tsPer}
														</TableCell>
														<TableCell
															sx={tableCellStylesAdv}
															align='center'>
															{row.offeFGPer}
														</TableCell>
														<TableCell
															sx={tableCellStylesAdv}
															align='center'>
															{row.offtovPer}
														</TableCell>
														<TableCell
															sx={tableCellStylesAdv}
															align='center'>
															{row.offorbPer}
														</TableCell>
														<TableCell
															sx={tableCellStylesAdv}
															align='center'>
															{row.offftFGA}
														</TableCell>
														<TableCell
															sx={tableCellStylesAdv}
															align='center'>
															{row.dffeFGPer}
														</TableCell>
														<TableCell
															sx={tableCellStylesAdv}
															align='center'>
															{row.dfftovPer}
														</TableCell>
														<TableCell
															sx={tableCellStylesAdv}
															align='center'>
															{row.dffdrbPer}
														</TableCell>
														<TableCell
															sx={{
																color: tertiaryColor,
																padding: '2px 4px 2px 2px',
																border: '0',
															}}
															align='center'>
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
															align='center'>
															{row.mp}
														</TableCell>
														<TableCell
															sx={tableCellStyles}
															align='center'>
															{row.fg}
														</TableCell>
														<TableCell
															sx={tableCellStyles}
															align='center'>
															{row.fga}
														</TableCell>
														<TableCell
															sx={tableCellStyles}
															align='center'>
															{row.fgPer}
														</TableCell>
														<TableCell
															sx={tableCellStyles}
															align='center'>
															{row.$3p}
														</TableCell>
														<TableCell
															sx={tableCellStyles}
															align='center'>
															{row.$3pA}
														</TableCell>
														<TableCell
															sx={tableCellStyles}
															align='center'>
															{row.$3pPer}
														</TableCell>
														<TableCell
															sx={tableCellStyles}
															align='center'>
															{row.$2p}
														</TableCell>
														<TableCell
															sx={tableCellStyles}
															align='center'>
															{row.$2pA}
														</TableCell>
														<TableCell
															sx={tableCellStyles}
															align='center'>
															{row.$2pPer}
														</TableCell>
														<TableCell
															sx={tableCellStyles}
															align='center'>
															{row.ft}
														</TableCell>
														<TableCell
															sx={tableCellStyles}
															align='center'>
															{row.fta}
														</TableCell>
														<TableCell
															sx={tableCellStyles}
															align='center'>
															{row.ftPer}
														</TableCell>
														<TableCell
															sx={tableCellStyles}
															align='center'>
															{row.orb}
														</TableCell>
														<TableCell
															sx={tableCellStyles}
															align='center'>
															{row.drb}
														</TableCell>
														<TableCell
															sx={tableCellStyles}
															align='center'>
															{row.trb}
														</TableCell>
														<TableCell
															sx={tableCellStyles}
															align='center'>
															{row.ast}
														</TableCell>
														<TableCell
															sx={tableCellStyles}
															align='center'>
															{row.stl}
														</TableCell>
														<TableCell
															sx={tableCellStyles}
															align='center'>
															{row.blk}
														</TableCell>
														<TableCell
															sx={tableCellStyles}
															align='center'>
															{row.tov}
														</TableCell>
														<TableCell
															sx={tableCellStyles}
															align='center'>
															{row.pf}
														</TableCell>
														<TableCell
															sx={tableCellStyles}
															align='center'>
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
