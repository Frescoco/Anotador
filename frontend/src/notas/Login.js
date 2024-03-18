import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para controlar el inicio de sesión

  useEffect(() => {
    // Redireccionar al usuario a la página principal después del inicio de sesión exitoso
    if (isLoggedIn) {
      window.location.href = '/'; // Redirigir a la página principal
    }
  }, [isLoggedIn]); // Ejecutar useEffect cuando el valor de isLoggedIn cambie

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/users/login', {
        email,
        password,
      });
      console.log(response.data);
      setIsLoggedIn(true); // Establecer isLoggedIn en true después de iniciar sesión correctamente
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError(error.response.data.message);
    }
  };

  // Si isLoggedIn es true, muestra el mensaje de bienvenida
  if (isLoggedIn) {
    return (
      <div>
        <h2>Bienvenido</h2>
        <p>Has iniciado sesión correctamente.</p>
      </div>
    );
  }

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
