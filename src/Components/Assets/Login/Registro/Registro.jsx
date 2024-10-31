import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Registro.css';
import backgroundVideoLight from '../img/login.mp4';

const Registro = () => {
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    nombreUsuario: '',
    email: '',
    nombrePrograma: '',
    numeroFicha: '',
    password: '',
    confirmarPassword: ''
  });

  const [status, setStatus] = useState({ message: '', type: '' });
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmarPassword) {
      setStatus({ message: 'Las contraseñas no coinciden', type: 'error' });
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setStatus({ message: 'Email inválido', type: 'error' });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) return;
  
    try {
      const response = await axios.post('http://localhost:5000/api/users/register', formData);
      setStatus({ message: 'Usuario registrado exitosamente', type: 'success' });
      setFormData({
        nombres: '',
        apellidos: '',
        nombreUsuario: '',
        email: '',
        nombrePrograma: '',
        numeroFicha: '',
        password: '',
        confirmarPassword: ''
      });
      setTimeout(() => {
        navigate('/inicio'); // Redirige al usuario a la página de inicio
      }, 2000); // Espera 2 segundos para que el mensaje se vea antes de redirigir
    } catch (error) {
      console.error('Error en la solicitud de registro:', error); // Agrega más detalles al log
      setStatus({
        message: `Error registrando el usuario: ${(error.response?.data?.error || 'Error desconocido')}`,
        type: 'error'
      });
    }
  };
  

  return (
    <div className="registro-container">
      <video id="background-video" className="background-video" autoPlay muted loop>
        <source src={backgroundVideoLight} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="registro-box">
        <h2 className="subtitle">Registro</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-columns">
            <div className="form-column">
              <input 
                type="text" 
                name="nombres" 
                placeholder="Nombres" 
                className="input-field" 
                onChange={handleChange} 
                value={formData.nombres} 
              />
              <input 
                type="text" 
                name="apellidos" 
                placeholder="Apellidos" 
                className="input-field" 
                onChange={handleChange} 
                value={formData.apellidos} 
              />
              <input 
                type="text" 
                name="nombreUsuario" 
                placeholder="Nombre de Usuario" 
                className="input-field" 
                onChange={handleChange} 
                value={formData.nombreUsuario} 
              />
              <input 
                type="email" 
                name="email" 
                placeholder="Email" 
                className="input-field" 
                onChange={handleChange} 
                value={formData.email} 
              />
            </div>
            <div className="form-column">
              <input 
                type="text" 
                name="nombrePrograma" 
                placeholder="Nombre de Programa" 
                className="input-field" 
                onChange={handleChange} 
                value={formData.nombrePrograma} 
              />
              <input 
                type="number" 
                name="numeroFicha" 
                placeholder="Número de Ficha" 
                className="input-field" 
                onChange={handleChange} 
                value={formData.numeroFicha} 
              />
              <input 
                type="password" 
                name="password" 
                placeholder="Contraseña" 
                className="input-field" 
                onChange={handleChange} 
                value={formData.password} 
              />
              <input 
                type="password" 
                name="confirmarPassword" 
                placeholder="Confirmar Contraseña" 
                className="input-field" 
                onChange={handleChange} 
                value={formData.confirmarPassword} 
              />
            </div>
          </div>
          <button type="submit" className="submit-button">Registrarse</button>
          {status.message && (
            <p className={status.type === 'error' ? 'error-message' : 'success-message'}>
              {status.message}
            </p>
          )}
        </form>
        <p>
          ¿Ya tiene una cuenta? <Link to="/inicio" className="link">Iniciar Sesión</Link>
        </p>
      </div>
    </div>
  );
};

export default Registro;
