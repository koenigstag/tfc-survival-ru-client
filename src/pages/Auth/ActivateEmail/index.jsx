import React, { useLayoutEffect, useState } from 'react'
import { Link, Redirect, useLocation } from 'react-router-dom';
import { sendActivationRequest } from 'api/authAPI';

export const ActivateEmailPage = () => {
  const { search } = useLocation();

  const query = new URLSearchParams(search);

  const link = query.get('link');

  const [jsx, setjsx] = useState(<></>);

  useLayoutEffect(() => {
    const emailActivate = async () => {
      try {
        const response = await sendActivationRequest(link);

        if (response.status === 202) {
          setjsx(<h2><span>✅</span> Ваша почта успешно активирована. <Link to="/account/login">Войти в учетную запись</Link></h2>);
        }
      } catch (error) {
        setjsx(<h2><span>❌</span> Активация почты не пройдена. Пожалуйста попробуйте еще раз или обратитесь к администрации.</h2>);
      }
    }

    if (link) {
      emailActivate();
    }
  }, [link]);

  if (!link) {
    return <Redirect to="/" />
  }

  return (
    <div>
      {jsx}
    </div>
  )
}

export default ActivateEmailPage;
