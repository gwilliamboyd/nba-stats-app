/* eslint-disable react/prop-types */
import PropTypes from 'prop-types'
import {
	Box,
	Checkbox,
	TableCell,
	TableHead,
	TableRow,
	TableSortLabel,
} from '@mui/material'
import { visuallyHidden } from '@mui/utils'

const HeadCellsTeams = ({
	onSelectAllClick,
	order,
	orderBy,
	numSelected,
	rowCount,
	onRequestSort,
	headCells,
}) => {
	/* const headCells = [
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
	] */

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

HeadCellsTeams.propTypes = {
	numSelected: PropTypes.number.isRequired,
	onRequestSort: PropTypes.func.isRequired,
	onSelectAllClick: PropTypes.func.isRequired,
	order: PropTypes.oneOf(['asc', 'desc']).isRequired,
	orderBy: PropTypes.string.isRequired,
	rowCount: PropTypes.number.isRequired,
}

export default HeadCellsTeams
