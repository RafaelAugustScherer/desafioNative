import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Fab,
  Tooltip,
  Typography,
  IconButton,
} from '@mui/material';
import { Check, Edit, ArrowBackIosNew } from '@mui/icons-material';
import { CustomerContext } from '../providers/Customer';
import ErrorAlert from '../components/ErrorAlert';
import CustomerInfo from '../components/CustomerInfo';
import CustomerForm from '../components/CustomerForm';

const Customer = () => {
  const { fetchCustomerById, updateCustomerById } = useContext(CustomerContext);
  const [ formData, setFormData ] = useState();
  const [ apiError, setApiError ] = useState();
  const [ loading, setLoading ] = useState(false);
  const [ editEnabled, setEditEnabled ] = useState(false);
  const { customerId } = useParams();
  const navigate = useNavigate();

  const fetchCustomer = async () => {
    setLoading(true);

    const response = await fetchCustomerById(customerId);
    response.error ? setApiError(response.error) : setFormData(response);

    setLoading(false);
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    if (editEnabled) {
      const { id, ...propsToEdit } = formData;
      const response = await updateCustomerById(id, propsToEdit);
      if (response.error) {
        setApiError(response.error);
        return;
      }
    }

    setEditEnabled(!editEnabled);
  };

  useEffect(() => {
    fetchCustomer();
  }, []);

  return (
    <Box
      component="form"
      onSubmit={handleEdit}
      sx={{ my: 3, mx: 5, position: 'relative' }}
    >
      <IconButton
        aria-label="Voltar"
        onClick={() => navigate(-1)}
      >
        <ArrowBackIosNew />
      </IconButton>
      <Typography variant="h4" component="h2" textAlign="center">
        Informações do Cliente
      </Typography>
      {
        apiError && (
          <ErrorAlert
            content={apiError}
            setContent={setApiError}
          />
        )
      }
      {
        !loading && formData && (
          <Box sx={{
            display: 'flex',
            flexFlow: 'column wrap',
            '&& > *': {
              margin: 2,
            },
          }}>
            {
              editEnabled ? (
                <CustomerForm
                  customer={formData}
                  setCustomer={setFormData}
                />
              ) : (
                <CustomerInfo customer={formData} />
              )
            }
          </Box>
        )
      }
      <Tooltip
        title="Editar Informações"
        sx={{
          position: 'absolute',
          bottom: editEnabled ? -100 : 0,
          right: 0,
        }}>
        <Fab
          aria-label="Editar"
          color="success"
          type="submit"
          variant={editEnabled ? 'extended' : 'circular'}
        >
          {
            editEnabled
              ? <><Check size="large" sx={{ mr: 1 }} /><span>Confirmar</span></>
              : <Edit size="large" />
          }
        </Fab>
      </Tooltip>
    </Box >
  );
};

export default Customer;
