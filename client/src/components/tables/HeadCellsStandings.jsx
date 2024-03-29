/* eslint-disable react/prop-types */
import {
	Box,
	TableCell,
	TableHead,
	TableRow,
	TableSortLabel,
} from '@mui/material'
import { visuallyHidden } from '@mui/utils'
import { useTheme } from '@emotion/react'

const HeadCellsStandings = ({
	order,
	orderBy,
	onRequestSort,
	headCells,
	backgroundColor,
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
				<TableCell
					sx={{
						p: '4px',
						backgroundColor: backgroundColor,
						opacity: '1',
					}}></TableCell>
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
							backgroundColor: backgroundColor,
						}}>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={orderBy === headCell.id ? order : 'asc'}
							hideSortIcon
							onClick={createSortHandler(headCell.id)}
							sx={{
								width: '100%',
								'&.MuiTableSortLabel-root': {
									color: fontColor,
								},
								'&.MuiTableSortLabel-root:hover': {
									color: league.nbaWhite,
								},
								'&.Mui-active': {
									color: league.nbaWhite,
								},
								'& .MuiTableSortLabel-icon': {
									color: `${league.nbaWhite} !important`,
								},
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

export default HeadCellsStandings
