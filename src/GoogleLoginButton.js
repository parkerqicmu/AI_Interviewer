import React from 'react';
//import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import './GoogleLoginButton.css';

// function GoogleLog(){
//   <GoogleLogin
//     onSuccess={credentialResponse => {
//       console.log(credentialResponse);
//     }}
//     onError={() => {
//       console.log('Login Failed');
//     }}
//   />;
// }

function GoogleLoginButton() {
  const handleClick = () => {
    window.location.href = 'http://127.0.0.1:5000/google_login';
  };

  return (
    <button onClick={handleClick}>
      Login with Google
    </button>
  );
}

export default GoogleLoginButton;
