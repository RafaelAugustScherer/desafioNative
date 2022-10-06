import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Grid,
  Typography,
  Pagination,
} from '@mui/material';
import { useTheme } from '@emotion/react';
import { CustomerContext } from '../providers/Customer';
import CustomerCard from '../components/CustomerCard';
import CustomBreadcrumbs from '../components/CustomBreadcrumbs';

const CustomersByCity = () => {
  const { cityList, customers, currentPage, setCurrentPage } = useContext(CustomerContext);
  const { palette } = useTheme();
  const { cityName } = useParams();

  const handlePageChange = (_e, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getTotalCustomersInCity = () => {
    const cityInfo = cityList.find(({ city }) => city === cityName);

    return cityInfo ? cityInfo.customers_total : 0;
  };

  const pageCustomers = () => {
    const offset = (currentPage - 1) * 10;
    return customers.slice(offset, offset + 10);
  };

  return (
    <Box sx={{ my: 3, mx: 5 }}>
      <CustomBreadcrumbs />
      <Typography variant="h4" component="h2" textAlign="center">
        Lista de Clientes em <strong>{ cityName }</strong>
      </Typography>
    <Box my={5}>
      <Grid container spacing={4}>
        {
          pageCustomers().map((customer) => (
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
