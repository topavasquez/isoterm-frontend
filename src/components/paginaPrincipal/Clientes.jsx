import React from "react";

export default function Clientes() {
  const clientes = [
    {
      img: "/imagenes/alfa.png",
    },
    { img: "/imagenes/conce.png" },
    {
      img: "/imagenes/dent.png",
    },
    { img: "/imagenes/akami.png" },
    { img: "/imagenes/pet.png" },
  ];

  return (
    <div className="container py-5">
      <div className="row mb-5">
        <div className="col-12 text-center">
          <h2 className="display-6 fw-bold mb-3">Confiaron en Nosotros</h2>
          <p className="lead text-muted">
            Empresas que eligieron nuestros aires acondicionados para su confort
          </p>
        </div>
      </div>

      {/* Primera fila - 3 clientes */}
      <div className="row g-4 mb-4 justify-content-center">
        {clientes.slice(0, 3).map((cliente) => (
          <div key={cliente.id} className="col-lg-2 col-md-3 col-sm-4 col-6">
            <div className="card h-100 shadow-sm border-0">
              <div
                style={{
                  paddingTop: "100%",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <img
                  src={cliente.img}
                  className="card-img-top"
                  alt={cliente.nombre}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Segunda fila - 2 clientes centrados */}
      <div className="row g-4 justify-content-center">
        {clientes.slice(3, 5).map((cliente) => (
          <div key={cliente.id} className="col-lg-2 col-md-3 col-sm-4 col-6">
            <div className="card h-100 shadow-sm border-0">
              <div
                style={{
                  paddingTop: "100%",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <img
                  src={cliente.img}
                  className="card-img-top"
                  alt={cliente.nombre}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
