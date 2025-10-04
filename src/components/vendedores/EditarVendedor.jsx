import React, { useState } from 'react'

export default function EditarVendedor({ setOpen, vendedor, editarVendedor }) {
  const [form, setForm] = useState(vendedor)

  const handleSubmit = (e) => {
    e.preventDefault()
    editarVendedor(form)
  }

  return (
    <div className="modal d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Editar Vendedor</h5>
            <button type="button" className="btn-close" onClick={() => setOpen(false)}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input type="text" className="form-control" value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} />
              </div>
              <div className="mb-3">
                <label className="form-label">Apellido</label>
                <input type="text" className="form-control" value={form.apellido} onChange={(e) => setForm({ ...form, apellido: e.target.value })} />
              </div>
              <div className="mb-3">
                <label className="form-label">Correo</label>
                <input type="email" className="form-control" value={form.correo} onChange={(e) => setForm({ ...form, correo: e.target.value })} />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="password" className="form-control" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
              </div>
              <div className="mb-3">
                <label className="form-label">Teléfono</label>
                <input type="text" className="form-control" value={form.telefono} onChange={(e) => setForm({ ...form, telefono: e.target.value })} />
              </div>
              <div className="mb-3">
                <label className="form-label">Dirección</label>
                <input type="text" className="form-control" value={form.direccion} onChange={(e) => setForm({ ...form, direccion: e.target.value })} />
              </div>
              <button type="submit" className="btn btn-primary">Guardar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
