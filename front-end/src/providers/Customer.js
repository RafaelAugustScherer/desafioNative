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
  const [ cityList, setCityList ] = useState([]);
  const [ states, setStates ] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  const fetchTotalCustomersByCity = async () => {
    const response = await axios.get(
      `${REACT_APP_SERVER}/customer/total/by/city`,
      { headers: { 'Authorization': cookies[ 'desafioNative-token' ] } },
    );

    setCityList(response.data);
  };

  const fetchCustomersByCity = async () => {
    const url = `${REACT_APP_SERVER}/customer/` +
      `?city=${params.cityName}&limit=10&offset=${(currentPage - 1) * 10}`;

    const response = await axios.get(
      url,
      { headers: { 'Authorization': cookies[ 'desafioNative-token' ] } },
    );

    setCustomers(response.data);
  };

  const fetchCustomerById = async (id) => {
    const url = `${REACT_APP_SERVER}/customer/${id}`;

    try {
      const response = await axios.get(
        url,
        { headers: { 'Authorization': cookies['desafioNative-token'] } },
      );

      return response;
    } catch (e) {
      return e.response.data;
    }
  };

  const filterStates = () => {
    const states = cityList.map(({ city }) => (
      city.split(', ')[ 1 ]
    ));

    setStates(Array.from(new Set(states)));
  };

  const value = {
    cityList,
    customers,
    states,
    currentPage,
    setCurrentPage,
    fetchCustomerById,
  };

  useEffect(() => {
    if (!cookies['desafioNative-token'] && Location.pathname !== '/login') {
      return navigate('/login');
    }

    fetchTotalCustomersByCity();

    if (location.pathname.includes('city')) {
      fetchCustomersByCity();
    }
  }, [ location ]);

  useEffect(() => {
    fetchCustomersByCity();
  }, [currentPage]);

  useEffect(() => {
    cityList.length && filterStates();
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
