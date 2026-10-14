import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  User,
  Mail,
  Phone,
  GraduationCap,
  Pencil,
  Save,
  X,
} from "lucide-react";

import "../global.css";
import { supabase } from "../lib/supabase";

const PerfilAlumno: React.FC = () => {
  const navigate = useNavigate();

  const [editando, setEditando] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);

  const [alumnoId, setAlumnoId] = useState<number | null>(null);

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [curso, setCurso] = useState("");

  // =========================================
  // CARGAR ALUMNO DESDE SUPABASE
  // =========================================

  useEffect(() => {
    cargarAlumno();
  }, []);

  const cargarAlumno = async () => {
  setCargando(true);

  try {
    const { data, error } = await supabase
      .from("alumnos")
      .select("id, nombre, email, telefono, curso")
      .eq("id", 1)
      .maybeSingle();

    console.log("DATOS RECIBIDOS:", data);
    console.log("ERROR AL CARGAR:", error);

    if (error) {
      alert("Error al cargar el alumno: " + error.message);
      return;
    }

    if (!data) {
      alert("No se encontró ningún alumno con ID 1.");
      return;
    }

    setAlumnoId(Number(data.id));
    setNombre(data.nombre || "");
    setEmail(data.email || "");
    setTelefono(data.telefono || "");
    setCurso(data.curso || "");
  } catch (error) {
    console.error("Error inesperado:", error);
    alert("Ocurrió un error al cargar el perfil.");
  } finally {
    setCargando(false);
  }
};
  // =========================================
  // GUARDAR CAMBIOS EN SUPABASE
  // =========================================

 const guardarCambios = async () => {
  console.log("INICIANDO GUARDADO");
  console.log("ID DEL ALUMNO:", alumnoId);

  if (alumnoId === null || alumnoId === undefined) {
    alert("No se encontró el ID del alumno. Vamos a revisar la carga de datos.");
    return;
  }

  setGuardando(true);

  try {
    const { data, error } = await supabase
      .from("alumnos")
      .update({
        nombre: nombre,
        email: email,
        telefono: telefono,
        curso: curso,
      })
      .eq("id", alumnoId)
      .select();

    console.log("RESULTADO DEL GUARDADO:", data);
    console.log("ERROR DE SUPABASE:", error);

    if (error) {
      alert("Error al guardar: " + error.message);
      return;
    }

    if (!data || data.length === 0) {
      alert(
        "Supabase no actualizó ningún registro. Revisá las políticas de la tabla alumnos."
      );
      return;
    }

    alert("¡Los cambios se guardaron correctamente!");
    setEditando(false);
  } catch (error) {
    console.error("ERROR INESPERADO:", error);
    alert("Ocurrió un error inesperado al guardar.");
  } finally {
    setGuardando(false);
  }
};
  // =========================================
  // PANTALLA DE CARGA
  // =========================================

  if (cargando) {
    return (
      <div className="pagina">
        <main
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "70vh",
          }}
        >
          <h2>Cargando perfil...</h2>
        </main>
      </div>
    );
  }

  // =========================================
  // PÁGINA
  // =========================================

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

            <span>
              DESPEÑADEROS
            </span>
          </div>

        </div>

        <div className="titulo-sistema">
          PANEL DEL ALUMNO
        </div>

        <button
          className="volver-button"
          onClick={() => navigate("/alumno")}
        >
          Volver
        </button>

      </header>

      <nav className="navbar">

        <button onClick={() => navigate("/alumno")}>
          Inicio
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

        <button onClick={() => navigate("/alumno/entregas")}>
          Entregas
        </button>

        <button
          className="activo"
          onClick={() => navigate("/alumno/perfil")}
        >
          Perfil
        </button>

      </nav>

      <main className="alumno-perfil-contenido">

        <section className="alumno-perfil-encabezado">

          <div className="alumno-perfil-encabezado-contenido">

            <div className="alumno-perfil-icono-principal">
              <User />
            </div>

            <div>

              <span>
                ESPACIO DEL ALUMNO
              </span>

              <h2>
                Mi perfil
              </h2>

              <p>
                Consultá y modificá tus datos personales.
              </p>

            </div>

          </div>

        </section>

        <section className="alumno-perfil-contenedor">

          {/* =========================================
              PRESENTACIÓN
          ========================================= */}

          <div className="alumno-perfil-presentacion">

            <div className="alumno-perfil-avatar">

              <img
                src="/alumno.jpg"
                alt="Foto de perfil"
              />

            </div>

            <h2>
              {nombre}
            </h2>

            <p>
              Alumno/a
            </p>

            <span>
              {curso}
            </span>

          </div>

          {/* =========================================
              DATOS
          ========================================= */}

          <div className="alumno-perfil-datos">

            <div className="alumno-perfil-seccion-titulo">

              <div>

                <h3>
                  Información personal
                </h3>

                <p>
                  Estos son los datos asociados a tu cuenta.
                </p>

              </div>

              {!editando ? (

                <button
                  className="alumno-editar-btn"
                  onClick={() => setEditando(true)}
                >
                  <Pencil />
                  Editar perfil
                </button>

              ) : (

                <button
                  className="alumno-cancelar-btn"
                  onClick={() => {
                    setEditando(false);
                    cargarAlumno();
                  }}
                >
                  <X />
                  Cancelar
                </button>

              )}

            </div>

            {/* NOMBRE */}

            <div className="alumno-perfil-campo">

              <div className="alumno-perfil-campo-icono">
                <User />
              </div>

              <div className="alumno-perfil-campo-info">

                <label>
                  Nombre completo
                </label>

                {editando ? (

                  <input
                    type="text"
                    value={nombre}
                    onChange={(e) =>
                      setNombre(e.target.value)
                    }
                  />

                ) : (

                  <strong>
                    {nombre}
                  </strong>

                )}

              </div>

            </div>

            {/* EMAIL */}

            <div className="alumno-perfil-campo">

              <div className="alumno-perfil-campo-icono">
                <Mail />
              </div>

              <div className="alumno-perfil-campo-info">

                <label>
                  Correo electrónico
                </label>

                {editando ? (

                  <input
                    type="email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                  />

                ) : (

                  <strong>
                    {email}
                  </strong>

                )}

              </div>

            </div>

            {/* TELÉFONO */}

            <div className="alumno-perfil-campo">

              <div className="alumno-perfil-campo-icono">
                <Phone />
              </div>

              <div className="alumno-perfil-campo-info">

                <label>
                  Teléfono
                </label>

                {editando ? (

                  <input
                    type="text"
                    value={telefono}
                    onChange={(e) =>
                      setTelefono(e.target.value)
                    }
                  />

                ) : (

                  <strong>
                    {telefono}
                  </strong>

                )}

              </div>

            </div>

            {/* CURSO */}

            <div className="alumno-perfil-campo">

              <div className="alumno-perfil-campo-icono">
                <GraduationCap />
              </div>

              <div className="alumno-perfil-campo-info">

                <label>
                  Curso
                </label>

                {editando ? (

                  <input
                    type="text"
                    value={curso}
                    onChange={(e) =>
                      setCurso(e.target.value)
                    }
                  />

                ) : (

                  <strong>
                    {curso}
                  </strong>

                )}

              </div>

            </div>

            {/* BOTÓN GUARDAR */}
{editando && (
  <div className="alumno-perfil-guardar">
   <button
  type="button"
  className="alumno-guardar-btn"
  disabled={guardando}
  onClick={guardarCambios}
>
  <Save />
  {guardando ? "GUARDANDO..." : "GUARDAR CAMBIOS"}
</button>
  </div>
)}

          </div>

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

export default PerfilAlumno;