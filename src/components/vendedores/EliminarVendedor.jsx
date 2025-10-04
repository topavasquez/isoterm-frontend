import React from 'react'

export default function EliminarVendedor({ setOpen, vendedorAEliminar, eliminarVendedor }) {
  return (
    <div className="modal d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Eliminar Vendedor</h5>
            <button type="button" className="btn-close" onClick={() => setOpen(false)}></button>
          </div>
          <div className="modal-body">
            <p>¿Estás seguro de que deseas eliminar al vendedor {vendedorAEliminar.nombre}?</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={() => setOpen(false)}>Cancelar</button>
            <button type="button" className="btn btn-danger" onClick={eliminarVendedor}>Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  )
}
