/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
	Box,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
	Paper,
} from '@mui/material'
import { useTheme } from '@emotion/react'
import fullTeamNames from '../../hooks/fullTeamNames'
import HeadCellsTeams from './HeadCellsTeams'
import {
	teamsAdvancedHeadCells,
	teamsPerGameHeadCells,
} from '../../data/headCells/teamsHeadCells'

export default function EnhancedTable({
	fTeams,
	statsType,
	statistics,
	primaryColor,
	secondaryColor,
	tertiaryColor,
}) {
	// set up sorting
	function descendingComparator(a, b, orderBy) {
		if (b[orderBy] < a[orderBy]) {
			return -1
		}
		if (b[orderBy] > a[orderBy]) {
			return 1
		}
		return 0
	}

	// decide sort asc or desc
	function getComparator(order, orderBy) {
		return order === 'desc'
			? (a, b) => descendingComparator(a, b, orderBy)
			: (a, b) => -descendingComparator(a, b, orderBy)
	}

	// sort values function
	function stableSort(array, comparator) {
		const stabilizedThis = array?.map((el, index) => [el, index])
		stabilizedThis.sort((a, b) => {
			const order = comparator(a[0], b[0])
			if (order !== 0) {
				return order
			}
			return a[1] - b[1]
		})
		return stabilizedThis.map(el => el[0])
	}
	// theme
	const theme = useTheme()
	const { league } = theme.palette

	// component state
	const [order, setOrder] = useState('asc')
	const [orderBy, setOrderBy] = useState('default')
	const page = 0
	const rowsPerPage = 30

	// set sort order onClick
	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === 'asc'
		setOrder(isAsc ? 'desc' : 'asc')
		setOrderBy(property)
	}

	statistics = useMemo(
		() =>
			stableSort(statistics, getComparator(order, orderBy)).slice(
				page * rowsPerPage,
				page * rowsPerPage + rowsPerPage
			),
		[order, orderBy, page, rowsPerPage, statistics]
	)

	// styles
	const tableCellStyles = {
		color: league.nbaWhite,
		padding: { xs: '4px 8px', md: '2px 6px' },
		borderBottom: 0,
	}

	return (
		<Box
			sx={{
				width: { xs: '90%', md: '82%' },
				backgroundColor: league.nbaBackground,
			}}>
			<Paper
				sx={{
					width: '100%',
					mb: 2,
					border: '1px solid white',
					overflow: 'hidden',
				}}>
				<TableContainer
					sx={{
						backgroundColor: primaryColor,
						p: '0 8px',
						maxHeight: 680,
					}}>
					<Table
						sx={{
							minWidth: 750,
						}}
						aria-labelledby='tableTitle'
						size='small'
						stickyHeader>
						<HeadCellsTeams
							headCells={
								statsType === 'advanced'
									? teamsAdvancedHeadCells
									: teamsPerGameHeadCells
							}
							order={order}
							orderBy={orderBy}
							setOrderBy={setOrderBy}
							onRequestSort={handleRequestSort}
							backgroundColor={primaryColor}
							secondaryColor={secondaryColor}
							tertiaryColor={tertiaryColor}
							fontColor='#B52532'
						/>
						<TableBody>
							{statsType === 'advanced'
								? statistics.map((row, index) => {
										const labelId = `enhanced-table-checkbox-${index}`
										if (fTeams.includes(row.team)) {
											return (
												<TableRow
													hover
													tabIndex={-1}
													key={row.team}
													sx={{ cursor: 'pointer' }}>
													<TableCell sx={{ padding: '4px', borderBottom: 0 }}>
														<img
															src={`/images/svgs/team-logos/${row.team}.svg`}
															alt={`${row.team} logo`}
															width={30}
														/>
													</TableCell>
													<TableCell
														sx={{
															color: league.nbaWhite,
															padding: '2px',
															fontSize: '16px',
															fontWeight: 700,
															borderBottom: 0,
														}}
														component='th'
														id={labelId}
														scope='row'>
														{fullTeamNames(row.team)}
													</TableCell>
													<TableCell
														sx={tableCellStyles}
														align='right'>
														{row.age}
													</TableCell>
													<TableCell
														sx={tableCellStyles}
														align='right'>
														{row.w}
													</TableCell>
													<TableCell
														sx={tableCellStyles}
														align='right'>
														{row.l}
													</TableCell>
													<TableCell
														sx={tableCellStyles}
														align='right'>
														{row.pw}
													</TableCell>
													<TableCell
														sx={tableCellStyles}
														align='right'>
														{row.pl}
													</TableCell>
													<TableCell
														sx={tableCellStyles}
														align='right'>
														{row.mov}
													</TableCell>
													<TableCell
														sx={tableCellStyles}
														align='right'>
														{row.sos}
													</TableCell>
													<TableCell
														sx={tableCellStyles}
														align='right'>
														{row.srs}
													</TableCell>
													<TableCell
														sx={tableCellStyles}
														align='right'>
														{row.ortg}
													</TableCell>
													<TableCell
														sx={tableCellStyles}
														align='right'>
														{row.drtg}
													</TableCell>
													<TableCell
														sx={tableCellStyles}
														align='right'>
														{row.nrtg}
													</TableCell>
													<TableCell
														sx={tableCellStyles}
														align='right'>
														{row.pace}
													</TableCell>
													<TableCell
														sx={tableCellStyles}
														align='right'>
														{row.ftr}
													</TableCell>
													<TableCell
														sx={tableCellStyles}
														align='right'>
														{row.$3par}
													</TableCell>
													<TableCell
														sx={{
															color: league.nbaWhite,
															padding: '2px',
															borderBottom: 0,
														}}
														align='right'>
														{row.tsPer}
													</TableCell>
													<TableCell
														sx={tableCellStyles}
														align='right'>
														{row.offeFGPer}
													</TableCell>
													<TableCell
														sx={tableCellStyles}
														align='right'>
														{row.offtovPer}
													</TableCell>
													<TableCell
														sx={tableCellStyles}
														align='right'>
														{row.offorbPer}
													</TableCell>
													<TableCell
														sx={tableCellStyles}
														align='right'>
														{row.offftFGA}
													</TableCell>
													<TableCell
														sx={tableCellStyles}
														align='right'>
														{row.dffeFGPer}
													</TableCell>
													<TableCell
														sx={tableCellStyles}
														align='right'>
														{row.dfftovPer}
													</TableCell>
													<TableCell
														sx={tableCellStyles}
														align='right'>
														{row.dffdrbPer}
													</TableCell>
													<TableCell
														sx={{
															color: league.nbaWhite,
															padding: '2px 4px 2px 2px',
															borderBottom: 0,
														}}
														align='right'>
														{row.dffftFGA}
													</TableCell>
												</TableRow>
											)
										} else return null
								  })
								: statistics.map((row, index) => {
										const labelId = `enhanced-table-checkbox-${index}`
										if (fTeams.includes(row.team)) {
											return (
												<TableRow
													hover
													tabIndex={-1}
													key={row.team}
													sx={{ cursor: 'pointer' }}>
													<TableCell sx={{ padding: '4px', borderBottom: 0 }}>
														<img
															src={`/images/svgs/team-logos/${row.team}.svg`}
															alt={`${row.team} logo`}
															width={30}
														/>
													</TableCell>
													<TableCell
														sx={{
															color: league.nbaWhite,
															padding: '2px',
															fontSize: '16px',
															fontWeight: 700,
															borderBottom: 0,
														}}
														component='th'
														id={labelId}
														scope='row'
														padding='none'>
														<Link to={`/stats/teams/${row.team}`}>
															{fullTeamNames(row.team)}
														</Link>
													</TableCell>
													<TableCell
														sx={tableCellStyles}
														align='right'>
														{row.g}
													</TableCell>
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
														sx={{
															color: league.nbaWhite,
															padding: '2px',
															borderBottom: 0,
														}}
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
														sx={{
															color: league.nbaWhite,
															padding: '2px',
															borderBottom: 0,
														}}
														align='right'>
														{row.pts}
													</TableCell>
												</TableRow>
											)
										} else return null
								  })}
						</TableBody>
					</Table>
				</TableContainer>
			</Paper>
		</Box>
	)
}
