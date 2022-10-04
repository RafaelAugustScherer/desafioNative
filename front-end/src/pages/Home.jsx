import React, { useState, useContext } from 'react';
import { useTheme } from '@emotion/react';
import { Box, Grid, Pagination, Typography } from '@mui/material';
import { CustomerContext } from '../providers/Customer';
import CityFilter from '../partials/CityFilter';
import CityCard from '../components/CityCard';

const Home = () => {
  const {
    customersByCity,
  } = useContext(CustomerContext);
  const [ filteredByCity, setFilteredByCity ] = useState([]);
  const { palette } = useTheme();

  return (
    <Box sx={{ my: 3, mx: 5 }}>
      <Typography variant="h3" component="h1" textAlign="center">
        Home
      </Typography>
      <CityFilter
        arrayToFilter={customersByCity}
        setToArray={setFilteredByCity}
      />
      <Typography variant="h4" component="h2" textAlign="center">
        Lista de Cidades
      </Typography>
      <Box m={5}>
        <Grid container spacing={4}>
          {
            filteredByCity.map((info, idx) => (
              <Grid
                key={`customer-card-${idx + 1}`}
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
              >
                <CityCard
                  info={{ id: idx + 1, ...info }}
                  color={palette.secondary.main}
                />
              </Grid>
            ))
          }
        </Grid>
      </Box>
      <Pagination
        count={filteredByCity.length !== 0
          ? Math.ceil(filteredByCity.length / 20)
          : 1
        }
      />
    </Box>
  );
};

export default Home;
