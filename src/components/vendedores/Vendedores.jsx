import React, { useEffect, useState } from 'react'

export default function Vendedores() {

  // const [vendedores, setVendedores] = useState([])
  const [loding, setLoding] = useState(false)

  const vendedores = [
    { id: 1, nombre: 'Juan', apellido: 'Perez', correo: 'juan@gmail.com' },
    { id: 2, nombre: 'Maria', apellido: 'Gomez', correo: 'maria@gmail.com' },
    { id: 3, nombre: 'Pedro', apellido: 'Urdemales', correo: 'pedro@gmail.com' },
  ]

  useEffect(() => {
    // obtenerVendedores()
  }, [])

  /*
  const obtenerVendedores = () => {
    fetch('http://localhost:3000/api/vendedores')
      .then(response => response.json())
      .then(data => {
        setVendedores(data)
        setLoding(false)
      })
      .catch(error => {
        console.error('Error al obtener los vendedores:', error)
      })
  }
  */

  /*
  const eliminarVendedor = (id) => {
    fetch('http://localhost:3000/api/vendedores/' + id, {
      method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
      console.log('Vendedor eliminado:', data)
      obtenerVendedores()
    })
    .catch(error => {
      console.error('Error al eliminar el vendedor:', error)
    })
  }
  */

  const editarVendedor = (id) => {
    
  }

  return (
    <div>
      <h1>Vendedores</h1>

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
                  vendedores.map(vendedor => (
                    <tr key={vendedor.id}>
                      <th scope="row">{vendedor.id}</th>
                      <td>{vendedor.nombre}</td>
                      <td>{vendedor.apellido}</td>
                      <td>{vendedor.correo}</td>
                      <td className='d-flex gap-2'>
                        <button className="btn btn-primary btn-sm">Editar</button>
                        <button className="btn btn-danger btn-sm">Eliminar</button>
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
