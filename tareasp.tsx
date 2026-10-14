import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ClipboardList,
  Plus,
  Pencil,
  Trash2,
  CalendarDays,
  X,
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
}

const TareasProfesor: React.FC = () => {
  const navigate = useNavigate();

  const [mostrarFormulario, setMostrarFormulario] = useState(false);

 const [tareas, setTareas] = useState<Tarea[]>([]);
const [cargando, setCargando] = useState(true);
const [guardando, setGuardando] = useState(false);

useEffect(() => {
  cargarTareas();
}, []);

const cargarTareas = async () => {
  setCargando(true);

  const { data, error } = await supabase
    .from("tareas")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error al cargar tareas:", error.message);
    alert("No se pudieron cargar las tareas.");
  } else {
    setTareas(
      (data || []).map((tarea) => ({
        ...tarea,
        fecha: convertirFecha(String(tarea.fecha)),
      }))
    );
  }

  setCargando(false);
};

  const [nuevaTarea, setNuevaTarea] = useState({
    materia: "",
    curso: "",
    titulo: "",
    descripcion: "",
    fecha: "",
  });

  const [editandoId, setEditandoId] = useState<number | null>(null);

  // =========================================
  // CAMBIAR DATOS DEL FORMULARIO
  // =========================================

  const manejarCambio = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setNuevaTarea({
      ...nuevaTarea,
      [e.target.name]: e.target.value,
    });
  };

  // =========================================
  // CREAR / EDITAR TAREA
  // =========================================

  const guardarTarea = async (e: React.FormEvent) => {
  e.preventDefault();

  if (
    !nuevaTarea.materia ||
    !nuevaTarea.curso ||
    !nuevaTarea.titulo.trim() ||
    !nuevaTarea.descripcion.trim() ||
    !nuevaTarea.fecha
  ) {
    alert("Completá todos los campos.");
    return;
  }

  setGuardando(true);

  try {
    const datosTarea = {
      materia: nuevaTarea.materia,
      curso: nuevaTarea.curso,
      titulo: nuevaTarea.titulo.trim(),
      descripcion: nuevaTarea.descripcion.trim(),
      fecha: nuevaTarea.fecha,
    };

    if (editandoId !== null) {
      const { error } = await supabase
        .from("tareas")
        .update(datosTarea)
        .eq("id", editandoId);

      if (error) throw error;

      alert("¡La tarea se modificó correctamente!");
    } else {
      const { error } = await supabase
        .from("tareas")
        .insert([datosTarea]);

      if (error) throw error;

      alert("¡La tarea se publicó correctamente!");
    }

    limpiarFormulario();
    await cargarTareas();
  } catch (error) {
    console.error("Error al guardar la tarea:", error);
    alert("No se pudo guardar la tarea. Revisá la consola para ver el error.");
  } finally {
    setGuardando(false);
  }
};

  // =========================================
  // ELIMINAR TAREA
  // =========================================

  const eliminarTarea = async (id: number) => {
  const confirmar = window.confirm(
    "¿Estás seguro de que querés eliminar esta tarea?"
  );

  if (!confirmar) return;

  const { error } = await supabase
    .from("tareas")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error al eliminar:", error.message);
    alert("No se pudo eliminar la tarea.");
    return;
  }

  await cargarTareas();
  alert("La tarea se eliminó correctamente.");
};

  // =========================================
  // EDITAR TAREA
  // =========================================

  const editarTarea = (tarea: Tarea) => {
    setNuevaTarea({
      materia: tarea.materia,
      curso: tarea.curso,
      titulo: tarea.titulo,
      descripcion: tarea.descripcion,
      fecha: convertirFechaInput(tarea.fecha),
    });

    setEditandoId(tarea.id);
    setMostrarFormulario(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================================
  // LIMPIAR FORMULARIO
  // =========================================

  const limpiarFormulario = () => {
    setNuevaTarea({
      materia: "",
      curso: "",
      titulo: "",
      descripcion: "",
      fecha: "",
    });

    setMostrarFormulario(false);
    setEditandoId(null);
  };

  // =========================================
  // FORMATO DE FECHA
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

        <button
          className="activo"
          onClick={() => navigate("/profesor/tareas")}
        >
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

      <main className="profesor-tareas-contenido">


        {/* =====================================
            ENCABEZADO
        ===================================== */}

        <section className="tareas-encabezado">

          <div className="tareas-titulo">

            <div className="tareas-icono-principal">
              <ClipboardList />
            </div>

            <div>

              <span>
                ESPACIO DOCENTE
              </span>

              <h2>
                Tareas
              </h2>

              <p>
                Administrá las actividades que deben
                realizar tus alumnos.
              </p>

            </div>

          </div>


          <button
            className="nueva-tarea-btn"
            onClick={() => {
              setMostrarFormulario(true);
              setEditandoId(null);
            }}
          >
            <Plus />
            NUEVA TAREA
          </button>

        </section>


        {/* =====================================
            FORMULARIO
        ===================================== */}

        {mostrarFormulario && (

          <section className="tarea-formulario">

            <div className="formulario-titulo">

              <div>

                <span>
                  {editandoId !== null
                    ? "MODIFICAR TAREA"
                    : "NUEVA TAREA"}
                </span>

                <h2>
                  {editandoId !== null
                    ? "Editar tarea"
                    : "Crear una nueva tarea"}
                </h2>

              </div>

              <button
                className="cerrar-formulario"
                onClick={limpiarFormulario}
              >
                <X />
              </button>

            </div>


            <form onSubmit={guardarTarea}>

              <div className="formulario-grid">


                {/* MATERIA */}

                <div className="campo">

                  <label>
                    Materia
                  </label>

                  <select
                    name="materia"
                    value={nuevaTarea.materia}
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

                    <option value="Diseño Gráfico">
                      Diseño Gráfico
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
                    value={nuevaTarea.curso}
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


                {/* TITULO */}

                <div className="campo campo-completo">

                  <label>
                    Título de la tarea
                  </label>

                  <input
                    type="text"
                    name="titulo"
                    value={nuevaTarea.titulo}
                    onChange={manejarCambio}
                    placeholder="Ej: Trabajo práctico de funciones"
                  />

                </div>


                {/* DESCRIPCIÓN */}

                <div className="campo campo-completo">

                  <label>
                    Descripción
                  </label>

                  <textarea
                    name="descripcion"
                    value={nuevaTarea.descripcion}
                    onChange={manejarCambio}
                    placeholder="Escribí las indicaciones de la tarea..."
                    rows={5}
                  />

                </div>


                {/* FECHA */}

                <div className="campo">

                  <label>
                    Fecha de entrega
                  </label>

                  <div className="input-fecha">

                    <CalendarDays />

                    <input
                      type="date"
                      name="fecha"
                      value={nuevaTarea.fecha}
                      onChange={manejarCambio}
                    />

                  </div>

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
  : "PUBLICAR TAREA"}
                </button>

              </div>

            </form>

          </section>

        )}


        {/* =====================================
            TAREAS PUBLICADAS
        ===================================== */}

        <section className="tareas-publicadas">

          <div className="tareas-publicadas-titulo">

            <div>

              <h2>
                Tareas publicadas
              </h2>

              <p>
                {tareas.length}{" "}
                {tareas.length === 1
                  ? "tarea publicada"
                  : "tareas publicadas"}
              </p>

            </div>

          </div>


          {/* =====================================
              LISTA
          ===================================== */}
          
          {cargando ? (
  <p>Cargando tareas...</p>
) : tareas.length === 0 ? (

            <div className="sin-tareas">

              <ClipboardList />

              <h3>
                No hay tareas publicadas
              </h3>

              <p>
                Creá una nueva tarea para comenzar.
              </p>

              <button
                onClick={() => setMostrarFormulario(true)}
              >
                <Plus />
                NUEVA TAREA
              </button>

            </div>

          ) : (

            <div className="lista-tareas">

              {tareas.map((tarea) => (

                <article
                  className="tarea-card"
                  key={tarea.id}
                >

                  <div className="tarea-card-icono">
                    <ClipboardList />
                  </div>


                  <div className="tarea-card-contenido">

                    <span className="tarea-materia">
                      {tarea.materia}
                    </span>

                    <h3>
                      {tarea.titulo}
                    </h3>

                    <p>
                      {tarea.descripcion}
                    </p>

                    <div className="tarea-info">

                      <span>
                        {tarea.curso}
                      </span>

                      <span>
                        <CalendarDays />
                        Entrega: {tarea.fecha}
                      </span>

                    </div>

                  </div>


                  <div className="tarea-acciones">

                    <button
                      className="editar-tarea"
                      onClick={() => editarTarea(tarea)}
                      title="Editar tarea"
                    >
                      <Pencil />
                    </button>

                    <button
                      className="eliminar-tarea"
                      onClick={() => eliminarTarea(tarea.id)}
                      title="Eliminar tarea"
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

export default TareasProfesor;