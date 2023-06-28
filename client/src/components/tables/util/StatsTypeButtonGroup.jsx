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
			size='medium'>
			<Button
				onClick={() => setStatsType('perGame')}
				sx={{
					color: tertiaryColor,
					'&:hover': { color: secondaryColor },
				}}>
				Per-Game
			</Button>
			<Button
				onClick={() => setStatsType('total')}
				sx={{
					color: tertiaryColor,
					'&:hover': { color: secondaryColor },
				}}>
				Totals
			</Button>
			<Button
				onClick={() => setStatsType('advanced')}
				sx={{
					color: tertiaryColor,
					'&:hover': { color: secondaryColor },
				}}>
				Advanced
			</Button>
		</ButtonGroup>
	)
}

export default StatsTypeButtonGroup
