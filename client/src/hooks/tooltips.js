// per-game and total stats
export const getStandardTooltips = label => {
	switch (label) {
		case 'W':
			return 'Wins'
		case 'L':
			return 'Losses'
		case 'FG':
			return 'Field Goals'
		case 'FGA':
			return 'Field Goals Attempted'
		case 'FG%':
			return 'Field Goal %'
		case '3P':
			return '3 Pointers'
		case '3PA':
			return '3 Pointers Attempted'
		case '3P%':
			return '3 Pointers Made Against Attempts'
		case '2P':
			return '2 Pointers'
		case '2PA':
			return '2 Pointers Attempted'
		case '2P%':
			return '2 Pointers Made Against Attempts'
		case 'FT':
			return 'Free Throws'
		case 'FTA':
			return 'Free Throws Attempted'
		case 'FT%':
			return 'Free Throws Made Against Attempts'
		case 'ORB':
			return 'Offensive Rebounds'
		case 'DRB':
			return 'Defensive Rebounds'
		case 'TRB':
			return 'Total Rebounds'
		case 'AST':
			return 'Assists'
		case 'STL':
			return 'Steals'
		case 'BLK':
			return 'Blocks'
		case 'TOV':
			return 'Turnovers'
		case 'PF':
			return 'Personal Fouls'
		case 'PTS':
			return 'Points'
	}
}

// advanced stats
export const getAdvancedTooltips = label => {
	switch (label) {
		case 'Age':
			return 'Age'
		case 'W':
			return 'Wins'
		case 'L':
			return 'Losses'
		case 'FGA':
			return 'Field Goals Attempted'
		case 'FG%':
			return 'Field Goal %'
		case '3P':
			return '3 Pointers Per Game'
		case '3PA':
			return '3 Pointers Attempted Per Game'
		case '3P%':
			return '3 Pointers Made Against Attempts'
		case '2P':
			return '2 Pointers Per Game'
		case '2PA':
			return '2 Pointers Attempted Per Game'
		case '2P%':
			return '2 Pointers Made Against Attempts'
		case 'FT':
			return 'Free Throws Per Game'
		case 'FTA':
			return 'Free Throws Attempted Per Game'
		case 'FT%':
			return 'Free Throws Made Against Attempts'
		case 'ORB':
			return 'Offensive Rebounds Per Game'
		case 'o-EFG%':
			return 'Offensive Four Factors - Effective Field Goal %'
		case 'o-TOV%':
			return 'Offensive Four Factors - Turnover %'
		case 'o-ORB%':
			return 'Offensive Four Factors - Offensive Rebound %'
		case 'o-FT/FGA':
			return 'Offensive Four Factors - Free Throws Per Field Goal Attempt'
		case 'd-EFG%':
			return 'Defensive Four Factors - Effective Field Goal %'
		case 'd-TOV%':
			return 'Defensive Four Factors - Turnover %'
		case 'd-DRB%':
			return 'Defensive Four Factors - Defensive Rebound %'
		case 'd-FT/FGA':
			return 'Defensive Four Factors - Free Throws Per Field Goal Attempt'
	}
}

export const getAdvancedPlayerTooltips = label => {
	switch (label) {
		case 'Age':
			return 'Age'
		case 'GP':
			return 'Games Played'
		case 'MP':
			return 'Minutes Played'
		case 'PER':
			return 'Player Efficiency Rating'
		case 'TS%':
			return 'True Shooting %'
		case '3PAR':
			return '3-Point Attempt Rate'
		case 'FTR':
			return 'Free Throw Attempt Rate'
		case 'ORB%':
			return 'Offensive Rebound Percentage'
		case 'DRB%':
			return 'Defensive Rebound Percentage'
		case 'TRB%':
			return 'Total Rebound Percentage'
		case 'AST%':
			return 'Assist Percentage'
		case 'STL%':
			return 'Steal Percentage'
		case 'BLK%':
			return 'Block Percentage'
		case 'TOV%':
			return 'Turnover Percentage'
		case 'USG%':
			return 'Usage Percentage'
		case 'OWS':
			return 'Offensive Win Shares'
		case 'DWS':
			return 'Defensive Win Shares'
		case 'WS':
			return 'Win Shares'
		case 'WS48':
			return 'Win Shares Per 48 Minutes'
		case 'OBPM':
			return 'Offensive Box Plus/Minus'
		case 'DBPM':
			return 'Defensive Box Plus/Minus'
		case 'BPM':
			return 'Box Plus/Minus'
		case 'WORP':
			return 'Value Over Replacement Player'
	}
}
