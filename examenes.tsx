
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CalendarDays,
  Clock,
  BookOpen,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";

import { supabase } from "../lib/supabase";
import "../global.css";

interface Examen {
  id: number;
  materia: string;
  curso: string;
  tema: string;
  fecha: string;
  horario: string;
  created_at?: string;
}

const Examenes: React.FC = () => {
  const navigate = useNavigate();

  const [examenes, setExamenes] = useState<Examen[]>([]);
  const [cargando, setCargando] = useState(true);
  const [errorCarga, setErrorCarga] = useState("");

  useEffect(() => {
    cargarExamenes();
  }, []);

  const cargarExamenes = async () => {
    setCargando(true);
    setErrorCarga("");

    const { data, error } = await supabase
      .from("examenes")
      .select("*")
      .order("fecha", { ascending: true });

    if (error) {
      console.error("Error al cargar exámenes:", error.message);
      setErrorCarga("No se pudieron cargar los exámenes.");
      setExamenes([]);
    } else {
      setExamenes(data || []);
    }

    setCargando(false);
  };

  const fechaLocal = (fecha: string) => {
    const partes = fecha.split("-");

    if (partes.length !== 3) {
      return new Date(fecha);
    }

    return new Date(
      Number(partes[0]),
      Number(partes[1]) - 1,
      Number(partes[2])
    );
  };

  const mostrarFecha = (fecha: string) => {
    if (!fecha) return "Sin fecha";

    return fechaLocal(fecha).toLocaleDateString("es-AR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const obtenerDia = (fecha: string) => {
    if (!fecha) return "--";

    return fechaLocal(fecha)
      .getDate()
      .toString()
      .padStart(2, "0");
  };

  const obtenerMes = (fecha: string) => {
    if (!fecha) return "---";

    const meses = [
      "ENE", "FEB", "MAR", "ABR", "MAY", "JUN",
      "JUL", "AGO", "SEP", "OCT", "NOV", "DIC",
    ];

    return meses[fechaLocal(fecha).getMonth()];
  };

  const estaRealizado = (fecha: string) => {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const fechaExamen = fechaLocal(fecha);
    fechaExamen.setHours(0, 0, 0, 0);

    return fechaExamen.getTime() < hoy.getTime();
  };

  const examenesFuturos = examenes.filter(
    (examen) => !estaRealizado(examen.fecha)
  );

  const examenesRealizados = examenes.filter(
    (examen) => estaRealizado(examen.fecha)
  );

  const proximoExamen = examenesFuturos[0];

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
          EXÁMENES
        </div>

        <button
          className="volver-button"
          onClick={() => navigate("/alumno")}
        >
          <ArrowLeft size={16} />
          Volver
        </button>
      </header>

      {/* NAVBAR */}

      <nav className="navbar">
        <button onClick={() => navigate("/alumno")}>
          Mi panel
        </button>

        <button onClick={() => navigate("/alumno/tareas")}>
          Tareas
        </button>

        <button onClick={() => navigate("/alumno/examenes")}>
          Exámenes
        </button>

        <button onClick={() => navigate("/alumno/avisos")}>
          Avisos
        </button>

        <button onClick={() => navigate("/alumno/paicor")}>
          PAICOR
        </button>
      </nav>

      {/* CONTENIDO */}

      <main className="examenes-contenido">

        {/* ENCABEZADO */}

        <section className="examenes-titulo">
          <div>
            <span className="examenes-subtitulo">
              ESPACIO DEL ALUMNO
            </span>

            <h2>Fechas de exámenes</h2>

            <p>
              Consultá las próximas evaluaciones y organizá
              tu tiempo de estudio.
            </p>
          </div>

          <div className="examenes-icono-principal">
            <CalendarDays />
          </div>
        </section>

        {/* CARGANDO */}

        {cargando && (
          <section className="proximo-examen">
            <div className="proximo-label">
              CARGANDO
            </div>

            <div className="proximo-contenido">
              <div className="proximo-info">
                <h2>Buscando exámenes...</h2>
                <p>Estamos cargando las fechas de evaluación.</p>
              </div>
            </div>
          </section>
        )}

        {/* ERROR */}

        {!cargando && errorCarga && (
          <section className="proximo-examen">
            <div className="proximo-label">
              ERROR
            </div>

            <div className="proximo-contenido">
              <div className="proximo-info">
                <h2>No se pudieron cargar los exámenes</h2>
                <p>{errorCarga}</p>

                <button onClick={cargarExamenes}>
                  Intentar nuevamente
                </button>
              </div>
            </div>
          </section>
        )}

        {/* PRÓXIMO EXAMEN */}

        {!cargando && !errorCarga && proximoExamen && (
          <section className="proximo-examen">
            <div className="proximo-label">
              PRÓXIMO EXAMEN
            </div>

            <div className="proximo-contenido">
              <div className="fecha-grande">
                <strong>
                  {obtenerDia(proximoExamen.fecha)}
                </strong>

                <span>
                  {obtenerMes(proximoExamen.fecha)}
                </span>
              </div>

              <div className="proximo-info">
                <span>
                  {proximoExamen.materia.toUpperCase()}
                </span>

                <h2>{proximoExamen.tema}</h2>

                <p>
                  Curso: {proximoExamen.curso}
                </p>

                <div className="proximo-detalles">
                  <div>
                    <CalendarDays />
                    {mostrarFecha(proximoExamen.fecha)}
                  </div>

                  <div>
                    <Clock />
                    {proximoExamen.horario} hs
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* LISTA DE EXÁMENES */}

        <section className="lista-examenes">
          <div className="lista-examenes-header">
            <div>
              <h2>Próximas evaluaciones</h2>

              <p>
                Revisá las fechas de tus próximos exámenes.
              </p>
            </div>
          </div>

          {!cargando && !errorCarga && examenes.length === 0 && (
            <article className="examen-card">
              <div className="examen-info">
                <h3>No hay exámenes publicados</h3>

                <p>
                  Cuando tu profesor publique una evaluación,
                  aparecerá acá.
                </p>
              </div>
            </article>
          )}

          {!cargando &&
            !errorCarga &&
            examenesFuturos.map((examen) => (
              <article className="examen-card" key={examen.id}>
                <div className="examen-fecha">
                  <strong>{obtenerDia(examen.fecha)}</strong>

                  <span>{obtenerMes(examen.fecha)}</span>
                </div>

                <div className="examen-info">
                  <span>{examen.materia.toUpperCase()}</span>

                  <h3>{examen.tema}</h3>

                  <p>Curso: {examen.curso}</p>
                </div>

                <div className="examen-hora">
                  <Clock />

                  <span>{examen.horario} hs</span>
                </div>

                <div className="examen-estado proximo">
                  Próximo
                </div>
              </article>
            ))}

          {!cargando &&
            !errorCarga &&
            examenesRealizados.map((examen) => (
              <article
                className="examen-card realizado"
                key={examen.id}
              >
                <div className="examen-fecha">
                  <strong>{obtenerDia(examen.fecha)}</strong>

                  <span>{obtenerMes(examen.fecha)}</span>
                </div>

                <div className="examen-info">
                  <span>{examen.materia.toUpperCase()}</span>

                  <h3>{examen.tema}</h3>

                  <p>Curso: {examen.curso}</p>
                </div>

                <div className="examen-hora">
                  <CheckCircle2 />

                  <span>Fecha pasada</span>
                </div>

                <div className="examen-estado completado">
                  Realizado
                </div>
              </article>
            ))}
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

export default Examenes;
