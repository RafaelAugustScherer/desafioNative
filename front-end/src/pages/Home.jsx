import React, { useState, useContext } from 'react';
import { useTheme } from '@emotion/react';
import { Box, Grid, Pagination, Typography } from '@mui/material';
// import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { CustomerContext } from '../providers/Customer';
import CityFilter from '../partials/CityFilter';
import CityCard from '../components/CityCard';

const Home = () => {
  const {
    cityList,
  } = useContext(CustomerContext);
  const [ cityListByName, setCityListByName ] = useState([]);
  const [page, setPage] = useState(1);
  const { palette } = useTheme();

  const getPaginatedCityList = () => {
    const offset = (page - 1) * 20;
    return cityListByName.slice(offset, offset + 20);
  };

  const handlePageChange = (_e, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box sx={{
      my: 3,
      mx: 5,
      display: 'flex',
      flexFlow: 'column wrap',
      alignItems: 'center',
    }}>
      <Typography variant="h3" component="h1" textAlign="center">
        Home
      </Typography>
      <Typography variant="h4" component="h2" textAlign="center">
        Lista de Cidades
      </Typography>
      <CityFilter
        arrayToFilter={cityList}
        setToArray={setCityListByName}
      />
      <Box my={5} display="flex" justifyContent="center">
        <Grid container spacing={4} justifyContent="center">
          {
            getPaginatedCityList().map((info, idx) => (
              <Grid
                key={`customer-card-${idx + 1}`}
                item
              >
                <CityCard
                  info={{ id: cityList.indexOf(info) + 1, ...info }}
                  color={palette.secondary.main}
                />
              </Grid>
            ))
          }
        </Grid>
      </Box>
      <Pagination
        count={cityListByName.length !== 0
          ? Math.ceil(cityListByName.length / 20)
          : 1
        }
        page={page}
        onChange={handlePageChange}
      />
    </Box>
  );
};

export default Home;
