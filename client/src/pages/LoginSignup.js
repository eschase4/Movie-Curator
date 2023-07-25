import React from 'react';
import Signup from '../components/SignUp';
import Login from '../components/Login';

const LoginSignup = () => {
  return (
    <div className='container d-flex justify-content-center align-items-center vh-75 mt-5'>
      <div className='row w-100 mt-5'>
        <div className='col-md-6 mt-5 mb-5'>
          <Login />
        </div>
        <div className='col-md-6 mt-5'>
          <Signup />
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
