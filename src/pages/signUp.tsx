import React from 'react';
import AuthForm from '../utils/authForm';
import { ToastContainer, toast } from 'react-toastify';
import { signUp } from '../services/httpService';

const SignUp: React.FC = () => {
  const handleSignUp = async (data: { email: string; password: string }) => {
    try {
      const response = await signUp(data.email, data.password);
      if (response?.token) {
        toast.success('Sign Up successful!');
      } else {
        throw new Error('Unexpected response structure');
      }
    } catch (error) {
      console.error(error);
      toast.error('Sign Up failed. Please try again.');
    }
  };

  return (
    <div className="fullscreen-container flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <AuthForm onSubmit={handleSignUp} type="signUp" />;
      <ToastContainer/>
    </div>
  )
};

export default SignUp;
