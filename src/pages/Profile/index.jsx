import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, selectStatus, getUserAsync } from '@/app/slices/userSlice';

const ProfilePage = () => {
  const user = useSelector(selectUser);
  const status = useSelector(selectStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserAsync('test1'));
    return () => {
      // cleanup;
    };
  }, [dispatch, user]);

  return (
    <div>
      <div>{status}</div>
      <div>{JSON.stringify(user)}</div>
    </div>
  );
};

export default ProfilePage;
