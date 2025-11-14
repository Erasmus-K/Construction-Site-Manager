import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { user, login } = useAuth();

  if (user) {
    return <Navigate to="/app/dashboard" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(formData.username, formData.password, formData.role);
    
    if (!result.success) {
      setError(result.error);
    }
    
    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-md w-full mx-4">
        <form className="bg-white shadow-xl rounded-lg p-8" onSubmit={handleSubmit}>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Construction Site Manager</h2>
            <p className="text-gray-600 mt-2">Please sign in to continue</p>
            <a href="/" className="text-blue-600 hover:text-blue-800 text-sm">← Back to Home</a>
          </div>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
              <input
                type="text"
                name="username"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
              <select
                name="role"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="site_agent">Site Agent</option>
                <option value="client">Client</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                name="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            
            <button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="text-blue-600 hover:text-blue-800 font-medium">
                Sign Up
              </Link>
            </p>
          </div>

          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-gray-700 mb-2">Demo Accounts:</p>
            <div className="text-xs text-gray-600 space-y-1">
              <p>Admin: <span className="font-mono bg-gray-200 px-1 rounded">admin / admin123</span></p>
              <p>Site Agent: <span className="font-mono bg-gray-200 px-1 rounded">agent1 / agent123</span></p>
              <p>Client: <span className="font-mono bg-gray-200 px-1 rounded">client1 / client123</span></p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;