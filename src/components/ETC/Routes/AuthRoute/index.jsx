import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '@/app/slices/userSlice';

const AuthRoute = ({ exact, path, component }) => {
  const user = useSelector(selectUser);
  // console.log('auth', user);
  if (user.status === 'error' || user.data.nickname === null) {
    return <Redirect to='/account/login' />;
  }

  return <Route exact={exact} path={path} component={component} />;
};

export default AuthRoute;
