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

	// TOOLTIPS

	// per-game and total stats
	const getStandardTooltips = label => {
		switch (label) {
			case 'W':
				return 'Wins'
			case 'L':
				return 'Losses'
			case 'FG':
				return 'Field Goals'
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
			case 'ORB':
				return 'Offensive Rebounds Per Game'
			case 'DRB':
				return 'Defensive Rebounds Per Game'
			case 'TRB':
				return 'Total Rebounds Per Game'
			case 'AST':
				return 'Assists Per Game'
			case 'STL':
				return 'Steals Per Game'
			case 'BLK':
				return 'Blocks Per Game'
			case 'TOV':
				return 'Turnovers Per Game'
			case 'PF':
				return 'Personal Fouls Per Game'
			case 'PTS':
				return 'Points Per Game'
		}
	}

	// advanced stats
	const getAdvancedTooltips = label => {
		switch (label) {
			case 'Age':
				return 'Age'
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
			case 'ORB':
				return 'Offensive Rebounds Per Game'
			case 'o-EFG%':
				return 'Offensive Four Factors - Effective Field Goal %'
			case 'o-TOV%':
				return 'Offensive Four Factors - Turnover %'
			case 'o-ORB%':
				return 'Offensive Four Factors - Offensive Rebound %'
			case 'o-FT/FGA%':
				return 'Offensive Four Factors - Free Throws Per Field Goal Attempt'
			case 'd-EFG%':
				return 'Defensive Four Factors - Effective Field Goal %'
			case 'd-TOV%':
				return 'Defensive Four Factors - Turnover %'
			case 'd-DRB%':
				return 'Defensive Four Factors - Defensive Rebound %'
			case 'd-FT/FGA%':
				return 'Defensive Four Factors - Free Throws Per Field Goal Attempt'
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
						<Tooltip
							title={
								headCells === 'advanced'
									? getAdvancedTooltips(headCell.label)
									: getStandardTooltips(headCell.label)
							}>
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
