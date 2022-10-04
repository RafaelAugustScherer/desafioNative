import React, { createContext, useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import PropTypes from 'prop-types';
import axios from 'axios';

export const CustomerContext = createContext();

const CustomerProvider = ({ children }) => {
  const { REACT_APP_SERVER } = process.env;
  const [ cookies ] = useCookies([ 'desafioNative-token' ]);
  const [ customers, setCustomers ] = useState([]);
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ customersByCity, setCustomersByCity ] = useState([]);
  const [ states, setStates ] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  const fetchTotalCustomersByCity = async () => {
    const response = await axios.get(
      `${REACT_APP_SERVER}/customer/total/by/city`,
      { headers: { 'Authorization': cookies[ 'desafioNative-token' ] } },
    );

    setCustomersByCity(response.data);
  };

  const fetchCustomersByCity = async () => {
    console.log(location);
    const url = `${REACT_APP_SERVER}/customer/` +
      `?city=${params.cityName}&limit=20&offset=${(currentPage - 1) * 20}`;

    const response = await axios.get(
      url,
      { headers: { 'Authorization': cookies[ 'desafioNative-token' ] } },
    );

    setCustomers(response.data);
  };

  const filterStates = () => {
    const states = customersByCity.map(({ city }) => (
      city.split(', ')[ 1 ]
    ));

    setStates(Array.from(new Set(states)));
  };

  const value = {
    customersByCity,
    customers,
    states,
    setCurrentPage,
  };

  useEffect(() => {
    if (!cookies['desafioNative-token']) {
      return navigate('/login');
    }

    if (location.pathname === '/') {
      fetchTotalCustomersByCity();
    } else if (location.pathname.includes('city')) {
      fetchCustomersByCity();
    }
  }, [ location ]);

  useEffect(() => {
    customersByCity.length && filterStates();
  }, [ customers ]);

  return (
    <CustomerContext.Provider value={value}>
      {children}
    </CustomerContext.Provider>
  );
};

CustomerProvider.propTypes = {
  children: PropTypes.object,
};

export default CustomerProvider;
