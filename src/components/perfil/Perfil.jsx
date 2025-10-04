import React from "react";
import EditarCorreo from "./EditarCorreo";

function Perfil() {
  const usuario = {
    id_usuario: 1,
    nombre: "Polo",
    apellido: "Ramirez",
    correo: "nuevo123@gmail.com",
  };

  return (
    <div>
      <EditarCorreo usuario={usuario} />
    </div>
  );
}

export default Perfil;
