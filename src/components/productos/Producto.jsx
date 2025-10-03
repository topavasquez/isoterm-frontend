import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import aire from "../../assets/aireacondicionado.jpg";
import { useCarrito } from "../../context/CarritoContext";
import Reseñas from "./reseñas/Reseñas";

export default function Producto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [reseñas, setReseñas] = useState([]);

  const { agregarAlCarrito, abrirCarrito, mostrarEstadoCarrito } = useCarrito();

  useEffect(() => {
    const usuarioLogueado = localStorage.getItem("usuario");
    if (usuarioLogueado) {
      setUsuario(JSON.parse(usuarioLogueado));
    }
  }, []);

  const fetchProducto = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3000/api/aires/${id}`);
      if (!response.ok) throw new Error("Producto no encontrado");
      const data = await response.json();
      setProducto(data);
    } catch (error) {
      console.error("Error fetching producto: ", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchReseñas = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/comentarios/aire/${id}`
      );
      const data = await response.json();
      setReseñas(data);
    } catch (error) {
      console.error("Error fetching reseñas: ", error);
    }
  };

  const handleReseñaEnviada = () => {
    fetchReseñas();
  };

  useEffect(() => {
    fetchProducto();
    fetchReseñas();
  }, [id]);

  const handleAgregarAlCarrito = () => {
    if (!producto) return;

    const uniqueId = `product_${producto.id}_${producto.marca.replace(
      /\s+/g,
      ""
    )}_${producto.modelo.replace(/\s+/g, "")}_${producto.btu}_${
      producto.precio
    }`;
    const productoParaCarrito = {
      id: uniqueId,
      originalId: producto.id,
      nombre: `${producto.marca} ${producto.modelo}`,
      descripcion: `${producto.btu} BTU`,
      precio: producto.precio,
      imagen: aire,
      marca: producto.marca,
      modelo: producto.modelo,
      btu: producto.btu,
    };

    agregarAlCarrito(productoParaCarrito);
    abrirCarrito();
    setTimeout(() => mostrarEstadoCarrito(), 100);
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-3">Cargando producto...</p>
      </div>
    );
  }

  if (error || !producto) {
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="alert alert-danger text-center">
              <h4>Producto no encontrado</h4>
              <p>{error || "El producto que buscas no existe"}</p>
              <button className="btn btn-primary" onClick={() => navigate("/")}>
                Volver al inicio
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid bg-light min-vh-100">
      {/* Botón volver */}
      <div className="container py-3">
        <button
          className="btn btn-outline-primary"
          onClick={() => navigate("/")}
        >
          ← Volver a productos
        </button>
      </div>

      {/* Imagen producto */}
      <div className="bg-white py-5 mb-4">
        <div className="container text-center">
          {producto.imagen ? (
            <img
              src={aire}
              alt={`${producto.marca} ${producto.modelo}`}
              className="img-fluid rounded shadow-lg"
              style={{ maxHeight: "400px", objectFit: "contain" }}
            />
          ) : (
            <div
              className="bg-light rounded shadow p-5"
              style={{ minHeight: "300px" }}
            >
              <i className="fas fa-snowflake fa-8x text-primary mb-3"></i>
              <h5 className="text-muted">Imagen no disponible</h5>
            </div>
          )}
        </div>
      </div>

      {/* Información y panel de compra */}
      <div className="container pb-5">
        <div className="row g-4">
          {/* Especificaciones técnicas */}
          <div className="col-lg-8">
            <div className="card shadow-sm h-100">
              <div className="card-header bg-primary text-white">
                <h3 className="card-title mb-0">Especificaciones Técnicas</h3>
              </div>
              <div className="card-body">
                <div className="row g-4">
                  <div className="col-md-6">
                    <div className="d-flex align-items-center p-3 bg-light rounded">
                      <div className="flex-grow-1 ms-3">
                        <h6>Capacidad BTU</h6>
                        <h4 className="mb-0 text-primary">{producto.btu}</h4>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="d-flex align-items-center p-3 bg-light rounded">
                      <div className="flex-grow-1 ms-3">
                        <h6>Alcance</h6>
                        <h4 className="mb-0 text-success">
                          {producto.alcance} m²
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="d-flex align-items-center p-3 bg-light rounded">
                      <div className="flex-shrink-0">
                        <i
                          className={`fas fa-wifi fa-2x ${
                            producto.wifi ? "text-info" : "text-secondary"
                          }`}
                        ></i>
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <h6>Conectividad WiFi</h6>
                        <span
                          className={`badge fs-6 ${
                            producto.wifi ? "bg-info" : "bg-secondary"
                          }`}
                        >
                          {producto.wifi ? "Incluido" : "No incluido"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="d-flex align-items-center p-3 bg-light rounded">
                      <div className="flex-grow-1 ms-3">
                        <h6>Marca</h6>
                        <h5 className="mb-0 text-dark">{producto.marca}</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Panel de compra */}
          <div className="col-lg-4">
            <div className="card shadow-sm sticky-top" style={{ top: "20px" }}>
              <div className="card-header bg-success text-white text-center">
                <h3 className="card-title mb-0">Precio</h3>
              </div>
              <div className="card-body text-center">
                <h1 className="display-4 text-success fw-bold mb-3">
                  ${Number(producto.precio).toLocaleString()}
                </h1>
                <button
                  className="btn btn-success btn-lg mb-2"
                  onClick={handleAgregarAlCarrito}
                >
                  <i className="fas fa-shopping-cart me-2"></i> Agregar al
                  carrito
                </button>
                <button className="btn btn-outline-primary mb-2">
                  Contactar vendedor
                </button>
                <hr />
                <small className="text-muted text-start d-block">
                  <i className="fas fa-truck me-1"></i> Envío gratis a todo el
                  país
                  <br />
                  <i className="fas fa-shield-alt me-1"></i> Garantía oficial de
                  2 años
                  <br />
                  <i className="fas fa-tools me-1"></i> Instalación profesional
                  incluida
                </small>
              </div>
            </div>
          </div>
        </div>

        {/* Reseñas */}
        <div className="row mt-5">
          <div className="col-12">
            <div className="card shadow-sm">
              <div className="card-header bg-info text-white">
                <h3 className="card-title mb-0">
                  <i className="fas fa-comments me-2"></i> Opiniones de clientes
                </h3>
              </div>
              <div className="card-body">
                <h5 className="mb-3">Escribir una reseña</h5>
                <form>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Tu nombre"
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <textarea
                      className="form-control"
                      rows="4"
                      placeholder="Comparte tu experiencia..."
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Enviar reseña
                  </button>
                </form>
                <hr />
                <h5 className="mb-4">Reseñas de clientes</h5>
                <Reseñas
                  productoId={id}
                  usuario={usuario}
                  reseñas={reseñas}
                  onReseñaEnviada={handleReseñaEnviada}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
