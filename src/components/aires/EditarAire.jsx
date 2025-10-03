import React from 'react'

export default function EditarAire({ setOpen, editarAire, form, setForm, loadingForm }) {
    return (
        <div className="modal d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Editar Aire</h5>
                        <button
                            type="button"
                            className="btn-close"
                            aria-label="Close"
                            onClick={() => setOpen(false)}
                        ></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="marca" className="form-label">Marca</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="marca"
                                    value={form.marca}
                                    onChange={(e) => setForm({ ...form, marca: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="modelo" className="form-label">Modelo</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="modelo"
                                    value={form.modelo}
                                    onChange={(e) => setForm({ ...form, modelo: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="alcance" className="form-label">Alcance</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="alcance"
                                    value={form.alcance}
                                    onChange={(e) => setForm({ ...form, alcance: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="wifi" className="form-label">WiFi</label>
                                <select
                                    className="form-select"
                                    id="wifi"
                                    value={form.wifi}
                                    onChange={(e) => setForm({ ...form, wifi: e.target.value === 'true' })}
                                >
                                    <option value="">Seleccione</option>
                                    <option value="true">Sí</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="btu" className="form-label">BTU</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="btu"
                                    value={form.btu}
                                    onChange={(e) => setForm({ ...form, btu: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="precio" className="form-label">Precio</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="precio"
                                    value={form.precio}
                                    onChange={(e) => setForm({ ...form, precio: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="stock" className="form-label">Stock</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="stock"
                                    value={form.stock}
                                    onChange={(e) => setForm({ ...form, stock: e.target.value })}
                                />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => setOpen(false)}
                        >
                            Cerrar
                        </button>
                        <button type="button" className="btn btn-primary" onClick={editarAire}>
                            {loadingForm ?
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                :
                                'Guardar cambios'
                            }
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
