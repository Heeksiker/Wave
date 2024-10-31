import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Bienvenido a Wave</h1>
      <p>Wave es una red de mensajería interna para empresas que te permite comunicarte con tus colegas de manera fácil y rápida.</p>
      <div className="buttons">
        <Link to="/login" className="btn">Login</Link>
        <Link to="/register" className="btn">Registrarse</Link>
        <Link to="/spotify" className="btn">Spotify Player</Link> {/* Añadir botón para redirigir a la página de Spotify */}
      </div>
    </div>
  );
};

export default Home;