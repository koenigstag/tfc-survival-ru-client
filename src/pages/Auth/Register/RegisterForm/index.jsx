import React from 'react';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { registerUserAsync } from '@/app/slices/userSlice';

const RegisterForm = () => {

  const dispatch = useDispatch();
  
  return (
    <Formik
      initialValues={{
        nickname: '',
        email: '',
        password: '',
        confpassword: '',
      }}
      onSubmit={(values, formikBag) => {
        
        dispatch(registerUserAsync(values));
        alert(JSON.stringify(values));
        formikBag.resetForm();
      }}
    >
      {props => (
        <form onSubmit={props.handleSubmit}>
          <input
            type='text'
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            value={props.values.nickname}
            required
            name='nickname'
          />
          <input
            type='email'
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            value={props.values.email}
            required
            name='email'
          />
          <input
            type='password'
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            value={props.values.password}
            required
            name='password'
          />
          <input
            type='password'
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            value={props.values.confpassword}
            required
            name='confpassword'
          />

          {props.errors.name && <div id='feedback'>{props.errors.name}</div>}
          <button type='submit'>Submit</button>
        </form>
      )}
    </Formik>
  );
};

export default RegisterForm;
