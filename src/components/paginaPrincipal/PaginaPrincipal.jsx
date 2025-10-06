import React from "react";
import { Cards } from "../ui/Cards";
import Filter from "../ui/Filter";

export default function PaginaPrincipal() {
  const [productos, setProductos] = React.useState([]);
  const [productosFiltrados, setProductosFiltrados] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [clima, setClima] = React.useState(null);
  const [busqueda, setBusqueda] = React.useState("");

  const fetchProductos = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/api/aires/");
      const data = await response.json();
      setProductos(data);
      setProductosFiltrados(data);
    } catch (error) {
      console.error("Error fetching productos: ", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchClima = async () => {
    try {
      const lat = -36.6066;
      const lon = -72.1034;
      const apiKey = "e803a2e088b0fa9d441cd4ae3da14ec8";
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=es`;

      const response = await fetch(url);
      const data = await response.json();

      setClima({
        temp: data.main.temp,
        desc: data.weather[0].description,
      });
    } catch (error) {
      console.error("Error obteniendo clima:", error);
    }
  };

  React.useEffect(() => {
    fetchProductos();
    fetchClima();
  }, []);

  const scrollToProducts = () => {
    const productosSection = document.getElementById("productos-section");
    if (productosSection) {
      productosSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const getClimaMensaje = (temp) => {
    if (temp >= 25) {
      return {
        mensaje: "¡Perfecta para usar aire acondicionado!",
        color: "bg-danger",
      };
    } else if (temp >= 15) {
      return {
        mensaje: "Clima agradable en Chillán",
        color: "bg-warning",
      };
    } else {
      return {
        mensaje: "Ideal para calefaccionar tu hogar",
        color: "bg-primary",
      };
    }
  };

  const limpiarBusqueda = () => {
    setBusqueda("");
    setProductosFiltrados(productos);
  };

  return (
    <div className="container-fluid p-0">
      {/* Hero Banner Section */}
      <div
        className="row text-white position-relative"
        style={{
          minHeight: "500px",
          backgroundImage: "url(/imagenes/banner.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          className="position-absolute top-0 start-0 w-100 h-100 bg-primary"
          style={{ opacity: 0.6 }}
        ></div>

        <div
          className="col-12 d-flex align-items-center justify-content-center position-relative"
          style={{ zIndex: 2 }}
        >
          <div className="text-center py-5">
            <h1 className="display-3 fw-bold mb-4">IsotermChile</h1>
            <p className="lead fs-4 mb-4">
              Los mejores aires acondicionados para tu hogar
            </p>
            <div className="d-flex gap-3 justify-content-center flex-wrap">
              <button
                className="btn bg-light btn-lg px-4 py-2"
                onClick={scrollToProducts}
              >
                Ver Productos
              </button>
              <button className="btn btn-outline-light btn-lg px-4 py-2">
                Contactar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div id="productos-section" className="container py-5">
        <div className="row mb-4">
          <div className="col-12">
            <h2 className="text-center mb-4">Nuestros Productos</h2>
            <hr className="w-25 mx-auto mb-5" />
          </div>
        </div>

        <Filter
          productos={productos}
          productosFiltrados={productosFiltrados}
          setProductosFiltrados={setProductosFiltrados}
          busqueda={busqueda}
          setBusqueda={setBusqueda}
          limpiarBusqueda={limpiarBusqueda}
        />

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
            {productosFiltrados.length > 0 ? (
              productosFiltrados.map((producto) => (
                <div
                  key={producto.id_aire_acondicionado}
                  className="col-lg-4 col-md-6 col-sm-12"
                >
                  <Cards
                    title={`${producto.marca} ${producto.modelo}`}
                    description={`${producto.btu} BTU - Alcance: ${
                      producto.alcance
                    }m² - ${
                      producto.wifi ? "Con WiFi" : "Sin WiFi"
                    } - Precio: $${producto.precio}`}
                    link={`/producto/${producto.id_aire_acondicionado}`}
                  />
                </div>
              ))
            ) : busqueda ? (
              <div className="col-12 text-center">
                <div className="alert alert-warning">
                  <h4>No se encontraron resultados</h4>
                  <p>
                    No hay productos que coincidan con tu búsqueda "{busqueda}".
                  </p>
                  <button className="btn btn-primary" onClick={limpiarBusqueda}>
                    Ver todos los productos
                  </button>
                </div>
              </div>
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

      {clima && (
        <div
          className={`text-white text-center my-5 ${
            getClimaMensaje(clima.temp).color
          }`}
          style={{
            paddingTop: "8rem",
            paddingBottom: "8rem",
            fontSize: "1.5rem",
            fontWeight: "bold",
          }}
        >
          Chillán, {clima.temp.toFixed(1)}°C —{" "}
          {getClimaMensaje(clima.temp).mensaje}
        </div>
      )}

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
  );
}
