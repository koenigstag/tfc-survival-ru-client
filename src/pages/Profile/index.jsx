import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, getUserAsync } from '@/app/slices/userSlice';

const ProfilePage = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserAsync('test1'));
    return () => {
      // cleanup;
    };
  }, [dispatch]);

  return (
    <div>
      <div>{user.status}</div>
      <div>{JSON.stringify(user.data)}</div>
    </div>
  );
};

export default ProfilePage;
