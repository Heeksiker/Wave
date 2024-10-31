import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Verificacion.css'; 
import backgroundVideoDark from '../img/login.mp4'; 

const Verificacion = () => {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [step, setStep] = useState('verifyEmail');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleVerifyEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/users/verify-email', { email });
      if (response.data.message) {
        setMessage(response.data.message);
        setStep('verifyCode');
      } else {
        setMessage('El email no está registrado.');
      }
    } catch (error) {
      console.error('Error al verificar el correo:', error);
      setMessage('Error al verificar el correo: ' + (error.response?.data?.error || 'Error desconocido'));
    }
    setLoading(false);
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/users/verify-code', { email, code: verificationCode });
      if (response.data.valid) {
        setMessage('Código verificado correctamente. Ahora puedes actualizar tu contraseña.');
        setStep('updatePassword');
      } else {
        setMessage('Código de verificación inválido o ha expirado.');
      }
    } catch (error) {
      console.error('Error al verificar el código:', error);
      setMessage('Error al verificar el código: ' + (error.response?.data?.error || 'Error desconocido'));
    }
    setLoading(false);
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage('Las contraseñas no coinciden.');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/users/update-password', { email, newPassword });
      if (response.data.success) {
        setMessage('Contraseña actualizada exitosamente.');
        navigate('/login');
      } else {
        setMessage(response.data.error || response.data.message);
      }
    } catch (error) {
      console.error('Error al actualizar la contraseña:', error);
      setMessage('Error al actualizar la contraseña: ' + (error.response?.data?.error || 'Error desconocido'));
    }
    setLoading(false);
  };
  return (
    <div className="login-container">
      <video className="background-video" autoPlay muted loop>
        <source src={backgroundVideoDark} type="video/mp4" />
        Tu navegador no soporta la etiqueta de video.
      </video>

      <div className="login-box">
        <h2 className="subtitle">Recuperar Contraseña</h2>
        {step === 'verifyEmail' && (
          <form onSubmit={handleVerifyEmail}>
            <input 
              type="email" 
              placeholder="Email" 
              className="input-field" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              disabled={loading}
            />
            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? 'Verificando...' : 'Verificar Email'}
            </button>
          </form>
        )}
        {step === 'verifyCode' && (
          <form onSubmit={handleVerifyCode}>
            <input 
              type="text" 
              placeholder="Código de verificación" 
              className="input-field" 
              value={verificationCode} 
              onChange={(e) => setVerificationCode(e.target.value)} 
              disabled={loading}
            />
            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? 'Verificando...' : 'Verificar Código'}
            </button>
          </form>
        )}
        {step === 'updatePassword' && (
          <form onSubmit={handleUpdatePassword}>
            <input 
              type="password" 
              placeholder="Nueva Contraseña" 
              className="input-field" 
              value={newPassword} 
              onChange={(e) => setNewPassword(e.target.value)} 
              disabled={loading}
            />
            <input 
              type="password" 
              placeholder="Confirmar Contraseña" 
              className="input-field" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              disabled={loading}
            />
            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? 'Actualizando...' : 'Actualizar Contraseña'}
            </button>
          </form>
        )}
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default Verificacion;
