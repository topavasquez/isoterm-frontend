import React from 'react'
import { Cards } from '../ui/Cards'

export default function PaginaPrincipal() {

  const [productos, setProductos] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const fetchProductos = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/api/aires/');
      const data = await response.json();
      setProductos(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching productos: ', error);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    fetchProductos();
  }, []);

  return (
    <div className="container-fluid">
      {/* Hero Section */}
      <div className="row bg-primary text-white py-5 mb-5">
        <div className="col-12 text-center">
          <h1 className="display-4 fw-bold">Isoterm</h1>
          <p className="lead">Los mejores aires acondicionados para tu hogar</p>
        </div>
      </div>

      {/* Products Section */}
      <div className="container">
        <div className="row mb-4">
          <div className="col-12">
            <h2 className="text-center mb-4">Nuestros Productos</h2>
            <hr className="w-25 mx-auto mb-5" />
          </div>
        </div>

        {loading ? (
          <div className="row">
            <div className="col-12 text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
              <p className="mt-3">Cargando productos...</p>
            </div>
          </div>
        ) : (
          <div className="row g-4">
            {productos.length > 0 ? (
              productos.map((producto) => (
                <div key={producto.id_aire_acondicionado} className="col-lg-4 col-md-6 col-sm-12">
                  <Cards
                    title={`${producto.marca} ${producto.modelo}`}
                    description={`${producto.btu} BTU - Alcance: ${producto.alcance}m² - ${producto.wifi ? 'Con WiFi' : 'Sin WiFi'} - Precio: $${producto.precio}`}
                    link={`/producto/${producto.id_aire_acondicionado}`}
                  />
                </div>
              ))
            ) : (
              <div className="col-12 text-center">
                <div className="alert alert-info">
                  <h4>No hay productos disponibles</h4>
                  <p>Actualmente no tenemos aires acondicionados en stock.</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white mt-5 py-4">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <p>&copy; 2025 Isoterm. Todos los derechos reservados.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
