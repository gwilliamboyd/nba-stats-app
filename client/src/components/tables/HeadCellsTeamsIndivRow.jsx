/* eslint-disable react/prop-types */
import { TableCell, TableHead, TableRow } from '@mui/material'

const HeadCellsTeamsIndivRow = ({
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
						padding={headCell.disablePadding ? 'none' : 'normal'}
						sx={{
							fontWeight: '700',
							...(statsType === 'advanced'
								? { fontSize: '14px' }
								: { fontSize: '18px' }),
							color: fontColor,
							p: '2px',
							backgroundColor: backgroundColor,
							border: 0,
						}}>
						{headCell.label}
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	)
}

export default HeadCellsTeamsIndivRow
