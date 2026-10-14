import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  CalendarDays,
  Bell,
  Utensils,
  UserRound,
  ArrowRight,
  ClipboardList
} from "lucide-react";

import "../global.css";

const AlumnoInicio: React.FC = () => {

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
            <span>DESPEÑADEROS</span>
          </div>

        </div>

        <div className="titulo-sistema">
          PANEL DEL ALUMNO
        </div>

        <button
          className="volver-button"
          onClick={() => navigate("/")}
        >
          Volver
        </button>

      </header>


      {/* NAVBAR */}

      <nav className="navbar">

        <button onClick={() => navigate("/inicio")}>
          Inicio
        </button>

        <button>
          Mi panel
        </button>

        <button onClick={() => navigate("/alumno/perfil")}>
          Perfil
        </button>

      </nav>


      {/* CONTENIDO */}

      <main className="alumno-contenido">

        <section className="alumno-titulo">

          <div>
            <span className="alumno-subtitulo">
              ESPACIO DEL ALUMNO
            </span>

            <h2>¡Hola, Alumno!</h2>

            <p>
              Desde este espacio podés consultar tus tareas,
              fechas de exámenes, avisos y el menú PAICOR.
            </p>
          </div>

        </section>


        {/* TARJETAS */}

        <section className="alumno-grid">


          {/* TAREAS */}

          <div className="alumno-card">

            <div className="card-icon">
              <FileText />
            </div>

            <div className="card-text">

              <h3>Tareas</h3>

              <p>
                Consultá las tareas asignadas y sus fechas
                de entrega.
              </p>

              <button
                className="card-button"
                onClick={() => navigate("/alumno/tareas")}
              >
                Ver tareas
                <ArrowRight />
              </button>

            </div>

          </div>


          {/* EXÁMENES */}

          <div className="alumno-card">

            <div className="card-icon">
              <CalendarDays />
            </div>

            <div className="card-text">

              <h3>Fechas de exámenes</h3>

              <p>
                Revisá las próximas evaluaciones y sus
                respectivas fechas.
              </p>

              <button
                className="card-button"
                onClick={() => navigate("/alumno/examenes")}
              >
                Ver exámenes
                <ArrowRight />
              </button>

            </div>

          </div>


          {/* AVISOS */}

          <div className="alumno-card">

            <div className="card-icon">
              <Bell />
            </div>

            <div className="card-text">

              <h3>Avisos</h3>

              <p>
                Leé comunicados y novedades importantes
                de la escuela.
              </p>

              <button
                className="card-button"
                onClick={() => navigate("/alumno/avisos")}
              >
                Ver avisos
                <ArrowRight />
              </button>

            </div>

          </div>


          {/* PAICOR */}

          <div className="alumno-card">

            <div className="card-icon">
              <Utensils />
            </div>

            <div className="card-text">

              <h3>Menú PAICOR</h3>

              <p>
                Consultá el menú correspondiente a cada
                día de la semana.
              </p>

              <button
                className="card-button"
                onClick={() => navigate("/alumno/paicor")}
              >
                Ver menú
                <ArrowRight />
              </button>

            </div>

          </div>


          

        </section>

        

      </main>


      {/* FOOTER */}

      <footer className="footer">

        <div className="copyright">
          © 2026 PROA Despeñaderos · Todos los derechos reservados
        </div>

      </footer>

    </div>
  );
};

export default AlumnoInicio;