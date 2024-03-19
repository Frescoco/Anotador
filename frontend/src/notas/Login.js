import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      setError('Por favor, completa todos los campos.');
      return;
    }
  
    // Verificar si el email tiene un formato válido
    if (!validateEmail(email)) {
      setError('Por favor, ingresa un correo electrónico válido.');
      return;
    }
  
    // Verificar si el usuario existe en el almacenamiento local
    const storedEmail = localStorage.getItem('registeredEmail');
    const storedPassword = localStorage.getItem('registeredPassword');
    
    if (email !== storedEmail || password !== storedPassword) {
      setError('El usuario o la contraseña son incorrectos.');
      return;
    }
  
    // Simulando inicio de sesión exitoso
    localStorage.setItem('loggedInEmail', email);
    window.location.href = '/';
  };

  // Función para validar el formato del correo electrónico
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+(\.[^\s@]+)*$/;
    return emailRegex.test(email);
  };

  // Si no se ha iniciado sesión, muestra el formulario de inicio de sesión
  return (
    <div>
      <h2>Login</h2>
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
      <button onClick={handleLogin}>Login</button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default Login;
