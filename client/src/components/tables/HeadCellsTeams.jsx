/* eslint-disable react/prop-types */
import {
	Box,
	TableCell,
	TableHead,
	TableRow,
	TableSortLabel,
	Tooltip,
} from '@mui/material'
import { visuallyHidden } from '@mui/utils'
import { useTheme } from '@emotion/react'

const HeadCellsTeams = ({
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

	// theme
	const theme = useTheme()
	const { league } = theme.palette

	// styles
	const headCellsStyles = {
		fontSize: {
			sm: '14px',
			lg: '18px',
		},
		fontWeight: '500',
		color: fontColor,
		p: '2px',
		backgroundColor: backgroundColor,
	}

	const getAdvancedTooltips = label => {
		switch (label) {
			case 'W':
				return 'Wins'
			case 'L':
				return 'Losses'
			case 'FGA':
				return 'Field Goals Attempted'
			case 'FG%':
				return 'Field Goal %'
			case '3P':
				return '3 Pointers Per Game'
			case '3PA':
				return '3 Pointers Attempted Per Game'
			case '3P%':
				return '3 Pointers Made Against Attempts'
			case '2P':
				return '2 Pointers Per Game'
			case '2PA':
				return '2 Pointers Attempted Per Game'
			case '2P%':
				return '2 Pointers Made Against Attempts'
			case 'FT':
				return 'Free Throws Per Game'
			case 'FTA':
				return 'Free Throws Attempted Per Game'
			case 'FT%':
				return 'Free Throws Made Against Attempts'
		}
	}

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
						sx={headCellsStyles}>
						<Tooltip title={getAdvancedTooltips(headCell.label)}>
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
										{order === 'desc'
											? 'sorted descending'
											: 'sorted ascending'}
									</Box>
								) : null}
							</TableSortLabel>
						</Tooltip>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	)
}

export default HeadCellsTeams
