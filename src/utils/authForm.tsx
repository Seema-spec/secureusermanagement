import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


interface AuthFormProps {
  onSubmit: (data: any) => void;
  type: 'signIn' | 'signUp';
}

const AuthForm: React.FC<AuthFormProps> = ({ onSubmit, type }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const navigate = useNavigate(); 
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
  
  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!email || !validateEmail(email)) errors.email = 'Invalid email address';
    if (!password || password.length < 6) errors.password = 'Password must be at least 6 characters';
    if (type === 'signUp') {
      if (!firstName) errors.firstName = 'First name is required';
      if (!lastName) errors.lastName = 'Last name is required';
    }
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      try {
        await onSubmit(type === 'signUp' ? { email, password, firstName, lastName } : { email, password });
        if (type === 'signUp') {
          navigate('/'); 
        }
      } catch (error) {
        console.error('Submission error:', error);
      }
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md p-8 space-y-6">
      <h1 className="text-2xl font-bold">{type === 'signIn' ? 'Sign In' : 'Sign Up'}</h1>
      {type === 'signUp' && (
        <>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={`w-full px-4 py-2 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="First Name"
          />
          {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className={`w-full px-4 py-2 border ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Last Name"
          />
          {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
        </>
      )}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={`w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
        placeholder="Email"
      />
      {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={`w-full px-4 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
        placeholder="Password"
      />
      {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
      <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white hover:bg-blue-600">
        {type === 'signIn' ? 'Sign In' : 'Sign Up'}
      </button>
    </form>
  );
};

export default AuthForm;
