import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import React from "react";
import { Carrito } from "./productos/Carrito";
import { useCarrito } from "../context/CarritoContext";
import logo from "../assets/logooficial.png";

function Header() {
  const {
    totalItems,
    abrirCarrito,
  } = useCarrito();

  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    window.location.href = "/"; // redirige al inicio
  };

  return (
    <header className="bg-primary text-white shadow-sm">
      <div className="container-fluid">
        <div className="row align-items-center">
          {/* LOGO */}
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
                      objectFit: "contain",
                    }}
                  />
                </div>
              </Link>
            </div>
          </div>

          {/* NAV LINKS */}
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

                {/* Si el usuario está logueado, mostrar Perfil */}
                {usuario && (
                  <li className="nav-item">
                    <Link to="/perfil" className="nav-link text-white">
                      Perfil
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
          </div>

          {/* BOTÓN DERECHO (según sesión) */}
          <div className="col-auto d-flex align-items-center gap-2">
            {!usuario ? (
              <Link
                to="/dashboard"
                className="btn bg-light bg-opacity-75 fw-semibold"
              >
                Iniciar Sesión
              </Link>
            ) : (
              <>
                <span className="fw-semibold">
                  Hola, {usuario.nombre}
                </span>
                <button
                  onClick={handleLogout}
                  className="btn btn-outline-light fw-semibold"
                >
                  Cerrar Sesión
                </button>
              </>
            )}

            {/* BOTÓN CARRITO */}
            <button
              className="btn btn-outline-light position-relative"
              onClick={abrirCarrito}
            >
              <FaShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-white text-primary">
                  {totalItems}
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
