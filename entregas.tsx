import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Inbox,
  CheckCircle2,
  Clock3,
  Eye,
  Trash2,
  X,
  FileText,
} from "lucide-react";

import "../global.css";

interface Entrega {
  id: number;
  alumno: string;
  curso: string;
  tarea: string;
  materia: string;
  fecha: string;
  estado: "Pendiente" | "Corregida";
  archivo: string;
}

const EntregasProfesor: React.FC = () => {

  const navigate = useNavigate();

  // =========================================
  // DATOS DE PRUEBA
  // =========================================

  const [entregas, setEntregas] = useState<Entrega[]>([
    {
      id: 1,
      alumno: "Sofía González",
      curso: "6° Año",
      tarea: "Página web institucional",
      materia: "Programación",
      fecha: "01/09/2026",
      estado: "Pendiente",
      archivo: "pagina-web.zip",
    },
    {
      id: 2,
      alumno: "Mateo Fernández",
      curso: "6° Año",
      tarea: "Trabajo práctico de diseño",
      materia: "Diseño Gráfico",
      fecha: "31/08/2026",
      estado: "Corregida",
      archivo: "trabajo-diseño.pdf",
    },
    {
      id: 3,
      alumno: "Valentina López",
      curso: "5° Año",
      tarea: "Ejercicio de programación",
      materia: "Programación",
      fecha: "30/08/2026",
      estado: "Pendiente",
      archivo: "ejercicio.tsx",
    },
    {
      id: 4,
      alumno: "Tomás Rodríguez",
      curso: "6° Año",
      tarea: "Investigación sobre robótica",
      materia: "Robótica",
      fecha: "29/08/2026",
      estado: "Corregida",
      archivo: "investigacion.pdf",
    },
  ]);


  // =========================================
  // FILTRO
  // =========================================

  const [filtro, setFiltro] = useState<
    "Todas" | "Pendiente" | "Corregida"
  >("Todas");


  // =========================================
  // ENTREGA SELECCIONADA
  // =========================================

  const [entregaSeleccionada, setEntregaSeleccionada] =
    useState<Entrega | null>(null);


  // =========================================
  // FILTRAR ENTREGAS
  // =========================================

  const entregasFiltradas = entregas.filter((entrega) => {

    if (filtro === "Todas") {
      return true;
    }

    return entrega.estado === filtro;

  });


  // =========================================
  // MARCAR COMO CORREGIDA
  // =========================================

  const marcarCorregida = (id: number) => {

    setEntregas(
      entregas.map((entrega) =>
        entrega.id === id
          ? {
              ...entrega,
              estado: "Corregida",
            }
          : entrega
      )
    );

  };


  // =========================================
  // ELIMINAR
  // =========================================

  const eliminarEntrega = (id: number) => {

    const confirmar = window.confirm(
      "¿Estás seguro de que querés eliminar esta entrega?"
    );

    if (confirmar) {

      setEntregas(
        entregas.filter((entrega) => entrega.id !== id)
      );

      setEntregaSeleccionada(null);

    }

  };


  // =========================================
  // CONTADORES
  // =========================================

  const totalEntregas = entregas.length;

  const pendientes = entregas.filter(
    (entrega) => entrega.estado === "Pendiente"
  ).length;

  const corregidas = entregas.filter(
    (entrega) => entrega.estado === "Corregida"
  ).length;


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

            <h1>
              PROA
            </h1>

            <span>
              DESPEÑADEROS
            </span>

          </div>

        </div>


        <div className="titulo-sistema">
          PANEL DEL PROFESOR
        </div>


        <button
          className="volver-button"
          onClick={() => navigate("/profesor")}
        >
          Volver
        </button>

      </header>


      {/* =========================================
          NAVBAR
      ========================================= */}

      <nav className="navbar">

        <button
          onClick={() => navigate("/profesor")}
        >
          Inicio
        </button>

        <button
          onClick={() => navigate("/profesor/tareas")}
        >
          Tareas
        </button>

        <button
          onClick={() => navigate("/profesor/examenes")}
        >
          Exámenes
        </button>

        <button
          onClick={() => navigate("/profesor/avisos")}
        >
          Avisos
        </button>

        <button
          className="activo"
          onClick={() => navigate("/profesor/entregas")}
        >
          Entregas
        </button>

        <button
          onClick={() => navigate("/profesor/alumnos")}
        >
          Alumnos
        </button>

        <button
          onClick={() => navigate("/profesor/perfil")}
        >
          Perfil
        </button>

      </nav>


      {/* =========================================
          CONTENIDO
      ========================================= */}

      <main className="profesor-entregas-contenido">


        {/* =====================================
            ENCABEZADO
        ===================================== */}

        <section className="entregas-encabezado">

          <div className="entregas-titulo">

            <div className="entregas-icono-principal">
              <Inbox />
            </div>

            <div>

              <span>
                ESPACIO DOCENTE
              </span>

              <h2>
                Entregas
              </h2>

              <p>
                Revisá los trabajos enviados por
                tus alumnos.
              </p>

            </div>

          </div>

        </section>


        {/* =====================================
            RESUMEN
        ===================================== */}

        <section className="entregas-resumen">


          <div className="entrega-resumen-card">

            <div className="resumen-icono azul">
              <Inbox />
            </div>

            <div>

              <span>
                TOTAL
              </span>

              <strong>
                {totalEntregas}
              </strong>

              <p>
                Entregas recibidas
              </p>

            </div>

          </div>


          <div className="entrega-resumen-card">

            <div className="resumen-icono rojo">
              <Clock3 />
            </div>

            <div>

              <span>
                PENDIENTES
              </span>

              <strong>
                {pendientes}
              </strong>

              <p>
                Para corregir
              </p>

            </div>

          </div>


          <div className="entrega-resumen-card">

            <div className="resumen-icono verde">
              <CheckCircle2 />
            </div>

            <div>

              <span>
                CORREGIDAS
              </span>

              <strong>
                {corregidas}
              </strong>

              <p>
                Trabajos revisados
              </p>

            </div>

          </div>


        </section>


        {/* =====================================
            FILTROS
        ===================================== */}

        <section className="entregas-filtros">

          <div>

            <h2>
              Entregas recibidas
            </h2>

            <p>
              Seleccioná una categoría para filtrar
              las entregas.
            </p>

          </div>


          <div className="filtros-botones">

            <button
              className={
                filtro === "Todas"
                  ? "filtro-activo"
                  : ""
              }
              onClick={() => setFiltro("Todas")}
            >
              Todas
            </button>

            <button
              className={
                filtro === "Pendiente"
                  ? "filtro-activo"
                  : ""
              }
              onClick={() => setFiltro("Pendiente")}
            >
              Pendientes
            </button>

            <button
              className={
                filtro === "Corregida"
                  ? "filtro-activo"
                  : ""
              }
              onClick={() => setFiltro("Corregida")}
            >
              Corregidas
            </button>

          </div>

        </section>


        {/* =====================================
            LISTA
        ===================================== */}

        <section className="lista-entregas">

          {entregasFiltradas.length === 0 ? (

            <div className="sin-entregas">

              <Inbox />

              <h3>
                No hay entregas
              </h3>

              <p>
                No se encontraron entregas
                en esta categoría.
              </p>

            </div>

          ) : (

            entregasFiltradas.map((entrega) => (

              <article
                className="entrega-card"
                key={entrega.id}
              >


                {/* ICONO */}

                <div className="entrega-card-icono">

                  <FileText />

                </div>


                {/* INFORMACIÓN */}

                <div className="entrega-card-contenido">

                  <div className="entrega-card-arriba">

                    <span className="entrega-materia">
                      {entrega.materia}
                    </span>

                    <span
                      className={
                        entrega.estado === "Corregida"
                          ? "estado-entrega corregida"
                          : "estado-entrega pendiente"
                      }
                    >

                      {entrega.estado === "Corregida" ? (
                        <>
                          <CheckCircle2 />
                          Corregida
                        </>
                      ) : (
                        <>
                          <Clock3 />
                          Pendiente
                        </>
                      )}

                    </span>

                  </div>


                  <h3>
                    {entrega.tarea}
                  </h3>


                  <p className="entrega-alumno">
                    <strong>
                      {entrega.alumno}
                    </strong>

                    <span>
                      {entrega.curso}
                    </span>
                  </p>


                  <div className="entrega-datos">

                    <span>
                      Fecha: {entrega.fecha}
                    </span>

                    <span>
                      Archivo: {entrega.archivo}
                    </span>

                  </div>

                </div>


                {/* ACCIONES */}

                <div className="entrega-acciones">

                  <button
                    className="ver-entrega-btn"
                    onClick={() =>
                      setEntregaSeleccionada(entrega)
                    }
                    title="Ver entrega"
                  >

                    <Eye />

                    <span>
                      Ver
                    </span>

                  </button>


                  {entrega.estado === "Pendiente" && (

                    <button
                      className="corregir-entrega-btn"
                      onClick={() =>
                        marcarCorregida(entrega.id)
                      }
                      title="Marcar como corregida"
                    >

                      <CheckCircle2 />

                    </button>

                  )}


                  <button
                    className="eliminar-entrega-btn"
                    onClick={() =>
                      eliminarEntrega(entrega.id)
                    }
                    title="Eliminar entrega"
                  >

                    <Trash2 />

                  </button>

                </div>

              </article>

            ))

          )}

        </section>


      </main>


      {/* =========================================
          MODAL VER ENTREGA
      ========================================= */}

      {entregaSeleccionada && (

        <div className="modal-entrega-fondo">

          <div className="modal-entrega">


            <div className="modal-entrega-header">

              <div>

                <span>
                  ENTREGA DEL ALUMNO
                </span>

                <h2>
                  {entregaSeleccionada.tarea}
                </h2>

              </div>


              <button
                className="cerrar-modal-entrega"
                onClick={() =>
                  setEntregaSeleccionada(null)
                }
              >
                <X />
              </button>

            </div>


            <div className="modal-entrega-contenido">


              <div className="modal-dato">

                <span>
                  Alumno
                </span>

                <strong>
                  {entregaSeleccionada.alumno}
                </strong>

              </div>


              <div className="modal-dato">

                <span>
                  Curso
                </span>

                <strong>
                  {entregaSeleccionada.curso}
                </strong>

              </div>


              <div className="modal-dato">

                <span>
                  Materia
                </span>

                <strong>
                  {entregaSeleccionada.materia}
                </strong>

              </div>


              <div className="modal-dato">

                <span>
                  Fecha de entrega
                </span>

                <strong>
                  {entregaSeleccionada.fecha}
                </strong>

              </div>


              <div className="modal-archivo">

                <FileText />

                <div>

                  <span>
                    Archivo enviado
                  </span>

                  <strong>
                    {entregaSeleccionada.archivo}
                  </strong>

                </div>

              </div>


              <div
                className={
                  entregaSeleccionada.estado === "Corregida"
                    ? "modal-estado corregida"
                    : "modal-estado pendiente"
                }
              >

                {entregaSeleccionada.estado === "Corregida" ? (
                  <>
                    <CheckCircle2 />
                    Esta entrega ya fue corregida.
                  </>
                ) : (
                  <>
                    <Clock3 />
                    Esta entrega está pendiente de corrección.
                  </>
                )}

              </div>


            </div>


            <div className="modal-entrega-footer">

              {entregaSeleccionada.estado === "Pendiente" && (

                <button
                  className="modal-corregir-btn"
                  onClick={() => {

                    marcarCorregida(
                      entregaSeleccionada.id
                    );

                    setEntregaSeleccionada({
                      ...entregaSeleccionada,
                      estado: "Corregida",
                    });

                  }}
                >

                  <CheckCircle2 />

                  MARCAR COMO CORREGIDA

                </button>

              )}


              <button
                className="modal-cerrar-btn"
                onClick={() =>
                  setEntregaSeleccionada(null)
                }
              >
                CERRAR
              </button>

            </div>


          </div>

        </div>

      )}


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

export default EntregasProfesor;