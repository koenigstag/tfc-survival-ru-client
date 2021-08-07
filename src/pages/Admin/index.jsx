import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '@/app/slices/userSlice';

const AdminPage = () => {
  const user = useSelector(selectUser);

  return (
    <pre
      dangerouslySetInnerHTML={{
        __html: `User store: \n${JSON.stringify(user, null, 4)}`,
      }}
    ></pre>
  );
};

export default AdminPage;
