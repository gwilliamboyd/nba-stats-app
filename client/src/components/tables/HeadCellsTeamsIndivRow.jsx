/* eslint-disable react/prop-types */
import { TableCell, TableHead, TableRow, Tooltip } from '@mui/material'
// tooltip hooks
import { getStandardTooltips, getAdvancedTooltips } from '../../hooks/tooltips'

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
					<Tooltip
						key={headCell.id}
						title={
							statsType === 'advanced'
								? getAdvancedTooltips(headCell.label)
								: getStandardTooltips(headCell.label)
						}>
						<TableCell
							align={headCell.numeric ? 'center' : 'left'}
							padding={'normal'}
							sx={{
								fontWeight: '500',
								...(statsType === 'advanced'
									? { fontSize: '14px' }
									: { fontSize: '12px' }),
								color: fontColor,
								p: '2px',
								backgroundColor: backgroundColor,
								border: 0,
								width: 'auto',
							}}>
							{headCell.label}
						</TableCell>
					</Tooltip>
				))}
			</TableRow>
		</TableHead>
	)
}

export default HeadCellsTeamsIndivRow
