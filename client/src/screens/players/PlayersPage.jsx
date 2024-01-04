/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, lazy, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography } from '@mui/material';
import { setPlayersPerGameStats } from '../../slices/players-stats/playersPerGameSlice';
import { setPlayersTotalStats } from '../../slices/players-stats/playersTotalSlice';
import { setPlayersAdvancedStats } from '../../slices/players-stats/playersAdvancedSlice';
import { useTheme } from '@mui/material/styles';
import LoadingScreen from '../utility/LoadingScreen';
import StatsTypeButtonGroup from '../../components/tables/util/StatsTypeButtonGroup';
import MainStatsContainer from '../../components/layout/MainStatsContainer';
import MainStatsBox from '../../components/layout/MainStatsBox';
const PlayersStatsTable = lazy(() =>
  import('../../components/tables/PlayersStatsTable')
);

const PlayersPage = () => {
  // theme
  const theme = useTheme();
  const { league } = theme.palette;

  // state
  const dispatch = useDispatch();

  const [statsType, setStatsType] = useState('perGame');
  const [includePagination, setIncludePagination] = useState(true);
  const [loading, setLoading] = useState(true);

  const getPlayersStats = async () => {
    const [perGameRes, totalRes, advancedRes] = await Promise.all([
      fetch(`https://nba-stats-app-62o4.onrender.com/stats/players/per-game`, {
        method: 'GET',
      }),
      fetch(`https://nba-stats-app-62o4.onrender.com/stats/players/total`, {
        method: 'GET',
      }),
      fetch(`https://nba-stats-app-62o4.onrender.com/stats/players/advanced`, {
        method: 'GET',
      }),
    ]);
    const perGameData = await perGameRes.json();
    const totalData = await totalRes.json();
    const advancedData = await advancedRes.json();
    // set redux state
    dispatch(setPlayersPerGameStats({ playersPerGameStats: perGameData }));
    dispatch(setPlayersTotalStats({ playersTotalStats: totalData }));
    dispatch(setPlayersAdvancedStats({ playersAdvancedStats: advancedData }));
    // disable loading
    setLoading(false);
  };

  useEffect(() => {
    getPlayersStats();
  }, []);

  // grab redux state
  const playersPerGameStats = useSelector(state => state.playersPerGameStats);
  const playersTotalStats = useSelector(state => state.playersTotalStats);
  const playersAdvancedStats = useSelector(state => state.playersAdvancedStats);

  // extract stat array from redux state
  const playersPerGameStatistics = Object.values(playersPerGameStats)[0];
  const playersTotalStatistics = Object.values(playersTotalStats)[0];
  const playersAdvancedStatistics = Object.values(playersAdvancedStats)[0];

  return (
    <Suspense fallback={<LoadingScreen />}>
      <MainStatsContainer league={league}>
        <MainStatsBox>
          <Box
            sx={{
              width: {
                xs: '300px',
                sm: '540px',
                md: '984px',
                lg: '1200px',
                xl: '1300px',
              },
              height: '100%',
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: { xs: 'center', md: 'space-between' },
              alignItems: { xs: 'center', md: 'baseline' },
              gap: { xs: '1rem', md: '3rem' },
            }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: 'baseline',
                gap: { xs: '1rem', md: '3rem' },
              }}>
              <Typography
                variant={'h3'}
                sx={{ fontSize: { xs: '36px', lg: '51px' } }}>
                Player Stats
              </Typography>
              <Typography
                variant='h5'
                sx={{
                  fontWeight: '600',
                  opacity: '90%',
                  fontSize: { xs: '22px', lg: '25px' },
                }}>
                2022-23 Season
              </Typography>
            </Box>
            <Box>
              <StatsTypeButtonGroup
                league={league}
                setStatsType={setStatsType}
              />
            </Box>
          </Box>
        </MainStatsBox>
        <Suspense fallback={<LoadingScreen />}>
          <PlayersStatsTable
            loading={loading}
            statsType={statsType}
            statistics={
              statsType === 'perGame'
                ? playersPerGameStatistics
                : statsType === 'total'
                ? playersTotalStatistics
                : statsType === 'advanced'
                ? playersAdvancedStatistics
                : null
            }
            containerBackground={league.nbaBackground}
            primaryColor={league.nbaTableBackground}
            secondaryColor={league.nbaWhite}
            tertiaryColor={league.nbaRed}
            borderColor={league.nbaWhite}
            includePagination={includePagination}
            playersPerPage={10}
          />
        </Suspense>
      </MainStatsContainer>
    </Suspense>
  );
};

export default PlayersPage;
