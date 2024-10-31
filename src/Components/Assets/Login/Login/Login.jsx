import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'; 
import backgroundVideoDark from '../img/login.mp4'; 

const InicioSesion = ({ onLogin }) => {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', { nombreUsuario, password });
      setSuccess('Inicio de sesión exitoso');
      setError('');
      onLogin(response.data.user); // Aquí se maneja la respuesta del servidor
      navigate('/inicio');
    } catch (error) {
      console.error('Error en Axios:', error); // Agrega este console.log para ver más detalles
      setError('Error al iniciar sesión: ' + (error.response?.data?.error || 'Error desconocido'));
      setSuccess('');
    }
  };
  
  
  return (
    <div className="login-container">
      <video className="background-video" autoPlay muted loop>
        <source src={backgroundVideoDark} type="video/mp4" />
        Tu navegador no soporta la etiqueta de video.
      </video>

      <div className="login-box">
        <h2 className="subtitle">Iniciar Sesión</h2>
        <form onSubmit={handleLogin}>
          <input 
            type="text" 
            placeholder="Nombre de Usuario" 
            className="input-field" 
            value={nombreUsuario} 
            onChange={(e) => setNombreUsuario(e.target.value)} 
          />
          <input 
            type="password" 
            placeholder="Contraseña" 
            className="input-field" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          <button type="submit" className="submit-button">Iniciar Sesión</button>
        </form>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <p>
          ¿No tienes una cuenta? <Link to="/registro" className="link">Registrarse</Link>
        </p>
        <p>
          ¿Se te olvidó la contraseña? <Link to="/verificacion" className="link">Recuperar</Link>
        </p>
      </div>
    </div>
  );
};

export default InicioSesion;
