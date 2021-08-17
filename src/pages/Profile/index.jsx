import React from 'react';
import { useSelector } from 'react-redux';
import ChangePasswordForm from './ChangePasswordForm';
import { selectUser } from '@/app/slices/userSlice';
import UploadSkinForm from './UploadSkinForm';
import UploadCapeForm from './UploadCapeForm';
import LinkDiscordForm from './LinkDiscordForm';

const ProfilePage = () => {
  const user = useSelector(selectUser);

  return (
    <div>
      <div>{JSON.stringify(user.data, null, 4)}</div>
      <ChangePasswordForm user={user} />
      <UploadSkinForm user={user} />
      <UploadCapeForm user={user} />
      <LinkDiscordForm user={user} />
    </div>
  );
};

export default ProfilePage;
