/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Box, Typography } from '@mui/material';
import { useTheme } from '@emotion/react';
import PlayerCard from '../PlayerCard';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const HomePlayersLeaders = ({ stat, statArray }) => {
  const theme = useTheme();
  const { league } = theme.palette;

  // const [graphicOn, setGraphicOn] = useState(false)
  // const [oldUI, setOldUI] = useState(false)
  // const [zoomIn, setZoomIn] = useState(false)

  const sortOperation = `b.${stat} - a.${stat}`;

  const topFivePlayers = () => {
    const ptsSorted = statArray
      ?.sort((a, b) => eval(sortOperation))
      .slice(0, 10);
    const result = ptsSorted
      ?.map(v => ({ v, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ v }) => v);
    /* .slice(0, 5) */
    return result;
  };

  useEffect(() => {
    statArray = topFivePlayers();
  }, [topFivePlayers()]);

  return (
    <Box
      sx={{
        width: '100%',
        display: 'grid',
        justifySelf: 'center',
        justifyItems: { xs: 'center', sm: 'space-between' },
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(5, 1fr)',
        },
        gridTemplateRows: {
          xs: 'repeat(5, 1fr)',
          sm: 'repeat(3, 1fr)',
          md: '1fr',
          xl: '1fr',
        },
        columnGap: '4rem',
      }}>
      {statArray?.slice(0, 5)?.map(p => {
        const statValue = `p?.${stat}`;
        return (
          <Box
            key={p?.player}
            color={league.nbaWhite}
            sx={{
              boxSizing: 'border-box',
              position: 'relative',
              // width: 'fit-content',
              width: '100%',
              maxWidth: '190px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              zIndex: '2',
              padding: '0',
            }}>
            <Link to={`/stats/players/${p?.id}`}>
              <PlayerCard
                // graphicOn={graphicOn}
                // setGraphicOn={setGraphicOn}
                // showPerGame={true}
                // p={p}
                // stat={stat}
                width={{ xs: 220, sm: 160, lg: 190 }}
                player={p?.player}
              />
            </Link>
            <Box
              display={'flex'}
              alignItems={'baseline'}
              gap={'4px'}
              zIndex={'3'}>
              <Typography
                variant='h6'
                fontSize={32}
                fontWeight={800}>
                {eval(statValue)}
              </Typography>
              <Typography
                variant='h6'
                color={league.nbaRed}>
                /Game
              </Typography>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default HomePlayersLeaders;
