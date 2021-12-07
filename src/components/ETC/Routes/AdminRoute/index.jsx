import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from 'app/slices/userSlice';
import CONSTANTS from '../../../../constants';

const AdminRoute = ({ exact, path, component }) => {
  const user = useSelector(selectUser);
  const adminToken = localStorage.getItem(CONSTANTS.ADMIN_TOKEN);

  if (
    !adminToken ||
    user.data?.role !== 'admin' ||
    user.status === 'error' ||
    user.isAuth === false
  ) {
    return <Redirect to='/404' />;
  }

  return <Route exact={exact} path={path} component={component} />;
};

export default AdminRoute;
