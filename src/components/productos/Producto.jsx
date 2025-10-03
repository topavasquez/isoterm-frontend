import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {useEffect, useState} from 'react';
import aire from '../../assets/aireacondicionado.jpg'

export default function Producto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducto = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3000/api/aires/${id}`);
      if (!response.ok) {
        throw new Error('Producto no encontrado');
      }
      const data = await response.json();
      setProducto(data);
    } catch (error) {
      console.error('Error fetching producto: ', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducto();
  }, [id]);

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-3">Cargando producto...</p>
        </div>
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
              <p>{error || 'El producto que buscas no existe'}</p>
              <button 
                className="btn btn-primary" 
                onClick={() => navigate('/')}
              >
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
      <div className="container py-3">
        <div className="row">
          <div className="col-12">
            <button 
              className="btn btn-outline-primary" 
              onClick={() => navigate('/')}
            >
              ← Volver a productos
            </button>
          </div>
        </div>
      </div>

      {/* Imagen producto */}
      <div className="bg-white py-5 mb-4">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 text-center">
              <div className="position-relative">
                {producto.imagen ? (
                  <img 
                    src={aire} 
                    alt={`${producto.marca} ${producto.modelo}`}
                    className="img-fluid rounded shadow-lg"
                    style={{ maxHeight: '400px', objectFit: 'contain' }}
                  />
                ) : (
                  <div className="bg-light rounded shadow p-5" style={{ minHeight: '300px' }}>
                    <i className="fas fa-snowflake fa-8x text-primary mb-3"></i>
                    <h5 className="text-muted">Imagen no disponible</h5>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Información del producto */}
      <div className="container pb-5">
        <div className="row">
          <div className="col-12 mb-4">
            <div className="card shadow-sm">
              <div className="card-body text-center">
                <h1 className="display-5 fw-bold text-primary mb-2">
                  {producto.marca} {producto.modelo}
                </h1>
                <p className="lead text-muted">
                  Aire acondicionado de {producto.btu} BTU con tecnología avanzada
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row g-4">
          {/* Especificaciones técnicas */}
          <div className="col-lg-8">
            <div className="card shadow-sm h-100">
              <div className="card-header bg-primary text-white">
                <h3 className="card-title mb-0">
                  <i className="fas fa-cogs me-2"></i>
                  Especificaciones Técnicas
                </h3>
              </div>
              <div className="card-body">
                <div className="row g-4">
                  <div className="col-md-6">
                    <div className="d-flex align-items-center p-3 bg-light rounded">
                      <div className="flex-shrink-0">
                        <i className="fas fa-thermometer-half fa-2x text-primary"></i>
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <h6 className="mb-1">Capacidad BTU</h6>
                        <h4 className="mb-0 text-primary">{producto.btu}</h4>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="d-flex align-items-center p-3 bg-light rounded">
                      <div className="flex-shrink-0">
                        <i className="fas fa-home fa-2x text-success"></i>
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <h6 className="mb-1">Alcance</h6>
                        <h4 className="mb-0 text-success">{producto.alcance} m²</h4>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="d-flex align-items-center p-3 bg-light rounded">
                      <div className="flex-shrink-0">
                        <i className={`fas fa-wifi fa-2x ${producto.wifi ? 'text-info' : 'text-secondary'}`}></i>
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <h6 className="mb-1">Conectividad WiFi</h6>
                        <span className={`badge fs-6 ${producto.wifi ? 'bg-info' : 'bg-secondary'}`}>
                          {producto.wifi ? 'Incluido' : 'No incluido'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="d-flex align-items-center p-3 bg-light rounded">
                      <div className="flex-shrink-0">
                        <i className="fas fa-tag fa-2x text-warning"></i>
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <h6 className="mb-1">Marca</h6>
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
            <div className="card shadow-sm sticky-top" style={{ top: '20px' }}>
              <div className="card-header bg-success text-white text-center">
                <h3 className="card-title mb-0">
                  <i className="fas fa-dollar-sign me-2"></i>
                  Precio
                </h3>
              </div>
              <div className="card-body text-center">
                <div className="mb-4">
                  <h1 className="display-4 text-success fw-bold mb-0">
                    ${Number(producto.precio).toLocaleString()}
                  </h1>
                  <small className="text-muted">Precio final</small>
                </div>

                <div className="d-grid gap-2">
                  <button className="btn btn-success btn-lg">
                    <i className="fas fa-shopping-cart me-2"></i>
                    Agregar al carrito
                  </button>
                  
                  <button className="btn btn-outline-primary">
                    <i className="fas fa-phone me-2"></i>
                    Contactar vendedor
                  </button>
                </div>

                <hr />
                
                <div className="text-start">
                  <small className="text-muted">
                    <i className="fas fa-truck me-1"></i>
                    Envío gratis a todo el país<br/>
                    <i className="fas fa-shield-alt me-1"></i>
                    Garantía oficial de 2 años<br/>
                    <i className="fas fa-tools me-1"></i>
                    Instalación profesional incluida
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sección de comentarios */}
        <div className="row mt-5">
          <div className="col-12">
            <div className="card shadow-sm">
              <div className="card-header bg-info text-white">
                <h3 className="card-title mb-0">
                  <i className="fas fa-comments me-2"></i>
                  Opiniones de clientes
                </h3>
              </div>
              <div className="card-body">
                {/* Formulario para nueva reseña */}
                <div className="mb-4">
                  <h5 className="mb-3">Escribir una reseña</h5>
                  <form>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Nombre</label>
                        <input type="text" className="form-control" placeholder="Tu nombre" />
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Comentario</label>
                      <textarea className="form-control" rows="4" placeholder="Comparte tu experiencia con este producto..."></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Enviar reseña
                    </button>
                  </form>
                </div>

                <hr />

                {/* Lista de comentarios */}
                <h5 className="mb-4">Reseñas de clientes</h5>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}