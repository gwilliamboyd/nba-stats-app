/* eslint-disable react/prop-types */
import { Button, ButtonGroup } from '@mui/material'

const StatsTypeButtonGroup = ({ league, setStatsType }) => {
	return (
		<ButtonGroup
			// variant='text'
			aria-label='medium button group'
			color={'primary'}
			size='medium'>
			<Button
				onClick={() => setStatsType('perGame')}
				sx={{
					color: league.nbaWhite,
					'&:hover': { color: league.nbaRed },
				}}>
				Per-Game
			</Button>
			<Button
				onClick={() => setStatsType('total')}
				sx={{
					color: league.nbaWhite,
					'&:hover': { color: league.nbaRed },
				}}>
				Totals
			</Button>
			<Button
				onClick={() => setStatsType('advanced')}
				sx={{
					color: league.nbaWhite,
					'&:hover': { color: league.nbaRed },
				}}>
				Advanced
			</Button>
		</ButtonGroup>
	)
}

export default StatsTypeButtonGroup
