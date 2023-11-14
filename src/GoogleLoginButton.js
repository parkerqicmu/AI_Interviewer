import React from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import './GoogleLoginButton.css';
import { render } from '@testing-library/react';

function GoogleLoginButton() {
  const responseMessage = (response) => {
      console.log('Login successful:', response);
  };
  const errorMessage = (error) => {
      console.log(error);
  };
  return (
      <div>
          <h2>Login</h2>
          <br />
          <br />
          <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
      </div>
  )
}
export default GoogleLoginButton;


// const GoogleLoginButton = ({ onSuccess, onFailure }) => {
//   return (
//     <GoogleOAuthProvider
//       clientId="1052692314440-1964crjte1jbd1uihhl9bjunnuah82mj.apps.googleusercontent.com"
//       buttonText="Login with Google"
//       onSuccess={onSuccess}
//       onFailure={onFailure}
//       cookiePolicy={'single_host_origin'}
//       className="google-login-button"
//     />
//   );
// };

// export default GoogleLoginButton;
