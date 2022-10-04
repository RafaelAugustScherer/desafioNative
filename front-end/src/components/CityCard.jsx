import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardActionArea, CardContent, Typography } from '@mui/material';

const CityCard = ({ info, color }) => {

  return (
    <Card sx={{
      width: '250px',
      height: '200px',
      backgroundColor: color,
    }}>
      <CardActionArea sx={{ pb: 3 }}>
        <CardContent sx={{
          '& > *': {
            py: 1,
          },
        }}>
          <Typography color="text.secondary" gutterBottom>
            # {info.id}
          </Typography>
          <Typography variant="h5">
            {info.city}
          </Typography>
          <Typography color="text.secondary" >
            Total de Clientes: {info.customers_total}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

CityCard.propTypes = {
  info: PropTypes.shape({
    id: PropTypes.number,
    city: PropTypes.string,
    customers_total: PropTypes.number,
  }),
  color: PropTypes.string,
};

export default CityCard;
