import React, { useState } from 'react';

function LoginPage() {
  // State to hold form data
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation (could be expanded with more checks)
    if (!email || !password) {
      setErrorMessage('Please fill in both fields');
      return;
    }

    // Clear error if input is valid
    setErrorMessage('');

    // Simulate form submission (this could be an API call)
    console.log('Email:', email);
    console.log('Password:', password);

    // Redirect or update state after successful login
    // Example: history.push('/dashboard');
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
