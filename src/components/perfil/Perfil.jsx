import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

export default function Perfil() {

  const { usuario, setUsuario } = useAuth()

  const [nuevoCorreo, setNuevoCorreo] = useState("");
  const [editarCorreo, setEditarCorreo] = useState(false);

  const actualizarCorreo = async () => {

    if (!usuario) return;

    try {
      const response = await fetch(`http://localhost:3000/api/usuarios/${usuario.id_usuario}/correo`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ correo: nuevoCorreo }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Correo actualizado correctamente");
        localStorage.setItem("usuario", JSON.stringify(data.usuario));
        setUsuario(data.usuario);
        setNuevoCorreo("")
      } else {
        alert(data.error || "Error al actualizar el correo");
      }
      
    } catch (error) {
      console.error("Error al actualizar:", error);
      alert("Ocurrió un error al actualizar el correo");
    }

  };

  if (!usuario) {
    return (
      <div className="container mt-5 text-center">
        <h3>No hay usuario logueado</h3>
      </div>
    );
  }

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="text-center mb-4">Perfil de Usuario</h2>
      <div className="card p-4 shadow">
        <p><strong>Nombre:</strong> {usuario.nombre}</p>
        <p><strong>Apellido:</strong> {usuario.apellido}</p>
        <p><strong>Rol:</strong> {usuario.rol}</p>
        <p>
          <strong>Correo:</strong>
          <input
            type="email"
            value={editarCorreo ? nuevoCorreo : usuario.correo}
            disabled={!editarCorreo}
            onChange={(e) => setNuevoCorreo(e.target.value)}
            className="ms-2"
          />
          <button
            className={`btn btn-sm ms-2 ${editarCorreo ? "btn-success" : "btn-primary"}`}
            onClick={() => {
              if (editarCorreo) {
                actualizarCorreo();
              }
              setEditarCorreo(!editarCorreo);
            }}
          >
            {editarCorreo ? "Guardar" : "Editar"}
          </button>
        </p>
      </div>
    </div>
  );
}
