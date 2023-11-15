import React from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import logoImage from '../asset/AI-Interviewer-logo.jpg';

const Home = () => {
    const navigate = useNavigate();

    const handleLoginSuccess = async (response) => {
        console.log("Login Success:", response);
        const token = response.credential;
        const profile = response.profile;
        try {
            const backendResponse = await fetch('http://localhost:8000/signin_google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: token,
                    profile: profile,
                }),
            });
            if (!backendResponse.ok) {
                throw new Error('Failed to send data to backend');
            }
            const backendData = await backendResponse.text();
            console.log('Response from backend:', backendData);
            navigate('/mockInterview');
        } catch (error) {
            console.error('Error:', error);
        }
    };
    

    const handleLoginFailure = (response) => {
        console.log("Login Failed:", response);
        // Handle login failure
    };

    return (
        <GoogleOAuthProvider clientId="1052692314440-1964crjte1jbd1uihhl9bjunnuah82mj.apps.googleusercontent.com">
            <div style={{ display: 'flex', height: '100vh', alignItems: 'center' }}>
                <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                    <img src={logoImage} alt="logo" style={{ maxWidth: '100%', maxHeight: '80%', height: 'auto' }} />
                </div>
                <div style={{ width: '2px', backgroundColor: '#E9E9F4', height: '100%' }}></div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                    <h1>Login</h1>
                    <GoogleLogin
                        onSuccess={handleLoginSuccess}
                        onFailure={handleLoginFailure}
                        useOneTap
                    />
                </div>
            </div>
        </GoogleOAuthProvider>
    );
};

export default Home;
