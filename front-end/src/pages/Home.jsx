import React, { useContext, useState } from 'react';
import { useTheme } from '@emotion/react';
import { Box, FormControl, Grid, InputLabel, MenuItem, Pagination, Select, Typography } from '@mui/material';
import { CustomerContext } from '../providers/Customer';
import CustomerCard from '../components/CustomerCard';

const Home = () => {
  const [ filter, setFilter ] = useState({
    state: '',
  });
  const {
    pageCustomers,
    customersLength,
    states,
  } = useContext(CustomerContext);
  const { palette } = useTheme();

  const handleChange = ({ target: { name, value } }) => (
    setFilter({ ...filter, [ name ]: value })
  );

  return (
    <Box sx={{ my: 3, mx: 5 }}>
      <Typography variant="h3" component="h1" textAlign="center">
        Home
      </Typography>
      <Typography variant="h4" component="h2">
        Filtrar Clientes
      </Typography>
      <FormControl>
        <InputLabel id="state-select-label">
          Sigla do Estado
        </InputLabel>
        <Select
          labelId="state-select-label"
          name="state"
          value={filter.state}
          label="Sigla do Estado"
          onChange={handleChange}
        >
          {
            states.map((state) => (
              <MenuItem
                key={`${state}-option`}
                value={state}
              >
                {state}
              </MenuItem>
            ))
          }
        </Select>
        <Typography variant="h4" component="h2" textAlign="center">
        Lista de Clientes
      </Typography>
        <Box m={5}>
        <Grid container spacing={4}>
          {
            pageCustomers.map((customer) => (
              <Grid
                key={`customer-card-${customer.id}`}
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
              >
                <CustomerCard
                  customer={customer}
                  color={palette.secondary.main}
                />
              </Grid>
            ))
          }
        </Grid>
        </Box>
        <Pagination count={customersLength / 20} />
      </FormControl>
    </Box>
  );
};

export default Home;
