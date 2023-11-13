import React from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import './GoogleLoginButton.css';

function GoogleLog(){
  <GoogleLogin
    onSuccess={credentialResponse => {
      console.log(credentialResponse);
    }}
    onError={() => {
      console.log('Login Failed');
    }}
  />;
}

const GoogleLoginButton = ({ onSuccess, onFailure }) => {
  return (
    <GoogleOAuthProvider
      clientId="1052692314440-1964crjte1jbd1uihhl9bjunnuah82mj.apps.googleusercontent.com"
      buttonText="Login with Google"
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={'single_host_origin'}
      className="google-login-button"
    />
  );
};

export default GoogleLoginButton;
