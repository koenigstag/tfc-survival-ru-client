import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '@/app/slices/userSlice';

const NoAuthRoute = ({ exact, path, component }) => {
  const user = useSelector(selectUser);
  // console.log('no auth', user);
  if (user.status === 'idle' && user.data.nickname !== null) {
    return <Redirect to='/profile' />;
  }

  return <Route exact={exact} path={path} component={component} />;
};

export default NoAuthRoute;
