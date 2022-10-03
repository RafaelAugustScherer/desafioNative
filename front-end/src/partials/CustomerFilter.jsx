import React, { useState, useContext } from 'react';
import {
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from '@mui/material';
import { CustomerContext } from '../providers/Customer';

const CustomerFilter = () => {
  const [ filter, setFilter ] = useState({
    state: '',
  });
  const { states } = useContext(CustomerContext);

  const handleChange = ({ target: { name, value } }) => (
    setFilter({ ...filter, [ name ]: value })
  );

  return (
    <Box>
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
      </FormControl>
    </Box>
  );
};

export default CustomerFilter;
