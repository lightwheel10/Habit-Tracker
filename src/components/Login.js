import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';

const Login = ({ setIsLoggedIn, setUserType }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password },
        {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      }
    );
      localStorage.setItem('token', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      setIsLoggedIn(true);
      setUserType('returning');
      localStorage.setItem('userType', 'returning');
      navigate('/dashboard'); // Redirect to dashboard after successful login
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      setError(err.response?.data?.msg || 'Invalid credentials');
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <Link to="/" className="text-indigo-600 hover:text-indigo-500">
          <Home size={24} />
        </Link>
        <h1 className="text-2xl font-bold text-indigo-600">HabitTracker</h1>
      </div>
      <div className="max-w-md w-full mx-auto space-y-8">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Log in to your account</h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input id="email-address" name="email" type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
          </div>

          {error && <p className="mt-2 text-center text-sm text-red-600">{error}</p>}

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link to="/forgot-password" className="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Log in
            </button>
          </div>
        </form>

        <div className="text-center">
          <p className="mt-2 text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;