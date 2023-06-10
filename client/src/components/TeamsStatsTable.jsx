/* eslint-disable react/prop-types */
import * as React from 'react'
import PropTypes from 'prop-types'
import { alpha } from '@mui/material/styles'
import {
	Box,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
	TableSortLabel,
	Toolbar,
	Typography,
	Paper,
	Checkbox,
	IconButton,
	Tooltip,
	FormControlLabel,
	Switch,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import FilterListIcon from '@mui/icons-material/FilterList'
import { visuallyHidden } from '@mui/utils'
import { useTheme } from '@emotion/react'
import fullTeamNames from '../hooks/fullTeamNames'

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
	const stabilizedThis = array.map((el, index) => [el, index])
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0])
		if (order !== 0) {
			return order
		}
		return a[1] - b[1]
	})
	return stabilizedThis.map(el => el[0])
}

const headCells = [
	{
		id: 'team',
		numeric: false,
		disablePadding: true,
		label: 'Team',
	},
	{
		id: 'g',
		numeric: true,
		disablePadding: false,
		label: 'GP',
	},
	{
		id: 'mp',
		numeric: true,
		disablePadding: false,
		label: 'MP',
	},
	{
		id: 'fg',
		numeric: true,
		disablePadding: false,
		label: 'FG',
	},
	{
		id: 'fga',
		numeric: true,
		disablePadding: false,
		label: 'FGA',
	},
	{
		id: 'fgPer',
		numeric: true,
		disablePadding: false,
		label: 'FG%',
	},
	{
		id: '$3p',
		numeric: true,
		disablePadding: false,
		label: '3P',
	},
	{
		id: '$3pA',
		numeric: true,
		disablePadding: false,
		label: '3PA',
	},
	{
		id: '$3pPer',
		numeric: true,
		disablePadding: false,
		label: '3P%',
	},
	{
		id: '$2p',
		numeric: true,
		disablePadding: false,
		label: '2P',
	},
	{
		id: '$3pA',
		numeric: true,
		disablePadding: false,
		label: '3PA',
	},
	{
		id: '$2pPer',
		numeric: true,
		disablePadding: false,
		label: '2P%',
	},
	{
		id: 'ft',
		numeric: true,
		disablePadding: false,
		label: 'FT',
	},
	{
		id: 'fta',
		numeric: true,
		disablePadding: false,
		label: 'FTA',
	},
	{
		id: 'ftPer',
		numeric: true,
		disablePadding: false,
		label: 'FT%',
	},
	{
		id: 'orb',
		numeric: true,
		disablePadding: false,
		label: 'ORB',
	},
	{
		id: 'drb',
		numeric: true,
		disablePadding: false,
		label: 'DRB',
	},
	{
		id: 'trb',
		numeric: true,
		disablePadding: false,
		label: 'TRB',
	},
	{
		id: 'ast',
		numeric: true,
		disablePadding: false,
		label: 'AST',
	},
	{
		id: 'stl',
		numeric: true,
		disablePadding: false,
		label: 'STL',
	},
	{
		id: 'blk',
		numeric: true,
		disablePadding: false,
		label: 'BLK',
	},
	{
		id: 'tov',
		numeric: true,
		disablePadding: false,
		label: 'TOV',
	},
	{
		id: 'pf',
		numeric: true,
		disablePadding: false,
		label: 'PF',
	},
	{
		id: 'pts',
		numeric: true,
		disablePadding: false,
		label: 'PTS',
	},
]

function EnhancedTableHead(props) {
	const {
		onSelectAllClick,
		order,
		orderBy,
		numSelected,
		rowCount,
		onRequestSort,
	} = props
	const createSortHandler = property => event => {
		onRequestSort(event, property)
	}

	return (
		<TableHead>
			<TableRow>
				<TableCell padding='checkbox'>
					<Checkbox
						sx={{ color: '#FFF' }}
						indeterminate={numSelected > 0 && numSelected < rowCount}
						checked={rowCount > 0 && numSelected === rowCount}
						onChange={onSelectAllClick}
						inputProps={{
							'aria-label': 'select all desserts',
						}}
					/>
				</TableCell>
				{headCells.map(headCell => (
					<TableCell
						key={headCell.id}
						align={headCell.numeric ? 'right' : 'left'}
						padding={headCell.disablePadding ? 'none' : 'normal'}
						sortDirection={orderBy === headCell.id ? order : false}
						sx={{ color: '#B52532', p: '2px' }}>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={orderBy === headCell.id ? order : 'asc'}
							hideSortIcon
							onClick={createSortHandler(headCell.id)}
							sx={{ width: '100%' }}>
							{headCell.label}
							{orderBy === headCell.id ? (
								<Box
									component='span'
									sx={visuallyHidden}>
									{order === 'desc' ? 'sorted descending' : 'sorted ascending'}
								</Box>
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	)
}

EnhancedTableHead.propTypes = {
	numSelected: PropTypes.number.isRequired,
	onRequestSort: PropTypes.func.isRequired,
	onSelectAllClick: PropTypes.func.isRequired,
	order: PropTypes.oneOf(['asc', 'desc']).isRequired,
	orderBy: PropTypes.string.isRequired,
	rowCount: PropTypes.number.isRequired,
}

export default function EnhancedTable({ teamsPerGameStatistics }) {
	const theme = useTheme()
	const { league } = theme.palette

	const [order, setOrder] = React.useState('asc')
	const [orderBy, setOrderBy] = React.useState('calories')
	const [selected, setSelected] = React.useState([])
	const [page, setPage] = React.useState(0)
	const [dense, setDense] = React.useState(false)
	const [rowsPerPage, setRowsPerPage] = React.useState(30)

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === 'asc'
		setOrder(isAsc ? 'desc' : 'asc')
		setOrderBy(property)
	}

	const handleSelectAllClick = event => {
		if (event.target.checked) {
			const newSelected = teamsPerGameStatistics.map(n => n.team)
			setSelected(newSelected)
			return
		}
		setSelected([])
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

	const handleChangePage = (event, newPage) => {
		setPage(newPage)
	}

	const handleChangeRowsPerPage = event => {
		setRowsPerPage(parseInt(event.target.value, 10))
		setPage(0)
	}

	const handleChangeDense = event => {
		setDense(event.target.checked)
	}

	const isSelected = team => selected.indexOf(team) !== -1

	// Avoid a layout jump when reaching the last page with empty rows.
	/* const emptyRows =
		page > 0
			? Math.max(0, (1 + page) * rowsPerPage - teamsPerGameStatistics.length)
			: 0 */

	teamsPerGameStatistics = React.useMemo(
		() =>
			stableSort(teamsPerGameStatistics, getComparator(order, orderBy)).slice(
				page * rowsPerPage,
				page * rowsPerPage + rowsPerPage
			),
		[order, orderBy, page, rowsPerPage, teamsPerGameStatistics]
	)

	return (
		<Box
			sx={{
				width: '91%',
				backgroundColor: league.nbaBackground,
				margin: '0',
				padding: '0',
			}}>
			<Paper sx={{ width: '100%', mb: 2, border: '1px solid white' }}>
				<TableContainer
					sx={{
						backgroundColor: league.nbaBackground,
					}}>
					<Table
						sx={{ minWidth: 750 }}
						aria-labelledby='tableTitle'
						size={dense ? 'small' : 'small'}>
						<EnhancedTableHead
							numSelected={selected.length}
							order={order}
							orderBy={orderBy}
							onSelectAllClick={handleSelectAllClick}
							onRequestSort={handleRequestSort}
							rowCount={teamsPerGameStatistics.length}
						/>
						<TableBody>
							{teamsPerGameStatistics.map((row, index) => {
								const isItemSelected = isSelected(row.team)
								const labelId = `enhanced-table-checkbox-${index}`

								return (
									<TableRow
										hover
										onClick={event => handleClick(event, row.team)}
										// role='checkbox'
										aria-checked={isItemSelected}
										tabIndex={-1}
										key={row.team}
										selected={isItemSelected}
										sx={{ cursor: 'pointer' }}>
										<TableCell sx={{ padding: '8px' }}>
											<img
												src={`../../public/images/svgs/team-logos/${row.team}.svg`}
												alt={`${row.team} logo`}
											/>
										</TableCell>
										<TableCell
											sx={{ color: league.nbaWhite, padding: '2px' }}
											component='th'
											id={labelId}
											scope='row'
											padding='none'>
											{fullTeamNames(row.team)}
										</TableCell>
										<TableCell
											sx={{ color: league.nbaWhite, padding: '2px' }}
											align='right'>
											{row.g}
										</TableCell>
										<TableCell
											sx={{ color: league.nbaWhite, padding: '2px' }}
											align='right'>
											{row.mp}
										</TableCell>
										<TableCell
											sx={{ color: league.nbaWhite, padding: '2px' }}
											align='right'>
											{row.fg}
										</TableCell>
										<TableCell
											sx={{ color: league.nbaWhite, padding: '2px' }}
											align='right'>
											{row.fga}
										</TableCell>
										<TableCell
											sx={{ color: league.nbaWhite, padding: '2px' }}
											align='right'>
											{row.fgPer}
										</TableCell>
										<TableCell
											sx={{ color: league.nbaWhite, padding: '2px' }}
											align='right'>
											{row.$3p}
										</TableCell>
										<TableCell
											sx={{ color: league.nbaWhite, padding: '2px' }}
											align='right'>
											{row.$3pA}
										</TableCell>
										<TableCell
											sx={{ color: league.nbaWhite, padding: '2px' }}
											align='right'>
											{row.$3pPer}
										</TableCell>
										<TableCell
											sx={{ color: league.nbaWhite, padding: '2px' }}
											align='right'>
											{row.$2p}
										</TableCell>
										<TableCell
											sx={{ color: league.nbaWhite, padding: '2px' }}
											align='right'>
											{row.$2pA}
										</TableCell>
										<TableCell
											sx={{ color: league.nbaWhite, padding: '2px' }}
											align='right'>
											{row.$2pPer}
										</TableCell>
										<TableCell
											sx={{ color: league.nbaWhite, padding: '2px' }}
											align='right'>
											{row.ft}
										</TableCell>
										<TableCell
											sx={{ color: league.nbaWhite, padding: '2px' }}
											align='right'>
											{row.fta}
										</TableCell>
										<TableCell
											sx={{ color: league.nbaWhite, padding: '2px' }}
											align='right'>
											{row.ftPer}
										</TableCell>
										<TableCell
											sx={{
												color: league.nbaWhite,
												padding: '2px',
											}}
											align='right'>
											{row.orb}
										</TableCell>
										<TableCell
											sx={{ color: league.nbaWhite, padding: '2px' }}
											align='right'>
											{row.drb}
										</TableCell>
										<TableCell
											sx={{ color: league.nbaWhite, padding: '2px' }}
											align='right'>
											{row.trb}
										</TableCell>
										<TableCell
											sx={{ color: league.nbaWhite, padding: '2px' }}
											align='right'>
											{row.ast}
										</TableCell>
										<TableCell
											sx={{ color: league.nbaWhite, padding: '2px' }}
											align='right'>
											{row.stl}
										</TableCell>
										<TableCell
											sx={{ color: league.nbaWhite, padding: '2px' }}
											align='right'>
											{row.blk}
										</TableCell>
										<TableCell
											sx={{ color: league.nbaWhite, padding: '2px' }}
											align='right'>
											{row.tov}
										</TableCell>
										<TableCell
											sx={{ color: league.nbaWhite, padding: '2px' }}
											align='right'>
											{row.pf}
										</TableCell>
										<TableCell
											sx={{
												color: league.nbaWhite,
												padding: '2px 4px 2px 2px',
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
				<TablePagination
					rowsPerPageOptions={[5, 10, 25]}
					component='div'
					count={teamsPerGameStatistics.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Paper>
			<FormControlLabel
				control={
					<Switch
						checked={dense}
						onChange={handleChangeDense}
					/>
				}
				label='Dense padding'
			/>
		</Box>
	)
}
