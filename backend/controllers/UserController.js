// Importa el modelo de usuario y la biblioteca bcrypt
import UserModel from '../models/UserModel.js';
import bcrypt from 'bcrypt';

// Controlador para registrar un nuevo usuario
export const registerUser = async (req, res) => {
  try {
    // Extraer datos del cuerpo de la solicitud
    const { email, password } = req.body;

    // Buscar el usuario en la base de datos por su correo electrónico
    const existingUser = await UserModel.findOne({ email });

    // Verificar si el usuario ya existe
    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya existe. Por favor, inicia sesión.' });
    }

    // Crear un nuevo usuario
    const newUser = new UserModel({ email, password });
    await newUser.save();

    res.status(201).json({ message: 'Usuario registrado correctamente' });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor. Por favor, intenta nuevamente.' });
  }
};

// Controlador para iniciar sesión
export const loginUser = async (req, res) => {
    try {
      // Extraer datos del cuerpo de la solicitud
      const { email, password } = req.body;
  
      // Buscar el usuario en la base de datos por su correo electrónico
      const user = await UserModel.findOne({ email });
  
      // Verificar si el usuario existe
      if (!user) {
        return res.status(400).json({ message: 'Correo electrónico no registrado. Por favor, registra una cuenta.' });
      }
  
      // Verificar la contraseña en texto plano (sin encriptar)
      if (password !== user.password) {
        // Diferenciar entre usuario existente y contraseña incorrecta para mejorar la seguridad
        return res.status(400).json({ message: 'Credenciales incorrectas. Por favor, verifica tu correo electrónico o contraseña.' });
      }
  
      // Si las credenciales son válidas, puedes generar un token de autenticación aquí
  
      res.status(200).json({ message: 'Inicio de sesión exitoso' });
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      res.status(500).json({ message: 'Error interno del servidor. Por favor, intenta nuevamente.' });
    }
  };