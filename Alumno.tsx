import { useNavigate } from "react-router-dom";

import "../global.css";

const Alumno: React.FC = () => {
  const navigate = useNavigate();

  return (
    
    <div className="pagina">

      {/* HEADER */}
      <header className="header">

        <div className="logo-section">
          <img
            src="/logop.jpg"
            alt="Logo PROA"
            className="logo"
          />

          <div className="logo-text">
            <h1>PROA</h1>
            <span>Despeñaderos</span>
          </div>
        </div>

        <div className="titulo-sistema">
          SISTEMA DE GESTIÓN ESCOLAR
        </div>

        <button
          className="volver-btn"
          onClick={() => navigate("/inicio")}
        >
          <span>↩</span>
          VOLVER AL INICIO
        </button>

      </header>


      {/* BARRA DE NAVEGACIÓN */}
      <nav className="navbar">

        <button onClick={() => navigate("/inicio")}>
          INICIO
        </button>

        <button onClick={() => navigate("/contacto")}>
          CONTACTO
        </button>

      </nav>


      {/* CONTENIDO DEL LOGIN */}
      <div className="login-alumno">

        <div className="login-contenedor">

          {/* PARTE IZQUIERDA */}
          <div className="login-formulario">

            <img
              src="/logop.jpg"
              alt="Logo PROA"
              className="login-logo"
            />

            <h1>Iniciar Sesión</h1>

            <p className="login-subtitulo">
              Acceso para alumnos
            </p>

    

            <p className="login-instruccion">
              Usá tu usuario y contraseña
            </p>

            <div className="campo">
  <h5>✉</h5>
  <input
    type="text"
    placeholder="Usuario"
    autoComplete="username"
  />
</div>

<div className="campo">
  <h5>🔒</h5>
  <input
    type="password"
    placeholder="Contraseña"
    autoComplete="current-password"
  />
</div>
<button
  className="olvidaste"
  onClick={() => navigate("/recuperar/alumno")}
>
  ¿Olvidaste tu contraseña?
</button>

            <p className="registro-texto">
            ¿No estás registrado?
            
            <button
  className="registro-btn"
  onClick={() => navigate("/registro/alumno")}
>
  Registrate aquí
</button>
            </p>

            <button className="btn-ingresar">
              INICIAR SESIÓN
            </button>

            <button
              className="btn-volver"
              onClick={() => navigate("/login")}
            >
              ← Volver
            </button>

          </div>


          {/* PARTE DERECHA */}
          <div className="login-bienvenida">

            <div className="circulo">

              <h2>¡Bienvenido!</h2>

              <p>
                Ingresá tus datos personales
                <br />
                para acceder al sistema.
              </p>

              <div className="rol">
                ALUMNO
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Alumno;