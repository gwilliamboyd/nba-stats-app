/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { TableCell, TableHead, TableRow, Tooltip } from '@mui/material'
import { useTheme } from '@emotion/react'
import {
	getStandardTooltips,
	getAdvancedPlayerTooltips,
} from '../../hooks/tooltips'

const HeadCellsPlayers = ({
	statsType,
	order,
	orderBy,
	setOrderBy,
	onRequestSort,
	headCells,
	secondaryColor,
	tertiaryColor,
	backgroundColor,
}) => {
	const [sortId, setSortId] = useState('default')
	const [clicksSortActive, setClicksSortActive] = useState(0)

	const createSortHandler = property => event => {
		onRequestSort(event, property)
		setSortId(property)
		setClicksSortActive(clicksSortActive + 1)
	}

	const theme = useTheme()
	const { league } = theme.palette

	useEffect(() => {
		if (clicksSortActive > 2) {
			setClicksSortActive(0)
			setSortId('default')
			setOrderBy('default')
		}
	}, [clicksSortActive, setOrderBy])

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
								? getAdvancedPlayerTooltips(headCell.label)
								: getStandardTooltips(headCell.label)
						}>
						<TableCell
							color={handleSortColor(headCell.id)}
							align={headCell.numeric ? 'center' : 'left'}
							padding={headCell.disablePadding ? 'none' : 'normal'}
							sortDirection={orderBy === headCell.id ? order : false}
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
							}}
							onClick={createSortHandler(headCell.id)}>
							{headCell.label}
						</TableCell>
					</Tooltip>
				))}
			</TableRow>
		</TableHead>
	)
}

export default HeadCellsPlayers
