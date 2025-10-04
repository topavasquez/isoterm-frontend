import React, { useState, useEffect } from "react";

export default function Perfil() {
  const [usuario, setUsuario] = useState(null);
  const [nuevoCorreo, setNuevoCorreo] = useState("");

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario");
    if (usuarioGuardado) {
      const usuarioObj = JSON.parse(usuarioGuardado);
      setUsuario(usuarioObj);
      setNuevoCorreo(usuarioObj.correo);
    }
  }, []);

  const actualizarCorreo = async (e) => {
    e.preventDefault();
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
        <p><strong>Nombre:</strong> {usuario.nombre} {usuario.apellido}</p>
        <p><strong>Rol:</strong> {usuario.rol}</p>
        <form onSubmit={actualizarCorreo}>
          <div className="mb-3">
            <label className="form-label">Correo actual</label>
            <input
              type="email"
              className="form-control"
              value={nuevoCorreo}
              onChange={(e) => setNuevoCorreo(e.target.value)}
              required
            />
          </div>
          <button className="btn btn-primary w-100" type="submit">
            Actualizar correo
          </button>
        </form>
      </div>
    </div>
  );
}
