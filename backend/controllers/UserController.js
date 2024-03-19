import UserModel from '../models/UserModel.js';

export const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya existe. Por favor, inicia sesión.' });
    }

    const newUser = new UserModel({ email, password });
    await newUser.save();

    res.status(201).json({ message: 'Usuario registrado correctamente' });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor. Por favor, intenta nuevamente.' });
  }
};

export const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await UserModel.findOne({ email });
  
      if (!user) {
        return res.status(400).json({ message: 'Correo electrónico no registrado. Por favor, registra una cuenta.' });
      }
      if (password !== user.password) {
        return res.status(400).json({ message: 'Credenciales incorrectas. Por favor, verifica tu correo electrónico o contraseña.' });
      }
  
  
      res.status(200).json({ message: 'Inicio de sesión exitoso' });
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      res.status(500).json({ message: 'Error interno del servidor. Por favor, intenta nuevamente.' });
    }
  };
  export const getUserData = async (req, res) => {
    try {
      const { email } = req.params; 
      const user = await UserModel.findOne({ email }); 
  
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
  
      res.status(200).json(user);
    } catch (error) {
      console.error('Error al obtener los datos del usuario:', error);
      res.status(500).json({ message: 'Error interno del servidor. Por favor, intenta nuevamente.' });
    }
  };