import React from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

<GoogleLogin
  onSuccess={credentialResponse => {
    console.log(credentialResponse);
  }}
  onError={() => {
    console.log('Login Failed');
  }}
/>;

const GoogleLoginButton = ({ onSuccess, onFailure }) => {
  return (
    <GoogleOAuthProvider
      clientId="YOUR_GOOGLE_CLIENT_ID"
      buttonText="Login with Google"
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={'single_host_origin'}
    />
  );
};

export default GoogleLoginButton;
