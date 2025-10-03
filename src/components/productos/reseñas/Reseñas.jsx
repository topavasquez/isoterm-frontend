import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Reseñas({ 
  productoId, 
  usuario, 
  reseñas, 
  onReseñaEnviada 
}) {
  const navigate = useNavigate();
  const [nuevaReseña, setNuevaReseña] = useState({
    nombre: usuario?.nombre || '',
    comentario: ''
  });
  const [enviandoReseña, setEnviandoReseña] = useState(false);

  const handleReseñaChange = (e) => {
    setNuevaReseña({
      ...nuevaReseña,
      [e.target.id]: e.target.value
    });
  };

  const enviarReseña = async (e) => {
    e.preventDefault();

    if (!usuario) {
      alert('Debes iniciar sesión para enviar una reseña');
      navigate('/login');
      return;
    }

    try {
      setEnviandoReseña(true);
      const response = await fetch(`http://localhost:3000/api/comentarios`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id_usuario: usuario.id_usuario,
          id_aire_acondicionado: parseInt(productoId),
          texto: nuevaReseña.comentario,
          fecha: new Date().toISOString()
        })
      });

      if (response.ok) {
        setNuevaReseña(prev => ({ ...prev, comentario: '' }));
        onReseñaEnviada();
        alert('Reseña enviada con éxito');
      } else {
        throw new Error('Error al enviar la reseña');
      }
    } catch (error) {
      console.error('Error enviando reseña: ', error);
      alert('Error al enviar la reseña. Inténtalo de nuevo más tarde.');
    } finally {
      setEnviandoReseña(false);
    }
  };

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-info text-white">
        <h3 className="card-title mb-0">
          Opiniones de clientes
        </h3>
      </div>
      <div className="card-body">
        {/* Formulario para nueva reseña */}
        <div className="mb-4">
          <h5 className="mb-3">Escribir una reseña</h5>
          {usuario ? (
            <form onSubmit={enviarReseña}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Nombre</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="nombre"
                    value={nuevaReseña.nombre}
                    readOnly
                    style={{ backgroundColor: '#f8f9fa' }}
                  />
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Comentario</label>
                <textarea 
                  className="form-control" 
                  rows="4" 
                  id="comentario"
                  value={nuevaReseña.comentario}
                  onChange={handleReseñaChange}
                  placeholder="Comparte tu experiencia con este producto..."
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary" disabled={enviandoReseña}>
                {enviandoReseña ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Enviando...
                  </>
                ) : (
                  'Enviar reseña'
                )}
              </button>
            </form>
          ) : (
            <div className="alert alert-warning">
              Debes <button 
                className="btn btn-link p-0 align-baseline" 
                onClick={() => navigate('/login')}
              >
                iniciar sesión
              </button> para escribir una reseña.
            </div>
          )}
        </div>

        <hr />

        {/* Lista de comentarios */}
        <h5 className="mb-4">Reseñas de clientes ({reseñas.length})</h5>
        {reseñas.length > 0 ? (
          <div className="row">
            {reseñas.map((reseña, index) => (
              <div key={index} className="col-12 mb-3">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h6 className="card-title mb-0">
                        {`${reseña.usuario.nombre}`}
                      </h6>
                      <small className="text-muted">
                        {new Date(reseña.fecha).toLocaleDateString('es-ES', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </small>
                    </div>
                    <p className="card-text">{reseña.texto}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-muted">Aún no hay reseñas para este producto. ¡Sé el primero en escribir una!</p>
          </div>
        )}
      </div>
    </div>
  );
}