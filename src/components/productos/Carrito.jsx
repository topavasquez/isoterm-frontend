import React from "react";
import { FaTimes, FaPlus, FaMinus, FaTrash, FaCog, FaTools } from "react-icons/fa";
import { useCarrito } from "../../context/CarritoContext";

export function Carrito() {
  const {
    cartItems,
    isCarritoOpen,
    cerrarCarrito,
    actualizarCantidad,
    eliminarDelCarrito,
    vaciarCarrito,
    totalPrecio,
    agregarAlCarrito,
  } = useCarrito();

  // Items de sugerencia
  const itemsSugeridos = [
    {
      id: "service-mantencion",
      nombre: "Servicio de Mantención",
      descripcion: "Mantención preventiva anual",
      precio: 25000,
      tipo: "servicio",
      iconType: "mantencion", 
    },
    {
      id: "service-instalacion",
      nombre: "Servicio de Instalación",
      descripcion: "Instalación profesional por técnico especializado",
      precio: 35000,
      tipo: "servicio",
      iconType: "instalacion", 
    },
  ];

  // Función para obtener el icono basado en el tipo
  const getIcon = (iconType) => {
    switch (iconType) {
      case "mantencion":
        return <FaCog />;
      case "instalacion":
        return <FaTools />;
      default:
        return <FaCog />;
    }
  };

  // Filtrar sugerencias que no estén ya en el carrito
  const sugerenciasDisponibles = itemsSugeridos.filter(
    (sugerencia) => !cartItems.some((item) => item.id === sugerencia.id)
  );

  const handleUpdateQuantity = (id, newQuantity) => {
    actualizarCantidad(id, newQuantity);
  };

  const handleRemoveItem = (id) => {
    eliminarDelCarrito(id);
  };

  const handleAgregarSugerencia = (sugerencia) => {
    const servicioLimpio = {
      id: sugerencia.id,
      nombre: sugerencia.nombre,
      descripcion: sugerencia.descripcion,
      precio: sugerencia.precio,
      tipo: sugerencia.tipo,
      iconType: sugerencia.iconType,
      cantidad: 1,
    };

    agregarAlCarrito(servicioLimpio);
  };

  if (!isCarritoOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
        style={{ zIndex: 1040 }}
        onClick={cerrarCarrito}
      ></div>

      {/* Carrito Sidebar */}
      <div
        className="position-fixed top-0 end-0 h-100 bg-white shadow-lg"
        style={{
          width: "400px",
          zIndex: 1050,
          transform: isCarritoOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s ease-in-out",
        }}
      >
        {/* Header del Carrito */}
        <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
          <h5 className="mb-0 fw-bold">Carrito de Compras</h5>
          <div className="d-flex gap-2">
            {cartItems.length > 0 && (
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={vaciarCarrito}
                title="Vaciar carrito"
              >
                <FaTrash size={14} />
              </button>
            )}
            <button
              className="btn btn-link text-dark p-0"
              onClick={cerrarCarrito}
            >
              <FaTimes size={20} />
            </button>
          </div>
        </div>

        {/* Contenido del Carrito */}
        <div
          className="flex-grow-1 overflow-auto"
          style={{ height: "calc(100vh - 200px)" }}
        >
          {cartItems.length === 0 ? (
            <div className="text-center p-4">
              <div className="mb-3">
                <i className="fas fa-shopping-cart fs-1 text-muted"></i>
              </div>
              <h6 className="text-muted">Tu carrito está vacío</h6>
              <p className="text-muted small">
                Agrega productos para empezar a comprar
              </p>
            </div>
          ) : (
            <div className="p-3">
              {/* Items del carrito */}
              {cartItems.map((item) => (
                <div key={item.id} className="card mb-3 border-0 shadow-sm">
                  <div className="card-body p-3">
                    <div className="row align-items-center">
                      <div className="col-3">
                        {item.tipo === "servicio" ? (
                          <div
                            className="text-center text-primary fs-2 d-flex align-items-center justify-content-center"
                            style={{ height: "60px" }}
                          >
                            {getIcon(item.iconType)}
                          </div>
                        ) : (
                          <img
                            src={item.imagen || "/imagenes/placeholder.jpg"}
                            alt={item.nombre}
                            className="img-fluid rounded"
                            style={{ height: "60px", objectFit: "cover" }}
                          />
                        )}
                      </div>
                      <div className="col-6">
                        <h6 className="mb-1 fw-semibold">{item.nombre}</h6>
                        <p className="mb-0 text-muted small">
                          {item.descripcion}
                        </p>
                        <p className="mb-0 fw-bold text-primary">
                          ${item.precio?.toLocaleString("es-CL")}
                        </p>
                      </div>
                      <div className="col-3">
                        <div className="d-flex flex-column align-items-center">
                          {/* Controles de cantidad */}
                          <div className="d-flex align-items-center mb-2">
                            <button
                              className="btn btn-outline-secondary btn-sm"
                              onClick={() =>
                                handleUpdateQuantity(item.id, item.cantidad - 1)
                              }
                            >
                              <FaMinus size={10} />
                            </button>
                            <span className="mx-2 fw-bold">
                              {item.cantidad}
                            </span>
                            <button
                              className="btn btn-outline-secondary btn-sm"
                              onClick={() =>
                                handleUpdateQuantity(item.id, item.cantidad + 1)
                              }
                            >
                              <FaPlus size={10} />
                            </button>
                          </div>
                          {/* Botón eliminar */}
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => handleRemoveItem(item.id)}
                          >
                            <FaTrash size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Sección de Sugerencias */}
              {sugerenciasDisponibles.length > 0 && (
                <div className="mt-4">
                  <div className="d-flex align-items-center mb-3">
                    <hr className="flex-grow-1" />
                    <span className="px-3 text-muted small fw-bold">
                      SERVICIOS RECOMENDADOS
                    </span>
                    <hr className="flex-grow-1" />
                  </div>

                  {sugerenciasDisponibles.map((sugerencia) => (
                    <div
                      key={sugerencia.id}
                      className="card mb-2 border-0 bg-light"
                    >
                      <div className="card-body p-3">
                        <div className="row align-items-center">
                          <div className="col-2">
                            <div className="text-primary fs-4">
                              {getIcon(sugerencia.iconType)}
                            </div>
                          </div>
                          <div className="col-7">
                            <h6 className="mb-1 fw-semibold text-truncate">
                              {sugerencia.nombre}
                            </h6>
                            <p className="mb-0 text-muted small">
                              {sugerencia.descripcion}
                            </p>
                            <p className="mb-0 fw-bold text-success">
                              ${sugerencia.precio.toLocaleString("es-CL")}
                            </p>
                          </div>
                          <div className="col-3">
                            <button
                              className="btn btn-outline-primary btn-sm w-100"
                              onClick={() => handleAgregarSugerencia(sugerencia)}
                            >
                              <FaPlus size={14} className="me-1" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer del Carrito */}
        {cartItems.length > 0 && (
          <div className="border-top p-3 bg-light">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="fw-bold">Total:</span>
              <span className="fw-bold fs-5 text-primary">
                ${totalPrecio.toLocaleString("es-CL")}
              </span>
            </div>
            <div className="d-grid gap-2">
              <button className="btn btn-primary">Proceder al Pago</button>
              <button
                className="btn btn-outline-secondary"
                onClick={cerrarCarrito}
              >
                Seguir Comprando
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Carrito;
