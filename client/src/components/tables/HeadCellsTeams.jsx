/* eslint-disable react/prop-types */
// import PropTypes from 'prop-types'
import {
	Box,
	TableCell,
	TableHead,
	TableRow,
	TableSortLabel,
} from '@mui/material'
import { visuallyHidden } from '@mui/utils'
import { useTheme } from '@emotion/react'

const HeadCellsTeams = ({
	order,
	orderBy,
	onRequestSort,
	headCells,
	fontColor,
}) => {
	const createSortHandler = property => event => {
		onRequestSort(event, property)
	}

	const theme = useTheme()
	const { league } = theme.palette

	return (
		<TableHead>
			<TableRow>
				<TableCell sx={{ p: '4px', backgroundColor: '#18264a' }}></TableCell>
				{headCells.map(headCell => (
					<TableCell
						key={headCell.id}
						align={headCell.numeric ? 'right' : 'left'}
						padding={headCell.disablePadding ? 'none' : 'normal'}
						sortDirection={orderBy === headCell.id ? order : false}
						sx={{
							fontSize: '18px',
							fontWeight: '500',
							color: fontColor,
							p: '2px',
							backgroundColor: '#18264a',
						}}>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={orderBy === headCell.id ? order : 'asc'}
							hideSortIcon
							onClick={createSortHandler(headCell.id)}
							sx={{
								width: '100%',
							}}>
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

/* HeadCellsTeams.propTypes = {
	onRequestSort: PropTypes.func.isRequired,
	order: PropTypes.oneOf(['asc', 'desc']).isRequired,
	orderBy: PropTypes.string.isRequired,
} */

export default HeadCellsTeams
