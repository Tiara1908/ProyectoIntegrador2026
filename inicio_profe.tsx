import React from "react";
import { useNavigate } from "react-router-dom";

import {
  ClipboardList,
  CalendarDays,
  Megaphone,
  Users,
  User,
  Plus,
} from "lucide-react";

import "../global.css";

const InicioProfesor: React.FC = () => {

  const navigate = useNavigate();

  return (
    <div className="pagina">

      {/* =========================================
          HEADER
      ========================================= */}

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
          PANEL DEL PROFESOR
        </div>

        <button
          className="volver-button"
          onClick={() => navigate("/inicio")}
        >
          Volver
        </button>

      </header>


      {/* =========================================
          NAVBAR
      ========================================= */}

      <nav className="navbar">

        <button onClick={() => navigate("/profesor")}>
          Inicio
        </button>

        <button onClick={() => navigate("/profesor/tareas")}>
          Tareas
        </button>

        <button onClick={() => navigate("/profesor/examenes")}>
          Exámenes
        </button>

        <button onClick={() => navigate("/profesor/avisos")}>
          Avisos
        </button>

        <button onClick={() => navigate("/profesor/alumnos")}>
          Alumnos
        </button>

        <button onClick={() => navigate("/profesor/perfil")}>
          Perfil
        </button>

      </nav>


      {/* =========================================
          CONTENIDO
      ========================================= */}

      <main className="profesor-contenido">


        {/* =====================================
            BIENVENIDA
        ===================================== */}

        <section className="profesor-bienvenida">

          <div>

            <span className="profesor-subtitulo">
              ESPACIO DOCENTE
            </span>

            <h2>
              Bienvenido, Profesor
            </h2>

            <p>
              Desde este espacio podés administrar las
              tareas, exámenes, avisos y consultar la
              información de tus alumnos.
            </p>

          </div>

          <div className="profesor-icono">
            <User />
          </div>

        </section>


        {/* =====================================
            ACCESOS
        ===================================== */}

        <section className="profesor-seccion">

          <div className="profesor-seccion-titulo">

            <h2>
              ¿Qué querés hacer?
            </h2>

            <p>
              Accedé rápidamente a las herramientas
              disponibles para profesores.
            </p>

          </div>


          <div className="profesor-tarjetas">


            {/* TAREAS */}

            <article
              className="profesor-tarjeta"
              onClick={() => navigate("/profesor/tareas")}
            >

              <div className="profesor-tarjeta-icono azul">
                <ClipboardList />
              </div>

              <div>

                <h3>
                  Tareas
                </h3>

                <p>
                  Crear, modificar y eliminar tareas
                  para los alumnos.
                </p>

              </div>

              <span className="profesor-flecha">
                →
              </span>

            </article>


            {/* EXÁMENES */}

            <article
              className="profesor-tarjeta"
              onClick={() => navigate("/profesor/examenes")}
            >

              <div className="profesor-tarjeta-icono celeste">
                <CalendarDays />
              </div>

              <div>

                <h3>
                  Exámenes
                </h3>

                <p>
                  Agregar y administrar fechas
                  de exámenes.
                </p>

              </div>

              <span className="profesor-flecha">
                →
              </span>

            </article>


            {/* AVISOS */}

            <article
              className="profesor-tarjeta"
              onClick={() => navigate("/profesor/avisos")}
            >

              <div className="profesor-tarjeta-icono rojo">
                <Megaphone />
              </div>

              <div>

                <h3>
                  Avisos
                </h3>

                <p>
                  Publicar comunicados y avisos
                  importantes.
                </p>

              </div>

              <span className="profesor-flecha">
                →
              </span>

            </article>


            {/* ALUMNOS */}

            <article
              className="profesor-tarjeta"
              onClick={() => navigate("/profesor/alumnos")}
            >

              <div className="profesor-tarjeta-icono oscuro">
                <Users />
              </div>

              <div>

                <h3>
                  Alumnos
                </h3>

                <p>
                  Consultar información de los
                  alumnos y cursos.
                </p>

              </div>

              <span className="profesor-flecha">
                →
              </span>

            </article>


            {/* PERFIL */}

            <article
              className="profesor-tarjeta"
              onClick={() => navigate("/profesor/perfil")}
            >

              <div className="profesor-tarjeta-icono celeste">
                <User />
              </div>

              <div>

                <h3>
                  Mi perfil
                </h3>

                <p>
                  Consultar y modificar tus
                  datos personales.
                </p>

              </div>

              <span className="profesor-flecha">
                →
              </span>

            </article>

 {/* ENTREGAS */}

            <article
              className="profesor-tarjeta"
              onClick={() => navigate("/profesor/entregas")}
            >

              <div className="profesor-tarjeta-icono celeste">
                <User />
              </div>

              <div>

                <h3>
                  Entregas
                </h3>

                <p>
                  Consultar y modificar las
                  entregas de los alumnos.
                </p>

              </div>

              <span className="profesor-flecha">
                →
              </span>

            </article>
            

          </div>

        </section>

      </main>


      {/* =========================================
          FOOTER
      ========================================= */}

      <footer className="footer">

        <div className="copyright">
          © 2026 PROA Despeñaderos · Todos los derechos reservados
        </div>

      </footer>

    </div>
  );
};

export default InicioProfesor;