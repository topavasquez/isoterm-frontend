import React, { useEffect } from 'react'
import './dashboard.css'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { CiLogout } from "react-icons/ci";

export default function Dashboard() {

    const navigate = useNavigate();

    const comprobarSesion = () => {
        const usuario = localStorage.getItem('usuario');
        if (usuario) {
            const usuarioObj = JSON.parse(usuario);
            if (usuarioObj.rol === 'admin' || usuarioObj.rol === 'vendedor') {
                navigate('/dashboard');
            } else {
                navigate('/');
            }
        }
    }

    useEffect(() => {
        comprobarSesion()
    }, [])

    const logout = () => {
        localStorage.removeItem('usuario');
        navigate('/')
    }

    return (
        <div className='h-100'>
            <header
                className="navbar sticky-top bg-dark flex-md-nowrap p-0 shadow"
            >
                <Link
                    to={"/dashboard"}
                    className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6 text-white"
                    href="#"
                > Isoterm
                </Link>

                <button onClick={logout} className="btn btn-dark text-white d-flex align-items-center gap-2 me-3">
                    <CiLogout color='white' />
                </button>
            </header>

            <div className="h-100">
                <div className="row h-100">
                    <div
                        className="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary"
                    >
                        <div
                            className="offcanvas-md offcanvas-end bg-body-tertiary"
                            id="sidebarMenu"
                            aria-labelledby="sidebarMenuLabel"
                        >
                            <div className="offcanvas-header">
                                <h5 className="offcanvas-title" id="sidebarMenuLabel">
                                    Isoterm
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="offcanvas"
                                    data-bs-target="#sidebarMenu"
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div
                                className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto"
                            >
                                <ul className="nav flex-column">
                                    <li className="nav-item">
                                        <Link
                                            to="aires"
                                            className="nav-link d-flex align-items-center gap-2 active"
                                            aria-current="page"
                                            href="#"
                                        >

                                            Aires Acondicionados
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link
                                            to="vendedores"
                                            className="nav-link d-flex align-items-center gap-2"
                                            href="#">

                                            Vendedores
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                         <Link
                                         to="/perfil"
                                        className="nav-link d-flex align-items-center gap-2">
                                            Perfil de Usuario
                                        </Link>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </div>
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    )
}
