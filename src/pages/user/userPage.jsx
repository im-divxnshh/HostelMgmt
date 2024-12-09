import React, { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { TextField, Button, IconButton } from '@mui/material';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import Swal from 'sweetalert2'; // SweetAlert2
import { useNavigate } from 'react-router-dom'; // Navigation

function AuthPage() {
  // States for form data
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // State for password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Initialize navigate
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    setErrorMessage('');

    // Firebase Authentication
    const auth = getAuth();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User signed in:', userCredential.user);

      // Show SweetAlert notification
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Login Successful!',
        showConfirmButton: false,
        timer: 1500,
      });

      // Navigate to user dashboard
      setTimeout(() => {
        navigate('/user-dashboard');
      }, 1500); // Wait for alert to disappear before navigating
    } catch (error) {
      console.error('Login failed:', error.message);

      // Show SweetAlert error notification
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Login Failed',
        text: error.message,
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-700">
          Login
        </h2>
        {errorMessage && <p className="text-red-500 text-sm text-center">{errorMessage}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
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
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}

export default AuthPage;
