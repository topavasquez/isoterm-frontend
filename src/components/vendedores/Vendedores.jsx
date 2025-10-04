import React, { useEffect, useState } from 'react'
import CrearVendedor from './CrearVendedor'
import EditarVendedor from './EditarVendedor'
import EliminarVendedor from './EliminarVendedor'

export default function Vendedores() {

  const [vendedores, setVendedores] = useState([])
  const [loding, setLoding] = useState(false)

  // Modal crear vendedor
  const [openCrear, setOpenCrear] = useState(false)
  // Modal editar vendedor
  const [openEditar, setOpenEditar] = useState(false)
  const [vendedorAEditar, setVendedorAEditar] = useState({
    id_usuario: null,
    nombre: '',
    apellido: '',
    correo: '',
    password: '',
    telefono: '',
    direccion: ''
  })
  // Modal eliminar vendedor
  const [openEliminar, setOpenEliminar] = useState(false)
  const [vendedorAEliminar, setVendedorAEliminar] = useState({
    id: null,
    nombre: ''
  })

  const obtenerVendedores = () => {
    fetch('http://localhost:3000/api/usuarios/vendedores')
      .then(response => response.json())
      .then(data => {
        setVendedores(Array.isArray(data) ? data : []); // Asegurarse de que sea un array
        setLoding(false);
      })
      .catch(error => {
        console.error('Error al obtener los vendedores:', error);
        setVendedores([]); // En caso de error, establecer un array vacío
      });
  }

  useEffect(() => {
    obtenerVendedores()
  }, [])

  const crearVendedor = async (nuevoVendedor) => {
    try {
      const response = await fetch('http://localhost:3000/api/usuarios/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevoVendedor)
      })

      if (response.ok) {
        alert('Vendedor creado con éxito')
        setOpenCrear(false)
        obtenerVendedores()
      } else {
        alert('Error al crear el vendedor')
      }
    } catch (error) {
      console.error('Error al crear el vendedor:', error)
    }
  }

  const editarVendedor = async (vendedorEditado) => {
    try {
      const response = await fetch(`http://localhost:3000/api/usuarios/${vendedorEditado.id_usuario}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(vendedorEditado)
      })

      if (response.ok) {
        alert('Vendedor editado con éxito')
        setOpenEditar(false)
        obtenerVendedores()
      } else {
        alert('Error al editar el vendedor')
      }
    } catch (error) {
      console.error('Error al editar el vendedor:', error)
    }
  }

  const eliminarVendedor = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/usuarios/${vendedorAEliminar.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        alert('Vendedor eliminado con éxito');
        setOpenEliminar(false);
        obtenerVendedores();
      } else {
        const data = await response.json();
        alert(data.error || 'Error al eliminar el vendedor');
      }
    } catch (error) {
      console.error('Error al eliminar el vendedor:', error);
      alert('Ocurrió un error al eliminar el vendedor');
    }
  }

  const openModalEditar = (vendedor) => {
    setOpenEditar(true)
    setVendedorAEditar(vendedor)
    console.log(vendedor)
  }

  const openModalEliminar = (id, nombre) => {
    setOpenEliminar(true)
    setVendedorAEliminar({ id, nombre })
  }

  return (
    <div>
      <h1>Vendedores</h1>
      <button onClick={() => setOpenCrear(true)}>Crear Vendedor</button>

      {openCrear && <CrearVendedor setOpen={setOpenCrear} crearVendedor={crearVendedor} />}
      {openEditar && <EditarVendedor setOpen={setOpenEditar} vendedor={vendedorAEditar} editarVendedor={editarVendedor} />}
      {openEliminar && <EliminarVendedor setOpen={setOpenEliminar} vendedorAEliminar={vendedorAEliminar} eliminarVendedor={eliminarVendedor} />}

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
                  <th scope="col">Nombre</th>
                  <th scope="col">Apellido</th>
                  <th scope="col">Correo</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {
                  Array.isArray(vendedores) && vendedores.map(vendedor => ( // Validar que sea un array
                    <tr key={vendedor.id}>
                      <th scope="row">{vendedor.id}</th>
                      <td>{vendedor.nombre}</td>
                      <td>{vendedor.apellido}</td>
                      <td>{vendedor.correo}</td>
                      <td className='d-flex gap-2'>
                        <button className="btn btn-primary btn-sm" onClick={() => openModalEditar(vendedor)}>Editar</button>
                        <button className="btn btn-danger btn-sm" onClick={() => openModalEliminar(vendedor.id_usuario, vendedor.nombre)}>Eliminar</button>
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
