import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import PropTypes from 'prop-types';
import axios from 'axios';

export const CustomerContext = createContext();

const CustomerProvider = ({ children }) => {
  const { REACT_APP_SERVER } = process.env;
  const [cookies] = useCookies(['desafioNative-token']);
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();

  const fetchCustomers = async () => {
    const response = await axios.get(
      `${REACT_APP_SERVER}/customer`,
      { headers: { 'Authorization': cookies['desafioNative-token'] } },
    );

    setCustomers(response.data);
  };

  const value = {
    customers,
  };

  useEffect(() => {
    if (!cookies['desafioNative-token']) {
      return navigate('/login');
    }
    fetchCustomers();
  }, []);

  return (
    <CustomerContext.Provider value={value}>
      { children }
    </CustomerContext.Provider>
  );
};

CustomerProvider.propTypes = {
  children: PropTypes.object,
};

export default CustomerProvider;
