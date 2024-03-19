import React, { useState } from 'react';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleRegister = () => {
    if (!email || !password) {
      setError('Por favor, completa todos los campos.');
      setSuccess(false); 
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+(\.[^\s@]+)*$/;
    if (!emailRegex.test(email)) {
      setError('Por favor, ingresa un correo electrónico válido.');
      setSuccess(false); 
      return;
    }

    localStorage.setItem('registeredEmail', email);
    localStorage.setItem('registeredPassword', password);

    setSuccess(true);
  };

  return (
    <div>
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {success && !error && (
        <div style={{ color: 'green' }}>Usuario creado correctamente! <button onClick={() => window.location.href='/login'}>Ir al login</button></div>
      )}
    </div>
  );
};

export default Register;
