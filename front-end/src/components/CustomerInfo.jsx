import PropTypes from 'prop-types';
import { Typography } from '@mui/material';
import { customerKeyTranslation } from '../utilities/lang';

const CustomerInfo = ({ customer }) => {

  return (
    <>
      {
        Object.entries(customer).map(([ key, value ]) => (
          <Typography
            key={`customer-info-${key}`}
            variant="body1"
          >
            <strong>{`${customerKeyTranslation[key]}: `}</strong>
            {value}
          </Typography>
        ))
      }
    </>
  );
};

CustomerInfo.propTypes = {
  customer: PropTypes.shape({
    id: PropTypes.number,
    last_name: PropTypes.string,
    first_name: PropTypes.string,
    email: PropTypes.string,
    gender: PropTypes.string,
    company: PropTypes.string,
    city: PropTypes.string,
    title: PropTypes.string,
  }),
};

export default CustomerInfo;
