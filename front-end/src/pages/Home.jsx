import React, { useContext } from 'react';
import { useTheme } from '@emotion/react';
import { Box, Grid, Pagination, Typography } from '@mui/material';
import { CustomerContext } from '../providers/Customer';
import CustomerCard from '../components/CustomerCard';
import CustomerFilter from '../partials/CustomerFilter';

const Home = () => {
  const {
    pageCustomers,
    customersLength,
  } = useContext(CustomerContext);
  const { palette } = useTheme();

  return (
    <Box sx={{ my: 3, mx: 5 }}>
      <Typography variant="h3" component="h1" textAlign="center">
        Home
      </Typography>
      <CustomerFilter />
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
    </Box>
  );
};

export default Home;
