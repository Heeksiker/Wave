// routes/userRoutes.js
const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/aprendices'); // Asegúrate de usar el nombre correcto del archivo

const router = express.Router();

// Ruta para registrar un usuario
router.post('/register', async (req, res) => {
  const { nombres, apellidos, nombreUsuario, email, nombrePrograma, numeroFicha, password } = req.body;

  try {
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ $or: [{ email }, { nombreUsuario }] });
    if (existingUser) {
      return res.status(400).json({ error: 'El email o el nombre de usuario ya están en uso' });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear y guardar el nuevo usuario
    const newUser = new User({
      nombres,
      apellidos,
      nombreUsuario,
      email,
      nombrePrograma,
      numeroFicha,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error('Error en el registro del usuario:', error); // Agrega más detalles al log
    res.status(500).json({ error: 'Error al registrar el usuario' });
  }
});

// Ruta para iniciar sesión
router.post('/login', async (req, res) => {
  const { nombreUsuario, password } = req.body;

  try {
    // Buscar al usuario por nombre de usuario
    const user = await User.findOne({ nombreUsuario });
    if (!user) {
      return res.status(400).json({ error: 'Nombre de usuario o contraseña incorrectos' });
    }

    // Comparar la contraseña proporcionada con la almacenada
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Nombre de usuario o contraseña incorrectos' });
    }

    // Si la autenticación es exitosa
    res.status(200).json({ message: 'Inicio de sesión exitoso', user });
  } catch (error) {
    console.error('Error al iniciar sesión:', error.message); // Asegúrate de mostrar el mensaje de error
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
});

// Ruta para verificar el email
router.post('/verify-email', async (req, res) => {
  const { email } = req.body;

  try {
    // Buscar al usuario por email
    const user = await Aprendices.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'El email no está registrado.' });
    }

    // Generar un código de verificación y establecer una fecha de expiración
    const code = crypto.randomBytes(3).toString('hex'); // Genera un código de 6 caracteres
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // Expira en 15 minutos

    // Guardar el código de verificación en la base de datos
    await Aprendices.updateOne(
      { email },
      { 
        $set: { 'verificacion.code': code, 'verificacion.expiresAt': expiresAt }
      }
    );

    res.status(200).json({ message: 'Código de verificación generado y enviado.' });
  } catch (error) {
    console.error('Error al verificar el correo:', error);
    res.status(500).json({ error: 'Error al verificar el correo: ' + (error.message || 'Error desconocido') });
  }
});

// Ruta para verificar el código
router.post('/verify-code', async (req, res) => {
  const { email, code } = req.body;

  try {
    // Buscar al usuario por email
    const user = await Aprendices.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'El email no está registrado.' });
    }

    // Verificar el código y la fecha de expiración
    if (user.verificacion.code !== code || user.verificacion.expiresAt < Date.now()) {
      return res.status(400).json({ error: 'Código de verificación inválido o ha expirado.' });
    }

    res.status(200).json({ valid: true, message: 'Código verificado correctamente.' });
  } catch (error) {
    console.error('Error al verificar el código:', error);
    res.status(500).json({ error: 'Error al verificar el código: ' + (error.message || 'Error desconocido') });
  }
});

// Ruta para actualizar la contraseña
router.post('/update-password', async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    // Buscar al usuario por email
    const user = await Aprendices.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'El email no está registrado.' });
    }

    // Hashear la nueva contraseña
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Actualizar la contraseña del usuario
    await Aprendices.updateOne(
      { email },
      { $set: { password: hashedPassword, 'verificacion.code': null, 'verificacion.expiresAt': null } }
    );

    res.status(200).json({ success: true, message: 'Contraseña actualizada exitosamente.' });
  } catch (error) {
    console.error('Error al actualizar la contraseña:', error);
    res.status(500).json({ error: 'Error al actualizar la contraseña: ' + (error.message || 'Error desconocido') });
  }
});


module.exports = router;
