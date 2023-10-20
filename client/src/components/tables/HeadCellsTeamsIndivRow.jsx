/* eslint-disable react/prop-types */
import { TableCell, TableHead, TableRow, Tooltip } from '@mui/material'
// tooltip hooks
import { getStandardTooltips, getAdvancedTooltips } from '../../hooks/tooltips'
import { useTheme } from '@emotion/react'

const HeadCellsTeamsIndivRow = ({
	statsType,
	headCells,
	backgroundColor,
	fontColor,
}) => {
	const theme = useTheme()
	const { league } = theme.palette

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
								lineHeight: '1rem',
								fontWeight: '500',
								...(statsType === 'advanced'
									? { fontSize: '14px' }
									: { fontSize: '12px' }),
								color: fontColor,
								p: '2px',
								backgroundColor: league.nbaTeamIndivTableBackground,
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
