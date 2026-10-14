import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  CalendarDays,
  Plus,
  Pencil,
  Trash2,
  X,
  BookOpen,
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
}

const ExamenesProfesor: React.FC = () => {
  const navigate = useNavigate();

  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const [examenes, setExamenes] = useState<Examen[]>([]);
const [cargando, setCargando] = useState(true);
const [guardando, setGuardando] = useState(false);

  const [nuevoExamen, setNuevoExamen] = useState({
    materia: "",
    curso: "",
    tema: "",
    fecha: "",
    horario: "",
  });

  const [editandoId, setEditandoId] = useState<number | null>(null);
useEffect(() => {
  cargarExamenes();
}, []);

const cargarExamenes = async () => {
  setCargando(true);

  const { data, error } = await supabase
    .from("examenes")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error al cargar exámenes:", error.message);
    alert("No se pudieron cargar los exámenes.");
  } else {
    setExamenes(
      (data || []).map((examen) => ({
        ...examen,
        fecha: convertirFecha(String(examen.fecha)),
      }))
    );
  }

  setCargando(false);
};
  // =========================================
  // CAMBIAR DATOS
  // =========================================

  const manejarCambio = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    setNuevoExamen({
      ...nuevoExamen,
      [e.target.name]: e.target.value,
    });
  };

  // =========================================
  // GUARDAR EXAMEN
  // =========================================

const guardarExamen = async (e: React.FormEvent) => {
  e.preventDefault();

  if (
    !nuevoExamen.materia ||
    !nuevoExamen.curso ||
    !nuevoExamen.tema.trim() ||
    !nuevoExamen.fecha ||
    !nuevoExamen.horario
  ) {
    alert("Completá todos los campos.");
    return;
  }

  setGuardando(true);

  const datosExamen = {
    materia: nuevoExamen.materia,
    curso: nuevoExamen.curso,
    tema: nuevoExamen.tema.trim(),
    fecha: nuevoExamen.fecha,
    horario: nuevoExamen.horario,
  };

  let error;

  if (editandoId !== null) {
    const resultado = await supabase
      .from("examenes")
      .update(datosExamen)
      .eq("id", editandoId);

    error = resultado.error;
  } else {
    const resultado = await supabase
      .from("examenes")
      .insert([datosExamen]);

    error = resultado.error;
  }

  if (error) {
    console.error("Error al guardar examen:", error.message);
    alert("No se pudo guardar el examen.");
  } else {
    alert(
      editandoId !== null
        ? "Examen actualizado correctamente."
        : "Examen publicado correctamente."
    );

    limpiarFormulario();
    await cargarExamenes();
  }

  setGuardando(false);
};

  // =========================================
  // ELIMINAR
  // =========================================

  const eliminarExamen = async (id: number) => {
  const confirmar = window.confirm(
    "¿Estás seguro de que querés eliminar este examen?"
  );

  if (!confirmar) return;

  const { error } = await supabase
    .from("examenes")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error al eliminar examen:", error.message);
    alert("No se pudo eliminar el examen.");
    return;
  }

  alert("Examen eliminado correctamente.");
  await cargarExamenes();
};
  // =========================================
  // EDITAR
  // =========================================

  const editarExamen = (examen: Examen) => {
    setNuevoExamen({
      materia: examen.materia,
      curso: examen.curso,
      tema: examen.tema,
      fecha: convertirFechaInput(examen.fecha),
      horario: examen.horario,
    });

    setEditandoId(examen.id);
    setMostrarFormulario(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================================
  // LIMPIAR
  // =========================================

  const limpiarFormulario = () => {
    setNuevoExamen({
      materia: "",
      curso: "",
      tema: "",
      fecha: "",
      horario: "",
    });

    setMostrarFormulario(false);
    setEditandoId(null);
  };

  // =========================================
  // FECHAS
  // =========================================

  const convertirFecha = (fecha: string) => {
    if (!fecha) return "";

    const partes = fecha.split("-");

    if (partes.length !== 3) {
      return fecha;
    }

    return `${partes[2]}/${partes[1]}/${partes[0]}`;
  };

  const convertirFechaInput = (fecha: string) => {
    if (!fecha) return "";

    const partes = fecha.split("/");

    if (partes.length !== 3) {
      return fecha;
    }

    return `${partes[2]}-${partes[1]}-${partes[0]}`;
  };

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

        <button onClick={() => navigate("/profesor")}>
          Inicio
        </button>

        <button onClick={() => navigate("/profesor/tareas")}>
          Tareas
        </button>

        <button
          className="activo"
          onClick={() => navigate("/profesor/examenes")}
        >
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

      <main className="profesor-examenes-contenido">


        {/* =====================================
            ENCABEZADO
        ===================================== */}

        <section className="examenes-encabezado">

          <div className="examenes-titulo">

            <div className="examenes-icono-principal">
              <CalendarDays />
            </div>

            <div>

              <span>
                ESPACIO DOCENTE
              </span>

              <h2>
                Exámenes
              </h2>

              <p>
                Administrá las fechas de evaluación
                de tus alumnos.
              </p>

            </div>

          </div>


          <button
            className="nuevo-examen-btn"
            onClick={() => {
              setMostrarFormulario(true);
              setEditandoId(null);
            }}
          >
            <Plus />
            NUEVO EXAMEN
          </button>

        </section>


        {/* =====================================
            FORMULARIO
        ===================================== */}

        {mostrarFormulario && (

          <section className="examen-formulario">

            <div className="formulario-titulo">

              <div>

                <span>
                  {editandoId !== null
                    ? "MODIFICAR EXAMEN"
                    : "NUEVO EXAMEN"}
                </span>

                <h2>
                  {editandoId !== null
                    ? "Editar examen"
                    : "Agregar fecha de examen"}
                </h2>

              </div>

              <button
                className="cerrar-formulario"
                onClick={limpiarFormulario}
              >
                <X />
              </button>

            </div>


            <form onSubmit={guardarExamen}>

              <div className="formulario-grid">


                {/* MATERIA */}

                <div className="campo">

                  <label>
                    Materia
                  </label>

                  <select
                    name="materia"
                    value={nuevoExamen.materia}
                    onChange={manejarCambio}
                  >

                    <option value="">
                      Seleccionar materia
                    </option>

                    <option value="Matemática">
                      Matemática
                    </option>

                    <option value="Lengua">
                      Lengua
                    </option>

                    <option value="Inglés">
                      Inglés
                    </option>

                    <option value="Programación">
                      Programación
                    </option>


                    <option value="Robótica">
                      Robótica
                    </option>

                  </select>

                </div>


                {/* CURSO */}

                <div className="campo">

                  <label>
                    Curso
                  </label>

                  <select
                    name="curso"
                    value={nuevoExamen.curso}
                    onChange={manejarCambio}
                  >

                    <option value="">
                      Seleccionar curso
                    </option>

                    <option value="1° Año">
                      1° Año
                    </option>

                    <option value="2° Año">
                      2° Año
                    </option>

                    <option value="3° Año">
                      3° Año
                    </option>

                    <option value="4° Año">
                      4° Año
                    </option>

                    <option value="5° Año">
                      5° Año
                    </option>

                    <option value="6° Año">
                      6° Año
                    </option>

                  </select>

                </div>


                {/* TEMA */}

                <div className="campo campo-completo">

                  <label>
                    Tema del examen
                  </label>

                  <input
                    type="text"
                    name="tema"
                    value={nuevoExamen.tema}
                    onChange={manejarCambio}
                    placeholder="Ej: Funciones y ecuaciones"
                  />

                </div>


                {/* FECHA */}

                <div className="campo">

                  <label>
                    Fecha
                  </label>

                  <div className="input-fecha">

                    <CalendarDays />

                    <input
                      type="date"
                      name="fecha"
                      value={nuevoExamen.fecha}
                      onChange={manejarCambio}
                    />

                  </div>

                </div>


                {/* HORARIO */}

                <div className="campo">

                  <label>
                    Horario
                  </label>

                  <input
                    type="time"
                    name="horario"
                    value={nuevoExamen.horario}
                    onChange={manejarCambio}
                  />

                </div>

              </div>


              {/* BOTONES */}

              <div className="formulario-botones">

                <button
                  type="button"
                  className="cancelar-btn"
                  onClick={limpiarFormulario}
                >
                  CANCELAR
                </button>

                <button
                  type="submit"
                  className="publicar-btn"
                >
                 {guardando
  ? "GUARDANDO..."
  : editandoId !== null
    ? "GUARDAR CAMBIOS"
    : "PUBLICAR EXAMEN"}
                </button>

              </div>

            </form>

          </section>

        )}


        {/* =====================================
            EXÁMENES PUBLICADOS
        ===================================== */}

        <section className="examenes-publicados">

          <div className="examenes-publicados-titulo">

            <div>

              <h2>
                Próximos exámenes
              </h2>

              <p>
                {examenes.length}{" "}
                {examenes.length === 1
                  ? "examen registrado"
                  : "exámenes registrados"}
              </p>

            </div>

          </div>


         {cargando ? (
  <div className="sin-examenes">
    <CalendarDays />
    <h3>Cargando exámenes...</h3>
  </div>
) : examenes.length === 0 ? (

            <div className="sin-examenes">

              <CalendarDays />

              <h3>
                No hay exámenes registrados
              </h3>

              <p>
                Agregá una nueva fecha de examen
                para comenzar.
              </p>

              <button
                onClick={() => setMostrarFormulario(true)}
              >
                <Plus />
                NUEVO EXAMEN
              </button>

            </div>

          ) : (

            <div className="lista-examenes">

              {examenes.map((examen) => (

                <article
                  className="examen-card"
                  key={examen.id}
                >

                  <div className="examen-fecha">

                    <span>
                      {examen.fecha.split("/")[0]}
                    </span>

                    <small>
                      {obtenerMes(examen.fecha)}
                    </small>

                  </div>


                  <div className="examen-card-contenido">

                    <span className="examen-materia">
                      {examen.materia}
                    </span>

                    <h3>
                      {examen.tema}
                    </h3>

                    <div className="examen-info">

                      <span>
                        <BookOpen />
                        {examen.curso}
                      </span>

                      <span>
                        <CalendarDays />
                        {examen.fecha}
                      </span>

                      <span>
                        🕐 {examen.horario}
                      </span>

                    </div>

                  </div>


                  <div className="examen-acciones">

                    <button
                      className="editar-tarea"
                      onClick={() => editarExamen(examen)}
                      title="Editar examen"
                    >
                      <Pencil />
                    </button>

                    <button
                      className="eliminar-tarea"
                      onClick={() => eliminarExamen(examen.id)}
                      title="Eliminar examen"
                    >
                      <Trash2 />
                    </button>

                  </div>

                </article>

              ))}

            </div>

          )}

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


// =========================================
// OBTENER MES
// =========================================

const obtenerMes = (fecha: string) => {

  const partes = fecha.split("/");

  if (partes.length !== 3) {
    return "";
  }

  const meses = [
    "ENE",
    "FEB",
    "MAR",
    "ABR",
    "MAY",
    "JUN",
    "JUL",
    "AGO",
    "SEP",
    "OCT",
    "NOV",
    "DIC",
  ];

  const numeroMes = Number(partes[1]);

  return meses[numeroMes - 1] || "";
};


export default ExamenesProfesor;