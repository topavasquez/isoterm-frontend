import React, { useEffect, useState } from 'react'
import CrearAire from './CrearAire'
import EliminarAire from './EliminarAire'
import EditarAire from './EditarAire'

export default function Aires() {

    const [aires, setAires] = useState([])
    const [loding, setLoding] = useState(false)
    // Modal crear aire
    const [openCrear, setOpenCrear] = useState(false)
    // Modal eliminar aire
    const [openEliminar, setOpenEliminar] = useState(false)
    const [aireAEliminar, setAireEliminar] = useState({
        id: null,
        modelo: ''
    })
    // Modal editar aire
    const [openEditar, setOpenEditar] = useState(false)
    const [aireAEditar, setAireAEditar] = useState({
        id: null,
        marca: '',
        modelo: '',
        alcance: '',
        wifi: '',
        btu: '',
        precio: '',
        stock: ''
    })

    const obtenerAires = () => {
        fetch('http://localhost:3000/api/aires/')
            .then(response => response.json())
            .then(data => {
                setAires(data)
                setLoding(false)
            })
            .catch(error => {
                console.error('Error al obtener los aires acondicionados:', error)
            })
    }

    useEffect(() => {
        obtenerAires()
    }, [])

    const [form, setForm] = useState({
        marca: '',
        modelo: '',
        alcance: '',
        wifi: '',
        btu: '',
        precio: '',
        stock: ''
    })
    const [loadingForm, setLoadingForm] = useState(false)

    const crearAire = async (e) => {
        e.preventDefault();
        console.log(form)

        if (Object.values(form).some(value => String(value).trim() === '')) {
            alert('Por favor, complete todos los campos')
            return
        }

        await fetch('http://localhost:3000/api/aires/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                marca: form.marca,
                modelo: form.modelo,
                alcance: form.alcance,
                wifi: form.wifi,
                btu: form.btu,
                precio: parseFloat(form.precio),
                stock: form.stock
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setLoadingForm(false)
                alert('Aire acondicionado creado con éxito')
                setOpenCrear(false)
                obtenerAires()
                setForm({
                    marca: '',
                    modelo: '',
                    alcance: '',
                    wifi: '',
                    btu: '',
                    precio: '',
                    stock: ''
                })
            })
            .catch(err => {
                console.error('Error al crear el aire acondicionado:', err)
                setLoadingForm(false)
                alert('Error al crear el aire acondicionado')
            })
    }

    const openModalEliminar = (id, modelo) => {
        setOpenEliminar(true)
        setAireEliminar({
            id,
            modelo
        })
        console.log(id)
        console.log(modelo)
    }

    const eliminarAire = async () => {
        await fetch(`http://localhost:3000/api/aires/${aireAEliminar.id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                alert('Aire acondicionado eliminado con éxito')
                setOpenEliminar(false)
                obtenerAires()
            })
            .catch(err => {
                console.error('Error al eliminar el aire acondicionado:', err)
                alert('Error al eliminar el aire acondicionado')
            })
    }

    const editarAire = async (e) => {
        e.preventDefault();
        console.log(aireAEditar)

        if (Object.values(aireAEditar).some(value => String(value).trim() === '')) {
            alert('Por favor, complete todos los campos')
            return
        }

        await fetch(`http://localhost:3000/api/aires/${aireAEditar.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(aireAEditar)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                alert('Aire acondicionado editado con éxito')
                setOpenEditar(false)
                obtenerAires()
            })
            .catch(err => {
                console.error('Error al editar el aire acondicionado:', err)
                alert('Error al editar el aire acondicionado')
            })
    }

    const openModalEditar = (aire) => {
        setOpenEditar(true)
        setAireAEditar({
            id: aire.id_aire_acondicionado,
            marca: aire.marca,
            modelo: aire.modelo,
            alcance: aire.alcance,
            wifi: aire.wifi,
            btu: aire.btu,
            precio: aire.precio,
            stock: aire.stock
        })
    }

    return (
        <div>
            <h1>Aires Acondicionados</h1>

            <button onClick={() => setOpenCrear(true)}>Crear Aire</button>

            {openCrear && (
                <CrearAire setOpen={setOpenCrear} crearAire={crearAire} form={form} setForm={setForm} loadingForm={loadingForm} />
            )}

            {openEliminar && (
                <EliminarAire setOpen={setOpenEliminar} aireAEliminar={aireAEliminar} eliminarAire={eliminarAire} />
            )}

            {openEditar && (
                <EditarAire
                    setOpen={setOpenEditar}
                    editarAire={editarAire}
                    form={aireAEditar}
                    setForm={setAireAEditar}
                    loadingForm={loadingForm}
                />
            )}

            {
                loding ?
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    :
                    <div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Modelo</th>
                                    <th scope="col">Marca</th>
                                    <th scope="col">Stock</th>
                                    <th scope='col'>Precio</th>
                                    <th scope='col'>Disponible</th>
                                    <th scope="col">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    aires.map(aire => (
                                        <tr key={aire.id_aire_acondicionado}>
                                            <th scope="row">{aire.id_aire_acondicionado}</th>
                                            <td>{aire.modelo}</td>
                                            <td>{aire.marca}</td>
                                            <td>{aire.stock}</td>
                                            <td>{aire.precio}</td>
                                            <td>{aire.disponible ? 'Disponible' : 'No disponbile' }</td>
                                            <td className='d-flex gap-2'>
                                                <button
                                                    className="btn btn-primary btn-sm"
                                                    onClick={() => openModalEditar(aire)}
                                                >
                                                    Editar
                                                </button>
                                                <button className="btn btn-danger btn-sm" onClick={()=>openModalEliminar(aire.id_aire_acondicionado, aire.modelo)}>Eliminar</button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
            }

        </div>
    )
}