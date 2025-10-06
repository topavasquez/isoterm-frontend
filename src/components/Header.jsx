import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import React, { useEffect } from "react";
import { Carrito } from "./productos/Carrito";
import { useCarrito } from "../context/CarritoContext";
import logo from "../assets/logo.png";
import { CiLogout } from "react-icons/ci";
import { FaUser } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

function Header() {
  const navigate = useNavigate();

  const { usuario, logout } = useAuth();

  const { totalItems, abrirCarrito } = useCarrito();

  useEffect(() => {
    console.log();
  }, [usuario]);

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
                      width: "80px",
                      objectFit: "contain",
                      marginLeft: "20px",
                      marginBottom: "10px",
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
                to="/login"
                className="btn bg-light bg-opacity-75 fw-semibold"
              >
                Iniciar Sesión
              </Link>
            ) : (
              <>
                <div className="d-flex align-items-center gap-2 bg-white bg-opacity-25 rounded-pill px-3 py-1 me-3">
                  <Link
                    to="/perfil"
                    className="btn btn-link p-0 m-0 text-white"
                    title="Perfil"
                  >
                    <FaUser
                      className="me-2"
                      color="#fff"
                      size={18}
                      style={{
                        background: "#0d6efd",
                        borderRadius: "50%",
                        padding: "3px",
                      }}
                    />
                  </Link>
                  <span
                    className="fw-semibold text-white"
                    style={{ fontSize: "1rem" }}
                  >
                    Hola, {usuario.nombre}
                  </span>
                  <button
                    onClick={() => {
                      logout();
                      navigate("/");
                    }}
                    className="btn btn-link p-0 m-0 ms-2 text-white"
                    title="Cerrar sesión"
                    style={{ fontSize: "1.2rem" }}
                  >
                    <CiLogout />
                  </button>
                </div>
              </>
            )}

            {usuario &&
              usuario.rol !== "admin" &&
              usuario.rol !== "vendedor" && (
                <button
                  className="btn btn-light bg-opacity-75 position-relative d-flex align-items-center gap-2"
                  onClick={abrirCarrito}
                >
                  <FaShoppingCart color="black" size={20} />
                  {totalItems > 0 && (
                    <span
                      className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                      style={{ fontSize: "0.75rem" }}
                    >
                      {totalItems}
                      <span className="visually-hidden">
                        items en el carrito
                      </span>
                    </span>
                  )}
                </button>
              )}
          </div>
        </div>
      </div>

      {/* Componente Carrito */}
      <Carrito />
    </header>
  );
}

export default Header;
