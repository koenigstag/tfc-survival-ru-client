import React from 'react';
import styles from './FieldError.module.sass';

const FieldError = ({ text, name, errors, touched, tag, children }) => {
  const prepTag = tag || 'span';
  return (
    <label style={{ display: 'block', position: 'relative' }}>
      {text ? <div>{text}</div> : null}
      {children}
      {errors[name] && touched[name] && React.createElement(
        prepTag,
        { className: styles.fieldError },
         errors[name]
      )}
    </label>
  );
};

export default FieldError;
