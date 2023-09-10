/* eslint-disable no-unused-vars */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
	Box,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
	Paper,
	TablePagination,
} from '@mui/material'
import { useTheme } from '@emotion/react'
import HeadCellsPlayers from './HeadCellsPlayers'
import {
	playersAdvancedHeadCells,
	playersPerGameHeadCells,
} from '../../data/headCells/playersHeadCells'

export default function EnhancedTable({
	statsType,
	statistics,
	containerBackground,
	primaryColor,
	secondaryColor,
	tertiaryColor,
	includePagination,
	playersPerPage,
}) {
	// Sorting functions
	function descendingComparator(a, b, orderBy) {
		if (b[orderBy] < a[orderBy]) {
			return -1
		}
		if (b[orderBy] > a[orderBy]) {
			return 1
		}
		return 0
	}

	function getComparator(order, orderBy) {
		return order === 'desc'
			? (a, b) => descendingComparator(a, b, orderBy)
			: (a, b) => -descendingComparator(a, b, orderBy)
	}

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
	const [page, setPage] = useState(0)
	const [rowsPerPage, setRowsPerPage] = useState(playersPerPage)

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === 'asc'
		setOrder(isAsc ? 'desc' : 'asc')
		setOrderBy(property)
	}

	const handleChangePage = (event, newPage) => {
		setPage(newPage)
	}

	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - statistics.length) : 0

	// using useMemo here causes the stats table
	// not to change when the stats type changes
	const visibleRows = stableSort(
		statistics,
		getComparator(order, orderBy)
	).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

	// table cell style object
	const tableCellStyle = {
		color: tertiaryColor,
		padding: '2px',
		fontSize: '12px',
	}

	return (
		<Box
			sx={{
				// hard values to avoid resizing table
				// percentages are xs: 90% and md: 82%
				width: { xs: '540px', md: '984px', lg: '1200px', xl: '1300px' },
				backgroundColor: containerBackground || primaryColor,
			}}>
			<Paper
				sx={{
					width: '100%',
					mb: 2,
					border: `2px solid ${secondaryColor}`,
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
						<HeadCellsPlayers
							headCells={
								statsType === 'advanced'
									? playersAdvancedHeadCells
									: playersPerGameHeadCells
							}
							order={order}
							orderBy={orderBy}
							setOrderBy={setOrderBy}
							onRequestSort={handleRequestSort}
							backgroundColor={primaryColor}
							fontColor={secondaryColor}
						/>
						<TableBody>
							{statsType === 'advanced'
								? visibleRows.map((row, index) => {
										const labelId = `enhanced-table-checkbox-${index}`

										return (
											<TableRow
												hover
												tabIndex={-1}
												key={row.player}
												sx={{ cursor: 'pointer' }}>
												<TableCell sx={{ padding: '4px', width: '64px' }}>
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
														fontSize: '14px',
														width: '166px',
													}}>
													<Link to={`/stats/players/${row.id}`}>
														{row.player}
													</Link>
												</TableCell>
												<TableCell
													sx={tableCellStyle}
													align='center'>
													{row.pos}
												</TableCell>
												<TableCell
													sx={tableCellStyle}
													align='center'>
													{row.age}
												</TableCell>
												<TableCell
													sx={tableCellStyle}
													align='center'>
													{row.g}
												</TableCell>
												<TableCell
													sx={tableCellStyle}
													align='center'>
													{row.mp}
												</TableCell>
												<TableCell
													sx={tableCellStyle}
													align='center'>
													{row.per}
												</TableCell>
												<TableCell
													sx={tableCellStyle}
													align='center'>
													{row.tsPer}
												</TableCell>
												<TableCell
													sx={tableCellStyle}
													align='center'>
													{row.$3pAr}
												</TableCell>
												<TableCell
													sx={tableCellStyle}
													align='center'>
													{row.ftr}
												</TableCell>
												<TableCell
													sx={tableCellStyle}
													align='center'>
													{row.orbPer}
												</TableCell>
												<TableCell
													sx={tableCellStyle}
													align='center'>
													{row.drbPer}
												</TableCell>
												<TableCell
													sx={tableCellStyle}
													align='center'>
													{row.trbPer}
												</TableCell>
												<TableCell
													sx={tableCellStyle}
													align='center'>
													{row.astPer}
												</TableCell>
												<TableCell
													sx={tableCellStyle}
													align='center'>
													{row.stlPer}
												</TableCell>
												<TableCell
													sx={tableCellStyle}
													align='center'>
													{row.blkPer}
												</TableCell>
												<TableCell
													sx={tableCellStyle}
													align='center'>
													{row.tovPer}
												</TableCell>
												<TableCell
													sx={tableCellStyle}
													align='center'>
													{row.usgPer}
												</TableCell>
												<TableCell
													sx={tableCellStyle}
													align='center'>
													{row.ows}
												</TableCell>
												<TableCell
													sx={tableCellStyle}
													align='center'>
													{row.dws}
												</TableCell>
												<TableCell
													sx={tableCellStyle}
													align='center'>
													{row.ws}
												</TableCell>
												<TableCell
													sx={tableCellStyle}
													align='center'>
													{row.ws48}
												</TableCell>
												<TableCell
													sx={tableCellStyle}
													align='center'>
													{row.obpm}
												</TableCell>
												<TableCell
													sx={tableCellStyle}
													align='center'>
													{row.dbpm}
												</TableCell>
												<TableCell
													sx={tableCellStyle}
													align='center'>
													{row.bpm}
												</TableCell>
												<TableCell
													sx={tableCellStyle}
													align='center'>
													{row.worp}
												</TableCell>
											</TableRow>
										)
								  })
								: visibleRows.map((row, index) => {
										const labelId = `enhanced-table-checkbox-${index}`
										// const playerImgSrc = `/images/players/${row.player}.png`

										/* const determineImageSrc = () => {
											let imageSrc
											playerImgSrc == undefined
												? imageSrc ===
												  `/images/players/player-placeholder.png`
												: imageSrc === playerImgSrc
										} */

										return (
											<TableRow
												hover
												tabIndex={-1}
												key={row.player}
												sx={{ cursor: 'pointer' }}>
												<TableCell sx={{ padding: '4px', width: '64px' }}>
													<img
														src={`/images/svgs/team-logos/${row.team}.svg`}
														alt={`${row.team} logo`}
														width={40}
													/>
												</TableCell>
												<TableCell
													sx={{
														color: league.nbaWhite,
														padding: '2px',
														fontSize: '14px',
														width: '166px',
													}}
													// component='th'
													// id={labelId}
													// scope='row'
													padding='none'>
													<Link to={`/stats/players/${row.id}`}>
														{row.player}
													</Link>
												</TableCell>
												<TableCell
													align='center'
													sx={tableCellStyle}>
													{row.pos}
												</TableCell>
												<TableCell
													sx={tableCellStyle}
													align='center'>
													{row.age}
												</TableCell>
												{/* <TableCell
													sx={tableCellStyle}
													align='center'>
													{row.team.toUpperCase()}
												</TableCell> */}
												<TableCell
													sx={tableCellStyle}
													align='center'>
													{row.g}
												</TableCell>
												<TableCell
													sx={tableCellStyle}
													align='center'>
													{row.gs}
												</TableCell>
												<TableCell
													sx={tableCellStyle}
													align='center'>
													{row.mp}
												</TableCell>
												<TableCell
													sx={tableCellStyle}
													align='center'>
													{row.fg}
												</TableCell>
												<TableCell
													sx={tableCellStyle}
													align='center'>
													{row.fga}
												</TableCell>
												<TableCell
													sx={tableCellStyle}
													align='center'>
													{row.fgPer}
												</TableCell>
												<TableCell
													sx={tableCellStyle}
													align='center'>
													{row.$3p}
												</TableCell>
												<TableCell
													sx={tableCellStyle}
													align='center'>
													{row.$3pA}
												</TableCell>
												<TableCell
													sx={tableCellStyle}
													align='center'>
													{row.$3pPer}
												</TableCell>
												<TableCell
													sx={tableCellStyle}
													align='center'>
													{row.$2p}
												</TableCell>
												<TableCell
													sx={tableCellStyle}
													align='center'>
													{row.$2pA}
												</TableCell>
												<TableCell
													sx={tableCellStyle}
													align='center'>
													{row.$2pPer}
												</TableCell>
												<TableCell
													sx={tableCellStyle}
													align='center'>
													{row.eFgPer}
												</TableCell>
												<TableCell
													sx={tableCellStyle}
													align='center'>
													{row.ft}
												</TableCell>
												<TableCell
													sx={tableCellStyle}
													align='center'>
													{row.fta}
												</TableCell>
												<TableCell
													sx={tableCellStyle}
													align='center'>
													{row.ftPer}
												</TableCell>
												<TableCell
													sx={tableCellStyle}
													align='center'>
													{row.orb}
												</TableCell>
												<TableCell
													sx={tableCellStyle}
													align='center'>
													{row.drb}
												</TableCell>
												<TableCell
													sx={tableCellStyle}
													align='center'>
													{row.trb}
												</TableCell>
												<TableCell
													sx={tableCellStyle}
													align='center'>
													{row.ast}
												</TableCell>
												<TableCell
													sx={tableCellStyle}
													align='center'>
													{row.stl}
												</TableCell>
												<TableCell
													sx={tableCellStyle}
													align='center'>
													{row.blk}
												</TableCell>
												<TableCell
													sx={tableCellStyle}
													align='center'>
													{row.tov}
												</TableCell>
												<TableCell
													sx={tableCellStyle}
													align='center'>
													{row.pf}
												</TableCell>
												<TableCell
													sx={tableCellStyle}
													align='center'>
													{row.pts}
												</TableCell>
											</TableRow>
										)
								  })}
							{emptyRows > 0 && (
								<TableRow
									style={{
										height: 33 * emptyRows,
									}}>
									<TableCell colSpan={6} />
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
				{includePagination && (
					<TablePagination
						rowsPerPageOptions={[]}
						component='div'
						count={statistics.length}
						rowsPerPage={rowsPerPage}
						page={page}
						onPageChange={handleChangePage}
						sx={{ backgroundColor: primaryColor, color: tertiaryColor }}
					/>
				)}
			</Paper>
		</Box>
	)
}
