import React, { useState } from 'react';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleRegister = () => {
    if (!email || !password) {
      setError('Por favor, completa todos los campos.');
      setSuccess(false); // Restablece el éxito si hay errores
      return;
    }

    // Validar el formato del correo electrónico usando una expresión regular
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+(\.[^\s@]+)*$/;
    if (!emailRegex.test(email)) {
      setError('Por favor, ingresa un correo electrónico válido.');
      setSuccess(false); // Restablece el éxito si hay errores
      return;
    }

    // Almacenar el usuario y la contraseña en localStorage
    localStorage.setItem('registeredEmail', email);
    localStorage.setItem('registeredPassword', password);

    // Simulando registro exitoso
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
