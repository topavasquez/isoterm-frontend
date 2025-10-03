import React from 'react'

export default function EliminarAire({ setOpen, aireAEliminar, eliminarAire }) {
    return (
        <div className="modal d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Eliminar Aire Acondicionado</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setOpen(false)}></button>
                    </div>
                    <div className="modal-body">
                        <p>Quieres eliminar el aire acondicionado {aireAEliminar.modelo}</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={()=>setOpen(false)}>Cerrar</button>
                        <button type="button" className="btn btn-primary" onClick={eliminarAire}>Aceptar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
