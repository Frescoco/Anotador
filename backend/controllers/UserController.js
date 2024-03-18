// Archivo: backend/controllers/UserController.js

import UserModel from '../models/UserModel.js';

// Controlador para registrar un nuevo usuario
export const registerUser = async (req, res) => {
  try {
    // Extraer datos del cuerpo de la solicitud
    const { email, password } = req.body;

    // Verificar si el usuario ya existe en la base de datos
    const existingUser = await UserModel.findOne({ email });

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
