import React from 'react';

const FieldError = ({ name, errors, touched, tag }) => {
  const prepTag = tag || 'span';
  return React.createElement(
    prepTag,
    {},
    errors[name] && touched[name] ? errors[name] : ''
  );
};

export default FieldError;
