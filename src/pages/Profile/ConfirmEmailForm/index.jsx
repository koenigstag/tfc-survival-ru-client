import React from 'react';
import ButtonLink from '@/components/ETC/ButtonLink';

const ConfirmEmailForm = ({ user }) => {
  // TODO confirm
  const confirmEmail = () => {
    // send email
  };

  return <ButtonLink onClick={confirmEmail} text='Подтвердить почту' />;
};

export default ConfirmEmailForm;
