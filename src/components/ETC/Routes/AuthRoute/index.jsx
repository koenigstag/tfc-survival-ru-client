import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { refreshUserAsync, selectUser } from 'app/slices/userSlice';

const AuthRoute = ({ exact, path, component }) => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  if (user.status === 'error' || user.data.nickname === null) {
    if (user.data.nickname === null) {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        console.log('refreshToken');
        dispatch(refreshUserAsync(refreshToken))
      }
      else {
        return <Redirect to='/account/login' />;
      }
    }
  }

  return <Route exact={exact} path={path} component={component} />;
};

export default AuthRoute;
