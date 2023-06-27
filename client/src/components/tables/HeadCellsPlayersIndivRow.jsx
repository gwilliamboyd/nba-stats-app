/* eslint-disable react/prop-types */
import { TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material'

const HeadCellsPlayersIndivRow = ({
	statsType,
	headCells,
	backgroundColor,
	fontColor,
}) => {
	return (
		<TableHead>
			<TableRow>
				{headCells.map(headCell => (
					<TableCell
						key={headCell.id}
						align={headCell.numeric ? 'right' : 'left'}
						padding='2px'
						sx={{
							fontWeight: '700',
							...(statsType === 'advanced'
								? { fontSize: '14px' }
								: { fontSize: '18px' }),
							color: fontColor,
							backgroundColor: backgroundColor,
							border: 0,
						}}>
						{headCell.label}
						{/* <TableSortLabel hideSortIcon></TableSortLabel> */}
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	)
}

export default HeadCellsPlayersIndivRow
