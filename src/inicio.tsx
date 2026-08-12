import "./App.css";

function App() {
  return (
    <div className="page">

      {/* HEADER */}
      <header className="header">
        <div className="logo-container">
          <div className="logo-circle">
            PROA
          </div>

          <div className="logo-text">
            <strong>PROA</strong>
            <span>Despeñaderos</span>
          </div>
        </div>

        <h1 className="system-title">
          SISTEMA DE GESTIÓN ESCOLAR
        </h1>

        <button className="login-button">
          👤 INICIAR SESIÓN
        </button>
      </header>

      {/* NAVBAR */}
      <nav className="navbar">
        <a href="#inicio">INICIO</a>
        <a href="#institucional">INSTITUCIONAL</a>
        <a href="#paicor">PAICOR</a>
        <a href="#proyectos">PROYECTOS</a>
        <a href="#contacto">CONTACTO</a>
      </nav>

      {/* HERO */}
      <main id="inicio">
        <section className="hero">

          <div className="hero-content">
            <h2>PROA DESPEÑADEROS</h2>

            <p>
              Una institución que forma estudiantes
              preparados para el futuro mediante
              la innovación, la tecnología y el
              aprendizaje basado en proyectos.
            </p>

            <button className="more-button">
              CONOCÉ MÁS
            </button>
          </div>

          <div className="hero-image">
            <div className="building">
              <div className="roof"></div>
              <div className="building-body">
                <div className="door"></div>

                <div className="window"></div>
                <div className="window"></div>
                <div className="window"></div>
              </div>
            </div>
          </div>

        </section>
      </main>

      {/* FOOTER */}
      <footer id="contacto" className="footer">

        <div className="contact-info">
          <span>📍 Calle Argentina, Despeñaderos, Córdoba</span>
          <span>📞 (54) 4921000</span>
          <span>✉ proa@despenaderos.edu.ar</span>
        </div>

        <div className="socials">
          <span>ⓕ</span>
          <span>◎</span>
          <span>▶</span>
        </div>

        <div className="copyright">
          © 2025 PROA Despeñaderos - Todos los derechos reservados.
        </div>

      </footer>

    </div>
  );
}

export default App;

