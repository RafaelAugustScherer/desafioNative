import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card, CardActionArea, CardContent, Typography } from '@mui/material';

const CustomerCard = ({ customer, color }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/customer/${customer.id}`);
  };

  return (
    <Card sx={{
      width: '275 px',
      backgroundColor: color,
    }}>
      <CardActionArea onClick={handleClick} sx={{ pb: 3 }}>
        <CardContent sx={{
          '& > *': {
            py: 1,
          },
        }}>
          <Typography color="text.secondary" gutterBottom>
            # {customer.id}
          </Typography>
          <Typography variant="h5">
            {`${customer.first_name} ${customer.last_name}`}
          </Typography>
          <Typography color="text.secondary">
            {customer.city}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

CustomerCard.propTypes = {
  customer: PropTypes.shape({
    id: PropTypes.number,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string,
    gender: PropTypes.string,
    company: PropTypes.string,
    city: PropTypes.string,
    title: PropTypes.string,
  }),
  color: PropTypes.string,
};

export default CustomerCard;
