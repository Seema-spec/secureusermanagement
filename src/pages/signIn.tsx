import React from 'react';
import { useDispatch } from 'react-redux';
import { setAuth } from '../features/auth/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import AuthForm from '../utils/authForm';
import { ToastContainer, toast } from 'react-toastify';
import { signIn } from '../services/httpService';

const SignIn: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleSignIn = async (data: { email: string; password: string }) => {
    try {
      const response = await signIn(data.email, data.password);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      dispatch(setAuth(response.data));
      toast.success('Sign In successful!');
      setTimeout(()=>{
        navigate('/dashboard');
      },1000)
    } catch (error) {
      console.error(error);
      toast.error('Sign In failed. Please check your credentials and try again.');
    }
  };

  return (
    <div className="fullscreen-container flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <AuthForm onSubmit={handleSignIn} type="signIn" />
        <ToastContainer/>
        <div className="mt-4 text-center">
          <p className="text-sm">Don't have an account?</p>
          <Link to="/signup">
            <button className="mt-2 px-4 py-2 bg-green-500 text-white w-full max-w-xs">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
