import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    if (!email || !password) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Por favor, ingresa un correo electrónico válido.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/users/register', {
        email,
        password,
      });
      console.log(response.data); // Maneja la respuesta según sea necesario
    } catch (error) {
      console.error('Error al registrar:', error);
      setError(error.response.data.message); // Mostrar el mensaje de error del servidor
    }
  };

  const validateEmail = (email) => {
    // Expresión regular para validar el formato de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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
    </div>
  );
};

export default Register;
