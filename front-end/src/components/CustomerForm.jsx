import PropTypes from 'prop-types';
import { TextField } from '@mui/material';
import { customerKeyTranslation } from '../utilities/lang';

const CustomerForm = ({ customer, setCustomer }) => {

  const handleChange = ({ target: { name, value } }) => (
    setCustomer({ ...customer, [ name ]: value })
  );

  return (
    <>
      {
        Object.entries(customer).map(([ key, value ]) => (
          key !== 'id' &&
          <TextField
            key={`customer-form-${key}`}
            variant="standard"
            name={key}
            label={customerKeyTranslation[ key ]}
            onChange={handleChange}
            value={value}
            spellCheck="false"
            required
          />
        ))
      }
    </>
  );
};

CustomerForm.propTypes = {
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
  setCustomer: PropTypes.func,
};

export default CustomerForm;
