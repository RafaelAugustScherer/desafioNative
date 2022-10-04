import React from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Breadcrumbs, Link } from '@mui/material';

const CustomBreadcrumbs = ({ customerName }) => {
  const location = useLocation();

  const getRouteEntries = () => (
    location.pathname.split('/').slice(1)
  );

  return (
    <Breadcrumbs>
      <Link underline="hover" color="inherit" href="/">
        Home
      </Link>
      {
        getRouteEntries().map((value, idx, arr) => {
          if (idx % 2 === 0) return;
          const href = `/${arr.slice(0, idx + 1).join('/')}`;

          if (arr[idx - 1] === 'customer') value = customerName;

          return (
            <Link key={`breadcrumbs-${idx}`} underline="hover" color="inherit" href={href}>
              { decodeURI(value) }
            </Link>
          );
        })
      }
    </Breadcrumbs>
  );
};

CustomBreadcrumbs.propTypes = {
  customerName: PropTypes.string,
};

export default CustomBreadcrumbs;
