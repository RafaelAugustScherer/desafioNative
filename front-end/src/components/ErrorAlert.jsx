import PropTypes from 'prop-types';
import { Alert, AlertTitle } from '@mui/material';

const ErrorAlert = ({ content, setContent }) => (
  <Alert severity="error" onClose={() => setContent()}>
    <AlertTitle>Erro</AlertTitle>
    { content }
  </Alert>
);

ErrorAlert.propTypes = {
  content: PropTypes.string,
  setContent: PropTypes.func,
};

export default ErrorAlert;
