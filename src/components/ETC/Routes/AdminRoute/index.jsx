import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '@/app/slices/userSlice';

const AdminRoute = ({ exact, path, component }) => {
  const user = useSelector(selectUser);
  // console.log('admin', user);
  if (!user.admin || user.status === 'error' || user.data.nickname === null) {
    return <Redirect to='/404' />;
  }

  return <Route exact={exact} path={path} component={component} />;
};

export default AdminRoute;
