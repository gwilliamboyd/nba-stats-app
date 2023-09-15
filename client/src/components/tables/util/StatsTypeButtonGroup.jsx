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
					fontSize: {
						xs: '12px',
						sm: '15px',
					},
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
					fontSize: {
						xs: '12px',
						sm: '15px',
					},
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
					fontSize: {
						xs: '12px',
						sm: '15px',
					},
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
