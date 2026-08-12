import React from "react";
import "../global.css";

const Login: React.FC = () => {
  const seleccionarRol = (rol: string) => {
    console.log(`Rol seleccionado: ${rol}`);
  };

  return (
    <div className="pagina">

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
          onClick={() => window.location.href = "/"}
        >
          <span>↩</span>
          VOLVER AL INICIO
        </button>

      </header>


      <nav className="navbar">

        <a href="/">INICIO</a>
        <a href="/institucional">INSTITUCIONAL</a>
        <a href="/paicor">PAICOR</a>
        <a href="/proyectos">PROYECTOS</a>
        <a href="/contacto">CONTACTO</a>

      </nav>


      <main className="contenido">

        <section className="login-card">

          <div className="candado">
            <img
              src="/candado.jpg"
              alt="Inicio de sesión"
            />
          </div>

          <h2>Iniciar sesión</h2>

          <div className="linea"></div>

          <p className="pregunta">
            ¿Cómo deseas ingresar?
          </p>

          <p className="descripcion">
            Seleccioná tu rol para continuar.
          </p>


          <div className="roles">

  {/* ESTUDIANTE */}
  <button
    className="rol-card"
    onClick={() => seleccionarRol("estudiante")}
  >
    <div className="icono-rol">
      🎓
    </div>

    <strong>SOY ESTUDIANTE</strong>

    <span>
      Accedé a tu información
      <br />
      y recursos.
    </span>
  </button>


  {/* PROFESOR */}
  <button
    className="rol-card"
    onClick={() => seleccionarRol("profesor")}
  >
    <div className="icono-rol">
      👨‍🏫
    </div>

    <strong>SOY PROFESOR</strong>

    <span>
      Accedé a tus cursos
      <br />
      y recursos.
    </span>
  </button>


  {/* FAMILIA */}
  <button
    className="rol-card"
    onClick={() => seleccionarRol("familia")}
  >
    <div className="icono-rol">
      👨‍👩‍👧
    </div>

    <strong>SOY FAMILIA</strong>

    <span>
      Consultá información
      <br />
      del estudiante.
    </span>
  </button>


  {/* ADMINISTRADOR */}
  <button
    className="rol-card"
    onClick={() => seleccionarRol("administrador")}
  >
    <div className="icono-rol">
      👤
    </div>

    <strong>SOY ADMINISTRADOR</strong>

    <span>
      Accedé al panel de
      <br />
      administración.
    </span>
  </button>

</div>

        </section>

      </main>


      <footer className="footer">

        <div className="footer-info">

          <div className="dato">

            <span className="footer-icon">
              ⌖
            </span>

            <div>
              <strong>
                Calle Argentina
              </strong>

              <br />

              Despeñaderos, Córdoba.
            </div>

          </div>


          <div className="dato">

            <span className="footer-icon">
              ☎
            </span>

            <div>
              <strong>
                (54) 4921000
              </strong>
            </div>

          </div>


          <div className="dato">

            <span className="footer-icon">
              ✉
            </span>

            <div>
              <strong>
                proa@despenaderos.edu.ar
              </strong>
            </div>

          </div>


          <div className="redes">
            <span>ⓕ</span>
            <span>◎</span>
            <span>▶</span>
          </div>

        </div>


        <div className="copyright">
          © 2025 PROA Despeñaderos — Todos los derechos reservados.
        </div>

      </footer>

    </div>
  );
};

export default Login;