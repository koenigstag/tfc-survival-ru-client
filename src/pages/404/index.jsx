import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const PageNotFound = () => {
  const history = useHistory();
  
  useEffect(() => {
    // effect
    history.push('/404');

    return () => {
      // cleanup
    };
  }, [history]);

  return (
    <div>
      <div>404 - Страница не найдена</div>
      <div></div>
    </div>
  );
};

export default PageNotFound;
