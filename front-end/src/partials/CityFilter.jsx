import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  TextField,
  Box,
} from '@mui/material';

const CityFilter = ({ arrayToFilter, setToArray }) => {
  const [city, setCity] = useState('');

  const handleChange = ({ target: { value } }) => (
    setCity(value)
  );

  useEffect(() => {
    setToArray(arrayToFilter.filter(
      (info) => info.city.toLowerCase().includes(city.toLowerCase()),
    ));
  }, [arrayToFilter, city]);

  return (
    <Box>
      <Typography variant="h4" component="h2">
        Filtrar Clientes
      </Typography>
      <TextField
        label="Filtrar por cidade..."
        name="city"
        onChange={handleChange}
        value={city}
        fullWidth
      />
    </Box>
  );
};

CityFilter.propTypes = {
  arrayToFilter: PropTypes.array,
  setToArray: PropTypes.func,
};

export default CityFilter;
