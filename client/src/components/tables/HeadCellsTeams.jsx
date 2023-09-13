/* eslint-disable react/prop-types */
import { TableCell, TableHead, TableRow, Tooltip } from '@mui/material'
import { useTheme } from '@emotion/react'
import { useEffect, useState } from 'react'

const HeadCellsTeams = ({
	statsType,
	order,
	orderBy,
	setOrderBy,
	onRequestSort,
	headCells,
	secondaryColor,
	tertiaryColor,
	backgroundColor,
	fontColor,
}) => {
	const [sortId, setSortId] = useState('default')
	const [clicksSortActive, setClicksSortActive] = useState(0)

	const createSortHandler = property => event => {
		onRequestSort(event, property)
		setSortId(property)
		setClicksSortActive(clicksSortActive + 1)
	}

	// theme
	const theme = useTheme()
	const { league } = theme.palette

	// turns off sorting on 3rd click
	useEffect(() => {
		if (clicksSortActive > 2) {
			setClicksSortActive(0)
			setSortId('default')
			setOrderBy('default')
		}
	}, [clicksSortActive, setOrderBy])
	useEffect(() => {
		console.log(`Head Cells: ${headCells}`)
	}, [])

	// Change header styles if sortId is active
	const handleSortColor = headCellId => {
		return headCellId === sortId
			? eval(`secondaryColor`)
			: eval(`tertiaryColor`)
	}
	const handleSortFontWeight = headCellId => {
		return headCellId === sortId ? '600' : '400'
	}
	const handleSortUnderline = headCellId => {
		if (headCellId === sortId) {
			return {
				content: '""',
				position: 'absolute',
				left: '0',
				bottom: '0',
				width: '100%',
				height: '3px',
				marginBottom: '2px',
				// can't call MUI theme here
				// this is league.nbaRed typed manually
				backgroundColor: tertiaryColor,
			}
		} else {
			return null
		}
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
				return '3 Pointers'
			case '3PA':
				return '3 Pointers Attempted'
			case '3P%':
				return '3 Pointers Made Against Attempts'
			case '2P':
				return '2 Pointers'
			case '2PA':
				return '2 Pointers Attempted'
			case '2P%':
				return '2 Pointers Made Against Attempts'
			case 'FT':
				return 'Free Throws'
			case 'FTA':
				return 'Free Throws Attempted'
			case 'FT%':
				return 'Free Throws Made Against Attempts'
			case 'ORB':
				return 'Offensive Rebounds'
			case 'DRB':
				return 'Defensive Rebounds'
			case 'TRB':
				return 'Total Rebounds'
			case 'AST':
				return 'Assists'
			case 'STL':
				return 'Steals'
			case 'BLK':
				return 'Blocks'
			case 'TOV':
				return 'Turnovers'
			case 'PF':
				return 'Personal Fouls'
			case 'PTS':
				return 'Points'
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
			case 'o-FT/FGA':
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
					<Tooltip
						key={headCell.id}
						title={
							statsType === 'advanced'
								? getAdvancedTooltips(headCell.label)
								: getStandardTooltips(headCell.label)
						}>
						<TableCell
							color={handleSortColor(headCell.id)}
							align={headCell.numeric ? 'center' : 'left'}
							padding={headCell.disablePadding ? 'none' : 'normal'}
							sortDirection={orderBy === headCell.id ? order : false}
							onClick={createSortHandler(headCell.id)}
							sx={{
								position: 'relative',
								fontSize: {
									sm: '14px',
									lg: '12px',
								},
								color: handleSortColor(headCell.id),
								fontWeight: handleSortFontWeight(headCell.id),
								p: '2px',
								paddingBottom: '0.2rem',
								backgroundColor: backgroundColor,
								'&:hover': { cursor: 'pointer' },
								'&:focus': { color: league.nbaRed },
								'&::before': handleSortUnderline(headCell.id),
							}}>
							{headCell.label}
						</TableCell>
					</Tooltip>
				))}
			</TableRow>
		</TableHead>
	)
}

export default HeadCellsTeams
