import { Link } from "react-router-dom";
import { FaShoppingCart, FaBars } from "react-icons/fa";
import React from "react";
import { Carrito } from "./productos/Carrito";
import { useCarrito } from "../context/CarritoContext";

function Header() {
  const {
    cartItems,
    isCarritoOpen,
    abrirCarrito,
    cerrarCarrito,
    actualizarCantidad,
    eliminarDelCarrito,
    totalItems,
  } = useCarrito();

  return (
    <header className="bg-primary text-white shadow-sm">
      <div className="container-fluid">
        <div className="row align-items-center py-3">
          <div className="col-auto">
            <div className="d-flex align-items-center">
              <div className="d-flex align-items-center justify-content-center text-dark fw-bold me-3">
                <img
                  src="./imagenes/logo.png"
                  alt="Logo"
                  style={{ width: "50px", height: "50px" }}
                />
              </div>
              <Link to="/" className="text-white text-decoration-none">
                <h4 className="mb-0 fw-bold">IsotermChile</h4>
              </Link>
            </div>
          </div>

          <div className="col">
            <nav className="d-none d-md-block">
              <ul className="nav">
                <li className="nav-item">
                  <Link to="/" className="nav-link text-white">
                    Inicio
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="#productos" className="nav-link text-white">
                    Productos
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#contacto" className="nav-link text-white">
                    Contacto
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <div className="col-auto">
            <Link
              to="/dashboard"
              className="btn bg-light bg-opacity-75 fw-semibold"
            >
              Iniciar Sesión
            </Link>
          </div>

          <div className="col-auto">
            <button
              className="btn btn-outline-light position-relative"
              onClick={abrirCarrito}
            >
              <FaShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-white text-primary">
                  {totalItems}
                  <span className="visually-hidden">productos en carrito</span>
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Componente Carrito */}
      <Carrito />
    </header>
  );
}

export default Header;
