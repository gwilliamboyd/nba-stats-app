/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React from 'react'
import { Link } from 'react-router-dom'
import {
	Box,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
	Paper,
	Skeleton,
} from '@mui/material'
import { useTheme } from '@emotion/react'
import fullTeamNames from '../../hooks/fullTeamNames'
import HeadCellsStandings from './HeadCellsStandings'
import { standingsHeadCells } from '../../data/headCells/standingsHeadCells'

export default function EnhancedTable({
	loading,
	statistics,
	// primaryColor,
	// secondaryColor,
	// tertiaryColor,
}) {
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
	const theme = useTheme()
	const { league } = theme.palette

	const [order, setOrder] = React.useState('asc')
	const [orderBy, setOrderBy] = React.useState('calories')
	const [selected, setSelected] = React.useState([])
	const [page, setPage] = React.useState(0)
	const [rowsPerPage, setRowsPerPage] = React.useState(30)

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === 'asc'
		setOrder(isAsc ? 'desc' : 'asc')
		setOrderBy(property)
	}

	const handleClick = (event, team) => {
		const selectedIndex = selected.indexOf(team)
		let newSelected = []

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, team)
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1))
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1))
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1)
			)
		}

		setSelected(newSelected)
	}

	const isSelected = team => selected.indexOf(team) !== -1

	statistics = React.useMemo(
		() =>
			stableSort(statistics, getComparator(order, orderBy)).slice(
				page * rowsPerPage,
				page * rowsPerPage + rowsPerPage
			),
		[order, orderBy, page, rowsPerPage, statistics]
	)

	const tableCellStyle = {
		color: league.nbaWhite,
		padding: '2px',
	}

	return (
		<Box
			sx={{
				width: '90%',
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
						backgroundColor: '#18264a',
						p: '0 8px',
						// minHeight: 650,
						// maxHeight: 670,
						height: 670,
					}}>
					<Table
						aria-labelledby='tableTitle'
						size='small'
						stickyHeader>
						<HeadCellsStandings
							headCells={standingsHeadCells}
							order={order}
							orderBy={orderBy}
							onRequestSort={handleRequestSort}
							backgroundColor='#18264a'
							fontColor='#B52532'
						/>
						<TableBody>
							{statistics.map((row, index) => {
								const isItemSelected = isSelected(row.team)
								const labelId = `enhanced-table-checkbox-${index}`

								return (
									<TableRow
										hover
										onClick={event => handleClick(event, row.team)}
										aria-checked={isItemSelected}
										tabIndex={-1}
										key={row.team}
										selected={isItemSelected}
										sx={{ cursor: 'pointer' }}>
										{loading ? (
											<Skeleton variant='rectangular' />
										) : (
											<TableCell sx={{ padding: '4px' }}>
												<img
													src={`../../public/images/svgs/team-logos/${row.team}.svg`}
													alt={`${row.team} logo`}
													width={28}
												/>
											</TableCell>
										)}
										<TableCell
											sx={{
												color: league.nbaWhite,
												padding: '2px',
												fontSize: '16px',
											}}
											component='th'
											id={labelId}
											scope='row'
											padding='none'>
											{fullTeamNames(row.team)}
										</TableCell>
										<TableCell
											sx={tableCellStyle}
											align='right'>
											{row.w}
										</TableCell>
										<TableCell
											sx={tableCellStyle}
											align='right'>
											{row.l}
										</TableCell>
										<TableCell
											sx={tableCellStyle}
											align='right'>
											{(row.w / 82).toFixed(3)}
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