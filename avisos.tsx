
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  CalendarDays,
  ArrowLeft,
  AlertCircle,
  Info,
  Megaphone,
} from "lucide-react";

import { supabase } from "../lib/supabase";
import "../global.css";

interface Aviso {
  id: number;
  titulo: string;
  curso: string;
  descripcion: string;
  fecha: string;
  created_at?: string;
}

const Avisos: React.FC = () => {
  const navigate = useNavigate();

  const [avisos, setAvisos] = useState<Aviso[]>([]);
  const [cargando, setCargando] = useState(true);
  const [errorCarga, setErrorCarga] = useState("");

  useEffect(() => {
    cargarAvisos();
  }, []);

  const cargarAvisos = async () => {
    setCargando(true);
    setErrorCarga("");

    const { data, error } = await supabase
      .from("avisos")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error al cargar avisos:", error.message);
      setErrorCarga("No se pudieron cargar los avisos.");
      setAvisos([]);
    } else {
      setAvisos(data || []);
    }

    setCargando(false);
  };

  const mostrarFecha = (fecha: string) => {
    if (!fecha) return "Sin fecha";

    const partes = fecha.split("-");

    if (partes.length === 3) {
      const fechaLocal = new Date(
        Number(partes[0]),
        Number(partes[1]) - 1,
        Number(partes[2])
      );

      return fechaLocal.toLocaleDateString("es-AR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }).replace(".", "").toUpperCase();
    }

    return fecha;
  };

  const mostrarFechaLarga = (fecha: string) => {
    if (!fecha) return "Sin fecha";

    const partes = fecha.split("-");

    if (partes.length !== 3) return fecha;

    const fechaLocal = new Date(
      Number(partes[0]),
      Number(partes[1]) - 1,
      Number(partes[2])
    );

    return fechaLocal.toLocaleDateString("es-AR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const avisoDestacado = avisos[0];
  const avisosRestantes = avisos.slice(1);

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
          AVISOS
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

      <main className="avisos-contenido">

        {/* ENCABEZADO */}

        <section className="avisos-titulo">
          <div>
            <span className="avisos-subtitulo">
              ESPACIO DEL ALUMNO
            </span>

            <h2>Avisos</h2>

            <p>
              Acá vas a encontrar comunicados,
              recordatorios e información importante
              de la institución.
            </p>
          </div>

          <div className="avisos-icono-principal">
            <Bell />
          </div>
        </section>

        {/* CARGANDO */}

        {cargando && (
          <section className="aviso-destacado">
            <div className="aviso-destacado-icon">
              <Bell />
            </div>

            <div className="aviso-destacado-info">
              <h2>Cargando avisos...</h2>
              <p>Estamos buscando los comunicados publicados.</p>
            </div>
          </section>
        )}

        {/* ERROR */}

        {!cargando && errorCarga && (
          <section className="aviso-destacado">
            <div className="aviso-destacado-icon">
              <AlertCircle />
            </div>

            <div className="aviso-destacado-info">
              <h2>No se pudieron cargar los avisos</h2>
              <p>{errorCarga}</p>

              <button onClick={cargarAvisos}>
                Intentar nuevamente
              </button>
            </div>
          </section>
        )}

        {/* AVISO DESTACADO */}

        {!cargando && !errorCarga && avisoDestacado && (
          <section className="aviso-destacado">
            <div className="aviso-destacado-icon">
              <AlertCircle />
            </div>

            <div className="aviso-destacado-info">
              <span>
                AVISO RECIENTE
              </span>

              <h2>{avisoDestacado.titulo}</h2>

              <p>{avisoDestacado.descripcion}</p>

              <p>
                <strong>Curso:</strong> {avisoDestacado.curso}
              </p>

              <div className="aviso-fecha">
                <CalendarDays />

                <span>
                  {mostrarFechaLarga(avisoDestacado.fecha)}
                </span>
              </div>
            </div>
          </section>
        )}

        {/* LISTA DE AVISOS */}

        <section className="lista-avisos">
          <div className="lista-avisos-header">
            <div>
              <h2>Comunicados recientes</h2>

              <p>
                Información publicada por los profesores.
              </p>
            </div>
          </div>

          {!cargando && !errorCarga && avisos.length === 0 && (
            <div className="aviso-card">
              <div className="aviso-card-icon informacion">
                <Info />
              </div>

              <div className="aviso-card-info">
                <h3>No hay avisos publicados</h3>

                <p>
                  Cuando un profesor publique un aviso,
                  aparecerá acá.
                </p>
              </div>
            </div>
          )}

          {!cargando &&
            !errorCarga &&
            avisosRestantes.map((aviso) => (
              <article className="aviso-card" key={aviso.id}>
                <div className="aviso-card-icon institucional">
                  <Megaphone />
                </div>

                <div className="aviso-card-info">
                  <div className="aviso-card-top">
                    <span className="aviso-tipo institucional">
                      {aviso.curso}
                    </span>

                    <span className="aviso-card-fecha">
                      {mostrarFecha(aviso.fecha)}
                    </span>
                  </div>

                  <h3>{aviso.titulo}</h3>

                  <p>{aviso.descripcion}</p>
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

export default Avisos;
