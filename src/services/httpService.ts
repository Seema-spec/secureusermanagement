import axios from 'axios';

const API_URL = 'https://reqres.in/api';

const http = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const signIn = (email: string, password: string) => {
  return http.post('/login', { email, password });
};

export const signUp = async (email:String, password:String) => {
  const response = await fetch('https://reqres.in/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
};

export const fetchUsers = () => {
  return http.get('/users');
};
