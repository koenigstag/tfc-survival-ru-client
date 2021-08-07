import React from 'react';

const FieldError = ({ name, errors, touched }) => {
  return (
    <>
      {errors[name] && touched[name] ? <div>{errors[name]}</div> : <div></div>}
    </>
  );
};

export default FieldError;
