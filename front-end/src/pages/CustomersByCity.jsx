import React, { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Grid,
  Typography,
  Pagination,
  IconButton,
} from '@mui/material';
import { useTheme } from '@emotion/react';
import { CustomerContext } from '../providers/Customer';
import CustomerCard from '../components/CustomerCard';
import { ArrowBackIosNew } from '@mui/icons-material';

const CustomersByCity = () => {
  const { cityList, customers, currentPage, setCurrentPage } = useContext(CustomerContext);
  const { palette } = useTheme();
  const { cityName } = useParams();
  const navigate = useNavigate();

  const handlePageChange = (_e, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getTotalCustomersInCity = () => {
    const cityInfo = cityList.find(({ city }) => city === cityName);

    return cityInfo ? cityInfo.customers_total : 0;
  };

  return (
    <Box sx={{ my: 3, mx: 5 }}>
      <IconButton aria-label="Voltar" onClick={() => navigate('/')}>
        <ArrowBackIosNew />
      </IconButton>
      <Typography variant="h4" component="h2" textAlign="center">
        Lista de Clientes em <strong>{ cityName }</strong>
      </Typography>
    <Box m={5}>
      <Grid container spacing={4}>
        {
          customers.map((customer) => (
            <Grid
              key={`customer-card-${customer.id}`}
              item
              xs={12}
              sm={6}
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
    <Pagination
        count={Math.ceil(getTotalCustomersInCity() / 10)}
        page={currentPage}
        onChange={handlePageChange}
      />
    </Box>
  );
};

export default CustomersByCity;
