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
						// align={'right'}
						align={headCell.numeric ? 'right' : 'left'}
						padding={'normal'}
						sx={{
							fontWeight: '500',
							...(statsType === 'advanced'
								? { fontSize: '16px' }
								: { fontSize: '16px' }),
							color: fontColor,
							p: '2px',
							backgroundColor: backgroundColor,
							border: 0,
							width: 'auto',
						}}>
						{headCell.label}
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	)
}

export default HeadCellsTeamsIndivRow
