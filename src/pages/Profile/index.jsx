import React from 'react';
import { useSelector } from 'react-redux';
import ChangePasswordForm from './ChangePasswordForm';
import { selectUser } from '@/app/slices/userSlice';

const ProfilePage = () => {
  const user = useSelector(selectUser);

  return (
    <div>
      <div>{JSON.stringify(user.data, null, 4)}</div>
      <ChangePasswordForm />
    </div>
  );
};

export default ProfilePage;
