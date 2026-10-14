
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  CalendarDays,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import { supabase } from "../lib/supabase";
import "../global.css";

interface Tarea {
  id: number;
  materia: string;
  curso: string;
  titulo: string;
  descripcion: string;
  fecha: string;
  created_at?: string;
}

const Tareas: React.FC = () => {
  const navigate = useNavigate();

  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [cargando, setCargando] = useState(true);
  const [errorCarga, setErrorCarga] = useState("");

  useEffect(() => {
    cargarTareas();
  }, []);

  const cargarTareas = async () => {
    setCargando(true);
    setErrorCarga("");

    const { data, error } = await supabase
      .from("tareas")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error al cargar tareas:", error.message);
      setErrorCarga("No se pudieron cargar las tareas.");
      setTareas([]);
    } else {
      setTareas(data || []);
    }

    setCargando(false);
  };

  const mostrarFecha = (fecha: string) => {
    if (!fecha) return "Sin fecha";

    const partes = fecha.split("-");

    if (partes.length === 3) {
      return `${partes[2]}/${partes[1]}/${partes[0]}`;
    }

    return fecha;
  };

  const estadoTarea = (fecha: string) => {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const partes = fecha.split("-").map(Number);
    const vencimiento = new Date(
      partes[0],
      partes[1] - 1,
      partes[2]
    );
    vencimiento.setHours(0, 0, 0, 0);

    if (vencimiento.getTime() < hoy.getTime()) {
      return "Vencida";
    }

    const diasRestantes = Math.round(
      (vencimiento.getTime() - hoy.getTime()) /
        (1000 * 60 * 60 * 24)
    );

    if (diasRestantes <= 2) {
      return "Próxima a vencer";
    }

    return "Pendiente";
  };

  const pendientes = tareas.filter(
    (tarea) => estadoTarea(tarea.fecha) !== "Vencida"
  ).length;

  const vencidas = tareas.filter(
    (tarea) => estadoTarea(tarea.fecha) === "Vencida"
  ).length;

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
            <span>DESPEÑADEROS</span>
          </div>
        </div>

        <div className="titulo-sistema">TAREAS</div>

        <button
          className="volver-button"
          onClick={() => navigate("/alumno")}
        >
          Volver
        </button>
      </header>

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

      <main className="tareas-contenido">
        <section className="tareas-titulo">
          <div className="tareas-titulo-texto">
            <span>ESPACIO DEL ALUMNO</span>
            <h2>Mis tareas</h2>
            <p>
              Consultá las actividades asignadas y sus
              fechas de entrega.
            </p>
          </div>

          <div className="tareas-titulo-icon">
            <FileText />
          </div>
        </section>

        <section className="tareas-resumen">
          <div className="resumen-item">
            <div className="resumen-icon azul">
              <FileText />
            </div>

            <div>
              <strong>{pendientes}</strong>
              <span>Tareas pendientes</span>
            </div>
          </div>

          <div className="resumen-item">
            <div className="resumen-icon rojo">
              <AlertCircle />
            </div>

            <div>
              <strong>
                {
                  tareas.filter(
                    (tarea) =>
                      estadoTarea(tarea.fecha) ===
                      "Próxima a vencer"
                  ).length
                }
              </strong>
              <span>Próximas a vencer</span>
            </div>
          </div>

          <div className="resumen-item">
            <div className="resumen-icon oscuro">
              <CheckCircle2 />
            </div>

            <div>
              <strong>0</strong>
              <span>Tareas entregadas</span>
            </div>
          </div>
        </section>

        <section className="lista-tareas">
          <div className="lista-tareas-header">
            <div>
              <h2>Actividades</h2>
              <p>Tareas publicadas por tus profesores</p>
            </div>

            <button
              type="button"
              onClick={cargarTareas}
              disabled={cargando}
            >
              {cargando ? "Actualizando..." : "Actualizar"}
            </button>
          </div>

          {cargando ? (
            <p>Cargando tareas...</p>
          ) : errorCarga ? (
            <div className="sin-tareas">
              <AlertCircle />
              <p>{errorCarga}</p>
              <button onClick={cargarTareas}>
                Intentar nuevamente
              </button>
            </div>
          ) : tareas.length === 0 ? (
            <div className="sin-tareas">
              <FileText />
              <h3>No hay tareas publicadas</h3>
              <p>
                Cuando tus profesores publiquen una tarea,
                aparecerá acá.
              </p>
            </div>
          ) : (
            tareas.map((tarea) => {
              const estado = estadoTarea(tarea.fecha);

              return (
                <article className="tarea-card" key={tarea.id}>
                  <div className="tarea-icon">
                    <FileText />
                  </div>

                  <div className="tarea-info">
                    <span className="tarea-materia">
                      {tarea.materia.toUpperCase()}
                    </span>

                    <h3>{tarea.titulo}</h3>

                    <p>{tarea.descripcion}</p>

                    <div className="tarea-fecha">
                      <CalendarDays />
                      <span>
                        Entrega: {mostrarFecha(tarea.fecha)}
                      </span>
                    </div>

                    <p>
                      Curso: {tarea.curso}
                    </p>
                  </div>

                  <div
                    className={`tarea-estado ${
                      estado === "Vencida"
                        ? "vencida"
                        : "pendiente"
                    }`}
                  >
                    {estado === "Vencida" ? (
                      <AlertCircle />
                    ) : estado === "Próxima a vencer" ? (
                      <Clock />
                    ) : (
                      <Clock />
                    )}

                    {estado}
                  </div>
                </article>
              );
            })
          )}
        </section>
      </main>

      <footer className="footer">
        <div className="copyright">
          © 2026 PROA Despeñaderos · Todos los derechos reservados
        </div>
      </footer>
    </div>
  );
};

export default Tareas;
