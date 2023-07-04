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
	const page = 0
	const rowsPerPage = 30

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === 'asc'
		setOrder(isAsc ? 'desc' : 'asc')
		setOrderBy(property)
	}

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
								const labelId = `enhanced-table-checkbox-${index}`

								return (
									<TableRow
										hover
										tabIndex={-1}
										key={row.team}
										sx={{ cursor: 'pointer' }}>
										{loading ? (
											<Skeleton variant='rectangular' />
										) : (
											<TableCell sx={{ padding: '4px' }}>
												<img
													src={`/images/svgs/team-logos/${row.team}.svg`}
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
											<Link to={`/stats/teams/${row.team}`}>
												{fullTeamNames(row.team)}
											</Link>
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
											{row.wPer.toFixed(3)}
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
