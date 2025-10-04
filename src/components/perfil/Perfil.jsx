import React, { useState } from "react";

export default function Perfil() {
  const [correo, setCorreo] = useState("");
  const [mensaje, setMensaje] = useState("");

  const actualizarCorreo = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/usuarios/1", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ correo }), 
      });

      const data = await response.json();

      if (response.ok) {
        setMensaje("Correo actualizado correctamente ✅");
      } else {
        setMensaje(data.message || "Error al actualizar correo ❌");
      }
    } catch (error) {
      setMensaje("Error de conexión con el servidor ❌");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Perfil de Usuario</h2>
      <div className="mb-3">
        <label className="form-label">Nuevo Correo:</label>
        <input
          type="email"
          className="form-control"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />
      </div>
      <button className="btn btn-primary" onClick={actualizarCorreo}>
        Actualizar Correo
      </button>
      {mensaje && <div className="alert alert-info mt-3">{mensaje}</div>}
    </div>
  );
}
