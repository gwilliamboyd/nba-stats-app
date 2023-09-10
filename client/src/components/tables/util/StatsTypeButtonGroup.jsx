/* eslint-disable react/prop-types */
import { Button, ButtonGroup } from '@mui/material'

const StatsTypeButtonGroup = ({
	league,
	secondaryColor,
	tertiaryColor,
	setStatsType,
}) => {
	return (
		<ButtonGroup
			// variant='text'
			aria-label='medium button group'
			// color={'primary'}
			size='medium'
			sx={{ alignSelf: 'center' }}>
			<Button
				onClick={() => setStatsType('perGame')}
				sx={{
					color: secondaryColor,
					minHeight: '60px',
					maxHeight: '70px',
					'&:hover': { color: tertiaryColor },
				}}>
				Per-Game
			</Button>
			<Button
				onClick={() => setStatsType('total')}
				sx={{
					color: secondaryColor,
					minHeight: '60px',
					maxHeight: '70px',
					'&:hover': { color: tertiaryColor },
				}}>
				Totals
			</Button>
			<Button
				onClick={() => setStatsType('advanced')}
				sx={{
					color: secondaryColor,
					minHeight: '60px',
					maxHeight: '70px',
					'&:hover': { color: tertiaryColor },
				}}>
				Advanced
			</Button>
		</ButtonGroup>
	)
}

export default StatsTypeButtonGroup
