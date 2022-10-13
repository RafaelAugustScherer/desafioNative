import { createContext, useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import PropTypes from 'prop-types';
import axios from 'axios';
import { io } from 'socket.io-client';

export const CustomerContext = createContext();

const CustomerProvider = ({ children }) => {
  const { REACT_APP_SERVER, REACT_APP_WS_SERVER } = process.env;
  const [ cookies ] = useCookies([ 'desafioNative-token' ]);
  const [ customers, setCustomers ] = useState([]);
  const [ cityList, setCityList ] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const socket = io(REACT_APP_WS_SERVER, {
    auth: {
      token: cookies['desafioNative-token'],
    },
  });

  const fetchTotalCustomersByCity = async () => {
    const response = await axios.get(
      `${REACT_APP_SERVER}/customer/total/by/city`,
      { headers: { 'Authorization': cookies[ 'desafioNative-token' ] } },
    );

    setCityList(response.data);
  };

  const fetchCustomersByCity = async () => {
    const url = `${REACT_APP_SERVER}/customer/` +
      `?city=${params.cityName}`;

    const response = await axios.get(
      url,
      { headers: { 'Authorization': cookies[ 'desafioNative-token' ] } },
    );

    setCustomers(response.data);
  };

  const updateCustomerById = async (id, payload) => {
    const url = `${REACT_APP_SERVER}/customer/${id}`;
    socket.emit('updateCustomer', { id, ...payload });
    try {
      const response = await axios.patch(
        url,
        payload,
        { headers: { 'Authorization': cookies['desafioNative-token'] } },
      );

      return response.data;
    } catch (e) {
      return e.response.data;
    }
  };

  const value = {
    cityList,
    customers,
    updateCustomerById,
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
    socket.on('updatedCustomer', (updatedCustomer) => {
      setCustomers((curValue) => (
        curValue.map((stateCustomer) => stateCustomer.id === updatedCustomer.id
          ? updatedCustomer
          : stateCustomer,
        )
      ));
    });
  }, []);

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
