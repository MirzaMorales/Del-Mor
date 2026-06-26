import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import { useAuthStore } from './features/auth/stores/auth.store';
import './App.css';

function Home() {
  const { user, isAuth, clearUser } = useAuthStore();

  return (
    <div className="home-container">
      <div className="home-card">
        <div className="logo-container centered">
          <svg
            viewBox="0 0 24 24"
            width="48"
            height="48"
            fill="none"
            stroke="#16A34A"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="brand-name font-large">RESCATA</span>
        </div>

        {isAuth && user ? (
          <div className="auth-profile-section">
            <h1 className="welcome-title">¡Bienvenido, {user.nombre}!</h1>
            <p className="welcome-subtitle">Tu cuenta de consumidor ha sido activada con éxito.</p>
            
            <div className="profile-details-card">
              <h3>Datos del Consumidor</h3>
              <div className="detail-item">
                <span className="detail-label">ID de Usuario:</span>
                <span className="detail-value mono-text">{user.id}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Nombre:</span>
                <span className="detail-value">{user.nombre}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Correo:</span>
                <span className="detail-value">{user.correo}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Rol:</span>
                <span className="detail-value badge">{user.rol}</span>
              </div>
            </div>

            <button onClick={clearUser} className="logout-btn">
              Cerrar Sesión
            </button>
          </div>
        ) : (
          <div className="landing-section">
            <h1>Salva Comida. Ayuda al Planeta.</h1>
            <p className="landing-subtitle">
              Rescata excedentes de comida de tus negocios favoritos a precios increíbles.
            </p>
            <div className="action-buttons">
              <Link to="/register" className="btn-primary">
                Crear Cuenta de Consumidor
              </Link>
              <Link to="/login" className="btn-secondary">
                Iniciar Sesión
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
