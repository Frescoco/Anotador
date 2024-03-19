import React, { useEffect, useState } from 'react';

const User = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loggedInEmail = localStorage.getItem('loggedInEmail');
    if (!loggedInEmail) {
      setError('No se encontró ningún usuario registrado.');
      setLoading(false);
      return;
    }

    setUserData({ email: loggedInEmail });
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Datos del Usuario</h2>
      {userData && (
        <div>
          <p>Email: {userData.email}</p>
        </div>
      )}
    </div>
  );
};

export default User;
