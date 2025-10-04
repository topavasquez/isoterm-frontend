import React, { useState } from "react";

function EditarCorreo({ usuario }) {
  const [nuevoCorreo, setNuevoCorreo] = useState(usuario.correo);
  const [mensaje, setMensaje] = useState("");
  const [modoEdicion, setModoEdicion] = useState(false);

  const handleEditar = () => {
    setModoEdicion(true);
  };

  const handleCancelar = () => {
    setModoEdicion(false);
    setMensaje("");
    setNuevoCorreo(usuario.correo);
  };

  const handleGuardar = async () => {
    try {
      const respuesta = await fetch(`http://localhost:3000/api/usuarios/${usuario.id_usuario}/correo`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ correo: nuevoCorreo }),
      });

      if (respuesta.ok) {
        const data = await respuesta.json();
        setMensaje("Correo actualizado correctamente ✅");
        setModoEdicion(false);
      } else {
        const error = await respuesta.json();
        setMensaje("Error: " + (error.error || "No se pudo actualizar"));
      }
    } catch (err) {
      setMensaje("Error al conectar con el servidor");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "20px auto", padding: "20px", border: "1px solid #ddd", borderRadius: "10px" }}>
      <h3>Mi cuenta</h3>

      <p><strong>Nombre:</strong> {usuario.nombre} {usuario.apellido}</p>
      <p><strong>Correo actual:</strong></p>

      {!modoEdicion ? (
        <>
          <p>{nuevoCorreo}</p>
          <button onClick={handleEditar} style={{ marginRight: "10px" }}>Editar</button>
        </>
      ) : (
        <>
          <input
            type="email"
            value={nuevoCorreo}
            onChange={(e) => setNuevoCorreo(e.target.value)}
            style={{ padding: "5px", width: "100%", marginBottom: "10px" }}
          />
          <button onClick={handleGuardar} style={{ marginRight: "10px" }}>Guardar</button>
          <button onClick={handleCancelar}>Cancelar</button>
        </>
      )}

      {mensaje && <p style={{ marginTop: "10px", color: "green" }}>{mensaje}</p>}
    </div>
  );
}

export default EditarCorreo;
