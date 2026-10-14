import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Megaphone,
  Plus,
  Pencil,
  Trash2,
  X,
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

const AvisosProfesor: React.FC = () => {

  const navigate = useNavigate();

  const [mostrarFormulario, setMostrarFormulario] = useState(false);

const [avisos, setAvisos] = useState<Aviso[]>([]);
const [cargando, setCargando] = useState(true);
const [guardando, setGuardando] = useState(false);
useEffect(() => {
  cargarAvisos();
}, []);

const cargarAvisos = async () => {
  setCargando(true);

  const { data, error } = await supabase
    .from("avisos")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error al cargar avisos:", error.message);
    alert("No se pudieron cargar los avisos.");
  } else {
    setAvisos(data || []);
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
  const [nuevoAviso, setNuevoAviso] = useState({
    titulo: "",
    curso: "",
    descripcion: "",
    fecha: "",
  });

  const [editandoId, setEditandoId] = useState<number | null>(null);


  // =========================================
  // CAMBIAR DATOS
  // =========================================

  const manejarCambio = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {

    setNuevoAviso({
      ...nuevoAviso,
      [e.target.name]: e.target.value,
    });

  };


  // =========================================
  // GUARDAR AVISO
  // =========================================
const guardarAviso = async () => {
  if (
    !nuevoAviso.titulo.trim() ||
    !nuevoAviso.curso ||
    !nuevoAviso.descripcion.trim() ||
    !nuevoAviso.fecha
  ) {
    alert("Completá todos los campos antes de guardar.");
    return;
  }

  setGuardando(true);

  const datosAviso = {
    titulo: nuevoAviso.titulo.trim(),
    curso: nuevoAviso.curso,
    descripcion: nuevoAviso.descripcion.trim(),
    fecha: nuevoAviso.fecha,
  };

  let error;

  if (editandoId !== null) {
    const resultado = await supabase
      .from("avisos")
      .update(datosAviso)
      .eq("id", editandoId);

    error = resultado.error;
  } else {
    const resultado = await supabase
      .from("avisos")
      .insert([datosAviso]);

    error = resultado.error;
  }

  if (error) {
    console.error("Error al guardar aviso:", error.message);
    alert("No se pudo guardar el aviso. Revisá la conexión con Supabase.");
  } else {
    alert(
      editandoId !== null
        ? "Aviso actualizado correctamente."
        : "Aviso publicado correctamente."
    );

    limpiarFormulario();
    await cargarAvisos();
  }

  setGuardando(false);
};


  // =========================================
  // ELIMINAR
  // =========================================

  const eliminarAviso = async (id: number) => {
  const confirmar = window.confirm(
    "¿Seguro que querés eliminar este aviso?"
  );

  if (!confirmar) return;

  const { error } = await supabase
    .from("avisos")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error al eliminar aviso:", error.message);
    alert("No se pudo eliminar el aviso.");
    return;
  }

  alert("Aviso eliminado correctamente.");
  await cargarAvisos();
};


  // =========================================
  // EDITAR
  // =========================================

  const editarAviso = (aviso: Aviso) => {

    setNuevoAviso({
      titulo: aviso.titulo,
      curso: aviso.curso,
      descripcion: aviso.descripcion,
      fecha: aviso.fecha,
    });

    setEditandoId(aviso.id);

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

    setNuevoAviso({
      titulo: "",
      curso: "",
      descripcion: "",
      fecha: "",
    });

    setMostrarFormulario(false);

    setEditandoId(null);

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

        <button onClick={() => navigate("/profesor/examenes")}>
          Exámenes
        </button>

        <button
          className="activo"
          onClick={() => navigate("/profesor/avisos")}
        >
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

      <main className="profesor-avisos-contenido">


        {/* =====================================
            ENCABEZADO
        ===================================== */}

        <section className="avisos-encabezado">

          <div className="avisos-titulo">

            <div className="avisos-icono-principal">
              <Megaphone />
            </div>

            <div>

              <span>
                ESPACIO DOCENTE
              </span>

              <h2>
                Avisos
              </h2>

              <p>
                Publicá comunicados e información
                importante para tus alumnos.
              </p>

            </div>

          </div>


          <button
            className="nuevo-aviso-btn"
            onClick={() => {
              setMostrarFormulario(true);
              setEditandoId(null);
            }}
          >

            <Plus />

            NUEVO AVISO

          </button>

        </section>


        {/* =====================================
            FORMULARIO
        ===================================== */}

        {mostrarFormulario && (

          <section className="aviso-formulario">


            <div className="aviso-formulario-titulo">

              <div>

                <span>
                  {editandoId !== null
                    ? "MODIFICAR AVISO"
                    : "NUEVO AVISO"}
                </span>

                <h2>
                  {editandoId !== null
                    ? "Editar aviso"
                    : "Crear un nuevo aviso"}
                </h2>

              </div>


              <button
                className="cerrar-aviso-formulario"
                onClick={limpiarFormulario}
              >
                <X />
              </button>

            </div>


            <form onSubmit={guardarAviso}>

              <div className="formulario-grid">


                {/* TITULO */}

                <div className="campo campo-completo">

                  <label>
                    Título del aviso
                  </label>

                  <input
                    type="text"
                    name="titulo"
                    value={nuevoAviso.titulo}
                    onChange={manejarCambio}
                    placeholder="Ej: Cambio de horario"
                  />

                </div>


                {/* CURSO */}

                <div className="campo">

                  <label>
                    Curso
                  </label>

                  <select
                    name="curso"
                    value={nuevoAviso.curso}
                    onChange={manejarCambio}
                  >

                    <option value="">
                      Seleccionar curso
                    </option>

                    <option value="Todos los cursos">
                      Todos los cursos
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


                {/* FECHA */}

                <div className="campo">

                  <label>
                    Fecha
                  </label>

                  <input
                    type="date"
                    name="fecha"
                    value={nuevoAviso.fecha}
                    onChange={manejarCambio}
                  />

                </div>


                {/* DESCRIPCIÓN */}

                <div className="campo campo-completo">

                  <label>
                    Descripción
                  </label>

                  <textarea
                    name="descripcion"
                    value={nuevoAviso.descripcion}
                    onChange={manejarCambio}
                    placeholder="Escribí el contenido del aviso..."
                    rows={5}
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
    : "PUBLICAR AVISO"}
    
                </button>

              </div>

            </form>

          </section>

        )}


        {/* =====================================
            AVISOS PUBLICADOS
        ===================================== */}

        <section className="avisos-publicados">


          <div className="avisos-publicados-titulo">

            <div>

              <h2>
                Avisos publicados
              </h2>

              <p>
                {avisos.length}{" "}
                {avisos.length === 1
                  ? "aviso publicado"
                  : "avisos publicados"}
              </p>

            </div>

          </div>


          {avisos.length === 0 ? (

            <div className="sin-avisos">

              <Megaphone />

              <h3>
                No hay avisos publicados
              </h3>

              <p>
                Creá un nuevo aviso para comenzar.
              </p>

              <button
                onClick={() => setMostrarFormulario(true)}
              >

                <Plus />

                NUEVO AVISO

              </button>

            </div>

          ) : (

            <div className="lista-avisos">

              {avisos.map((aviso) => (

                <article
                  className="aviso-card"
                  key={aviso.id}
                >


                  <div className="aviso-card-icono">
                    <Megaphone />
                  </div>


                  <div className="aviso-card-contenido">

                    <span className="aviso-curso">
                      {aviso.curso}
                    </span>

                    <h3>
                      {aviso.titulo}
                    </h3>

                    <p>
                      {aviso.descripcion}
                    </p>

                    <span className="aviso-fecha">
                        Publicado: {mostrarFecha(aviso.fecha)}
                    </span>

                  </div>


                  <div className="aviso-acciones">

                    <button
                      className="editar-tarea"
                      onClick={() => editarAviso(aviso)}
                      title="Editar aviso"
                    >
                      <Pencil />
                    </button>

                    <button
                      className="eliminar-tarea"
                      onClick={() => eliminarAviso(aviso.id)}
                      title="Eliminar aviso"
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

export default AvisosProfesor;