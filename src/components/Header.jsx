import { Link } from "react-router-dom";
import { FaShoppingCart, FaBars } from "react-icons/fa";
import React from "react";
import { Carrito } from "./productos/Carrito";
import { useCarrito } from "../context/CarritoContext";
import  logo from "../assets/logooficial.png";

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
        <div className="row align-items-center">
          <div className="col-auto">
            <div className="d-flex align-items-center">
              <Link to="/" className="text-white text-decoration-none">
              <div className="d-flex align-items-center justify-content-center text-dark fw-bold">
                <img
                  src={logo}
                  alt="Logo"
                  style={{ 
                    height: "100px", 
                    width: "auto",
                    objectFit: "contain"
                  }}
                />
              </div>
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
