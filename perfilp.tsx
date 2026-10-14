import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  User,
  Mail,
  Phone,
  BookOpen,
  Pencil,
  Save,
  X,
} from "lucide-react";

import "../global.css";
import { supabase } from "../lib/supabase";

const PerfilProfesor: React.FC = () => {
  const navigate = useNavigate();

  const [editando, setEditando] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);

  const [profesorId, setProfesorId] = useState<number | null>(null);

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [materia, setMateria] = useState("");

  // =========================================
  // CARGAR DATOS DEL PROFESOR
  // =========================================

  useEffect(() => {
    cargarProfesor();
  }, []);

  const cargarProfesor = async () => {
    setCargando(true);

    try {
      const { data, error } = await supabase
        .from("profesores")
        .select("id, nombre, email, telefono, materia")
        .limit(1)
        .maybeSingle();

      console.log("DATOS DEL PROFESOR:", data);
      console.log("ERROR AL CARGAR PROFESOR:", error);

      if (error) {
        console.error(error);
        alert("Error al cargar el profesor: " + error.message);
        return;
      }

      if (!data) {
        alert(
          "No se encontró ningún profesor. Revisá la tabla profesores en Supabase."
        );
        return;
      }

      setProfesorId(Number(data.id));
      setNombre(data.nombre || "");
      setEmail(data.email || "");
      setTelefono(data.telefono || "");
      setMateria(data.materia || "");
    } catch (error) {
      console.error("ERROR INESPERADO:", error);
      alert("Ocurrió un error al cargar el perfil.");
    } finally {
      setCargando(false);
    }
  };

  // =========================================
  // GUARDAR CAMBIOS
  // =========================================

  const guardarCambios = async () => {
    if (profesorId === null) {
      alert("No se encontró el ID del profesor.");
      return;
    }

    setGuardando(true);

    try {
      const { data, error } = await supabase
        .from("profesores")
        .update({
          nombre,
          email,
          telefono,
          materia,
        })
        .eq("id", profesorId)
        .select();

      console.log("RESULTADO DEL GUARDADO:", data);
      console.log("ERROR AL GUARDAR:", error);

      if (error) {
        alert("Error al guardar: " + error.message);
        return;
      }

      if (!data || data.length === 0) {
        alert(
          "No se actualizó ningún registro. Revisá las políticas de la tabla profesores."
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
  // CANCELAR EDICIÓN
  // =========================================

  const cancelarEdicion = () => {
    setEditando(false);
    cargarProfesor();
  };

  // =========================================
  // CARGANDO
  // =========================================

  if (cargando) {
    return (
      <div className="pagina">
        <main
          style={{
            minHeight: "70vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2>Cargando perfil del profesor...</h2>
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
            <span>DESPEÑADEROS</span>
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

        <button onClick={() => navigate("/profesor/entregas")}>
          Entregas
        </button>

        <button onClick={() => navigate("/profesor/alumnos")}>
          Alumnos
        </button>

        <button
          className="activo"
          onClick={() => navigate("/profesor/perfil")}
        >
          Perfil
        </button>
      </nav>

      <main className="profesor-perfil-contenido">

        <section className="perfil-encabezado">
          <div className="perfil-encabezado-contenido">

            <div className="perfil-icono-principal">
              <User />
            </div>

            <div>
              <span>ESPACIO DOCENTE</span>

              <h2>Mi perfil</h2>

              <p>
                Consultá y modificá tus datos personales.
              </p>
            </div>

          </div>
        </section>

        <section className="perfil-contenedor">

          <div className="perfil-presentacion">

            <div className="perfil-avatar">
              <User />
            </div>

            <div>
              <h2>{nombre}</h2>
              <p>Profesor/a</p>
              <span>{materia}</span>
            </div>

          </div>

          <div className="perfil-datos">

            <div className="perfil-seccion-titulo">

              <div>
                <h3>Información personal</h3>

                <p>
                  Estos son los datos asociados a tu cuenta.
                </p>
              </div>

              {!editando ? (
                <button
                  type="button"
                  className="editar-perfil-btn"
                  onClick={() => setEditando(true)}
                >
                  <Pencil />
                  Editar perfil
                </button>
              ) : (
                <button
                  type="button"
                  className="cancelar-perfil-btn"
                  onClick={cancelarEdicion}
                  disabled={guardando}
                >
                  <X />
                  Cancelar
                </button>
              )}

            </div>

            {/* NOMBRE */}

            <div className="perfil-campo">

              <div className="perfil-campo-icono">
                <User />
              </div>

              <div className="perfil-campo-info">
                <label>Nombre completo</label>

                {editando ? (
                  <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  />
                ) : (
                  <strong>{nombre}</strong>
                )}
              </div>

            </div>

            {/* EMAIL */}

            <div className="perfil-campo">

              <div className="perfil-campo-icono">
                <Mail />
              </div>

              <div className="perfil-campo-info">
                <label>Correo electrónico</label>

                {editando ? (
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                ) : (
                  <strong>{email}</strong>
                )}
              </div>

            </div>

            {/* TELÉFONO */}

            <div className="perfil-campo">

              <div className="perfil-campo-icono">
                <Phone />
              </div>

              <div className="perfil-campo-info">
                <label>Teléfono</label>

                {editando ? (
                  <input
                    type="text"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                  />
                ) : (
                  <strong>{telefono}</strong>
                )}
              </div>

            </div>

            {/* MATERIA */}

            <div className="perfil-campo">

              <div className="perfil-campo-icono">
                <BookOpen />
              </div>

              <div className="perfil-campo-info">
                <label>Materia principal</label>

                {editando ? (
                  <input
                    type="text"
                    value={materia}
                    onChange={(e) => setMateria(e.target.value)}
                  />
                ) : (
                  <strong>{materia}</strong>
                )}
              </div>

            </div>

            {/* GUARDAR */}

            {editando && (
              <div className="perfil-guardar">
                <button
                  type="button"
                  className="guardar-perfil-btn"
                  onClick={guardarCambios}
                  disabled={guardando}
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

export default PerfilProfesor;