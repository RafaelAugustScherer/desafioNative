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
  const [pageCustomers, setPageCustomers] = useState([]);
  const [states, setStates] = useState([]);
  const navigate = useNavigate();

  const fetchCustomers = async (limit, offset) => {
    const url = `${REACT_APP_SERVER}/customer/?` +
    `${limit ? `limit=${limit}` : ''}` +
    `${offset ? `offset=${offset}` : ''}`;

    const response = await axios.get(
      url,
      { headers: { 'Authorization': cookies['desafioNative-token'] } },
    );

    if (limit || offset) {
      setPageCustomers(response.data);
    } else {
      setCustomers(response.data);
      setPageCustomers(response.data.slice(0, 20));
    }
  };

  const filterStates = () => {
    const states = customers.map(({ city }) => (
      city.split(', ')[1]
    ));

    setStates(Array.from(new Set(states)));
  };

  const value = {
    pageCustomers,
    customersLength: customers.length,
    states,
  };

  useEffect(() => {
    if (!cookies['desafioNative-token']) {
      return navigate('/login');
    }
    fetchCustomers();
  }, []);

  useEffect(() => {
    customers.length && filterStates();
  }, [customers]);

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
