import React, { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { TextField, Button, IconButton } from '@mui/material';

function AuthPage() {
  // State for toggling between Login and Signup
  const [isLogin, setIsLogin] = useState(true);

  // States for form data
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  // State for password visibility
  const [showPassword, setShowPassword] = useState(false);

  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password || (isLogin === false && !name)) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    // Clear error if input is valid
    setErrorMessage('');

    // Simulate form submission (you would usually send this data to the backend)
    console.log('Email:', email);
    console.log('Password:', password);
    if (isLogin === false) {
      console.log('Name:', name); // For signup
    }

    // Redirect or update state after successful login/signup (you could use react-router)
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-700">
          {isLogin ? 'Login' : 'Sign Up'}
        </h2>
        {errorMessage && <p className="text-red-500 text-sm text-center">{errorMessage}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name field only for Signup */}
          {!isLogin && (
            <div>
              <TextField
                label="Full Name"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={!isLogin}
              />
            </div>
          )}
          <div>
            <TextField
              label="Email"
              variant="outlined"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password field with Eye Icon */}
          <div>
            <TextField
              label="Password"
              variant="outlined"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
              InputProps={{
                endAdornment: (
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />
          </div>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className="mt-4"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </Button>
        </form>

        {/* Switch between Login and Sign Up */}
        <div className="text-sm text-center text-gray-600">
          {isLogin ? (
            <p>
              Don't have an account?{' '}
              <Button
                onClick={() => setIsLogin(false)}
                color="primary"
                size="small"
              >
                Sign Up
              </Button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <Button
                onClick={() => setIsLogin(true)}
                color="primary"
                size="small"
              >
                Login
              </Button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthPage;