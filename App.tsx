import { BrowserRouter, Routes, Route } from "react-router-dom";


/* =========================================
   PÁGINAS DE INICIO, LOGIN, REGISTRO Y CONTACTO
========================================= */
import Inicio from "./inicio";
import Login from "./Login/iniciosesion";

import Alumno from "./Login/Alumno";
import Profesor from "./Login/Profesor";
import Administrador from "./Login/Administrador";

import Registro from "./Registro";
import RecuperarContraseña from "./RecuperarContraseña";
import Contacto from "./contacto";


/* =========================================
   PÁGINAS DEL profesor
========================================= */

import InicioProfesor from "./Profesor/inicio_profe";
import TareasProfesor from "./Profesor/tareasp";
import ExamenesProfesor from "./Profesor/examenesp";
import AvisosProfesor from "./Profesor/avisosp";
import EntregasProfesor from "./Profesor/entregas";
import PerfilProfesor from "./Profesor/perfilp";

/* =========================================
   PÁGINAS DEL ALUMNO
========================================= */

import AlumnoInicio from "./Alumno/inicio_alumno";
import Tareas from "./Alumno/tareas";
import Examenes from "./Alumno/examenes";
import Avisos from "./Alumno/avisos";
import Paicor from "./Alumno/paicor";
import Perfil from "./Alumno/perfil";


function App() {
 


  return (
    <BrowserRouter>

      <Routes>

        {/* =========================================
            PÁGINA PRINCIPAL
        ========================================= */}

        <Route
          path="/"
          element={<Inicio />}
        />

        {/* =========================================
            INICIO
        ========================================= */}

        <Route
          path="/inicio"
          element={<Inicio />}
        />

        {/* =========================================
            LOGIN
        ========================================= */}

        <Route
          path="/login"
          element={<Login />}
        />

        {/* =========================================
            LOGIN SEGÚN USUARIO
        ========================================= */}

        <Route
          path="/login/alumno"
          element={<Alumno />}
        />

        <Route
          path="/login/profesor"
          element={<Profesor />}
        />

        <Route
          path="/login/administrador"
          element={<Administrador />}
        />


        {/* =========================================
            REGISTRO Y RECUPERACIÓN
        ========================================= */}

        <Route
          path="/registro/:rol"
          element={<Registro />}
        />

        <Route
          path="/recuperar/:rol"
          element={<RecuperarContraseña />}
        />


        {/* =========================================
            CONTACTO
        ========================================= */}

        <Route
          path="/contacto"
          element={<Contacto />}
        />


        {/* =========================================
            PÁGINAS DEL ALUMNO
        ========================================= */}

        <Route
          path="/alumno"
          element={<AlumnoInicio />}
        />

        <Route
          path="/alumno/tareas"
          element={<Tareas />}
        />

        <Route
          path="/alumno/examenes"
          element={<Examenes />}
        />

        <Route
          path="/alumno/avisos"
          element={<Avisos />}
        />

        <Route
          path="/alumno/paicor"
          element={<Paicor />}
        />

        <Route
          path="/alumno/perfil"
          element={<Perfil />}
        />


        {/* =========================================
            PÁGINAS DEL PROFESOR
        ========================================= */}

        <Route
          path="/profesor"
          element={<InicioProfesor />}
        />
        <Route
  path="/profesor/tareas"
  element={<TareasProfesor />}
/>
<Route
  path="/profesor/examenes"
  element={<ExamenesProfesor />}
/>
<Route
  path="/profesor/avisos"
  element={<AvisosProfesor />}
/>

<Route
  path="/profesor/entregas"
  element={<EntregasProfesor />}
/>

<Route
  path="/profesor/perfil"
  element={<PerfilProfesor />}
/>




      </Routes>

    </BrowserRouter>
  );
}

export default App;